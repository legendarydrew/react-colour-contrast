import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";

function App() {
  const defaultColours = [
    "#000000",
    "#FFFFFF",
    "#00FAF0",
    "#09090A",
    "#F2F3FA",
    "#2B59C3",
    "#404048",
    "#11151C",
    "#600587",
    "#F2F3F2",
    "#F5CD2F",
  ];

  // https://webaim.org/resources/contrastchecker/
  // All of these values are ratios to 1 (e.g. AA_NORMAL = 4.5:1).
  const SAFE_RATIOS = {
    AA_NORMAL: 4.5,
    AA_LARGE: 3,
    AAA_NORMAL: 7,
    AAA_LARGE: 4.5,
    GRAPHICS: 3,
  };
  let [ratioMode, setRatioMode] = useState("");
  let [rawInput, setRawInput] = useState(defaultColours.join("\n"));
  let [colourList, setColourList] = useState([]);

  function isIdentical(bgColour, fgColour) {
    return bgColour === fgColour;
  }

  function getCellStyle(bgColour, fgColour) {
    if (isIdentical(bgColour, fgColour) || isUnsafeRatio(bgColour, fgColour)) {
      return { textAlign: "center" };
    }
    return { backgroundColor: bgColour, color: fgColour, textAlign: "right" };
  }

  // Calculating colour contrast values.
  // https://stackoverflow.com/a/9733420/4073160

  function luminance(r, g, b) {
    const RED = 0.2126;
    const GREEN = 0.7152;
    const BLUE = 0.0722;
    const GAMMA = 2.4;

    let a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
    });

    return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
  }

  function contrast(rgb1, rgb2) {
    let lum1 = luminance(...rgb1);
    let lum2 = luminance(...rgb2);
    let brightest = Math.max(lum1, lum2);
    let darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  function contrastValue(bgColour, fgColour) {
    // TODO we're assuming the colour codes are provided as three- or six-letter hex values.
    const PRECISION = 3;
    const bg = hexToRGB(bgColour);
    const fg = hexToRGB(fgColour);
    return contrast(bg, fg).toPrecision(PRECISION);
  }

  function hexToRGB(hexCode) {
    if (hexCode.length >= 6) {
      return [
        hexCode.slice(-6, -4),
        hexCode.slice(-4, -2),
        hexCode.slice(-2),
      ].map((v) => parseInt(`0x${v}`));
    } else if (hexCode.length >= 3) {
      return [
        hexCode.slice(-3, -2),
        hexCode.slice(-2, -1),
        hexCode.slice(-1),
      ].map((v) => parseInt(`0x${v + v}`));
    }
  }

  function setRatioModeHandler(e) {
    let newRatioMode = e.target.value;
    setRatioMode(newRatioMode);
  }

  function isUnsafeRatio(bgColour, fgColour) {
    if (ratioMode !== "") {
      return contrastValue(bgColour, fgColour) < SAFE_RATIOS[ratioMode];
    }
    return false;
  }

  function cellText(bgColour, fgColour) {
    if (isIdentical(bgColour, fgColour)) {
      return "×";
    } else if (!isUnsafeRatio(bgColour, fgColour)) {
      return contrastValue(bgColour, fgColour);
    } else {
      return "×";
    }
  }

  function inputHandler(e) {
    setRawInput(e.target.value);
  }

  function generateHandler(e) {
    e.preventDefault();

    // Parse the raw input, looking for hex colours.
    // (At the moment we are just looking at three- and six-character hex codes.)
    let hexCodes = [
      ...new Set(
        rawInput.match(new RegExp("(#[A-Z0-9]{6})|(#[A-Z0-9]{3})", "gi"))
      ),
      // We look for the six-character hex codes first.
    ];

    // Do we have at least two colours? If not, show an error message.
    // otherwise, generate the table.
    if (hexCodes.length <= 2) {
      alert("Two or more colours are required.");
    } else {
      setColourList(hexCodes);
    }
  }

  return (
    <div className="App">
      <header className="p-3">
        <div className="container">
          <h1>Colour Contrast Table Thing</h1>
        </div>
      </header>

      <main className="p-3">
        <div className="container">
          <div className="row">
            <form onSubmit={generateHandler} className="col-lg-3">
              <label htmlFor="rawInput" className="form-label">
                HTML colours
              </label>
              <textarea
                className="form-control font-monospace"
                id="rawInput"
                rows="12"
                placeholder="Enter HTML hex codes (#xxxxxx)..."
                onChange={inputHandler}
                value={rawInput}
              ></textarea>
              <div className="d-grid mt-1">
                <button className="btn btn-lg btn-primary" type="submit">
                  Generate!
                </button>
              </div>
            </form>

            <div className="col-lg-9">
              <fieldset className="mb-3">
                <legend>Safe values</legend>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="ratio_mode"
                    id="modeNone"
                    value=""
                    defaultChecked={ratioMode === ""}
                    onClick={setRatioModeHandler}
                  ></input>
                  <label className="form-check-label" htmlFor="modeNone">
                    none
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="ratio_mode"
                    id="modeAANormal"
                    value="AA_NORMAL"
                    defaultChecked={ratioMode === "AA_NORMAL"}
                    onClick={setRatioModeHandler}
                  ></input>
                  <label className="form-check-label" htmlFor="modeAANormal">
                    <b>AA</b> (normal text)
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="ratio_mode"
                    id="modeAALarge"
                    value="AA_LARGE"
                    defaultChecked={ratioMode === "AA_LARGE"}
                    onClick={setRatioModeHandler}
                  ></input>
                  <label className="form-check-label" htmlFor="modeAALarge">
                    <b>AA</b> (large text)
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="ratio_mode"
                    id="modeAAANormal"
                    value="AAA_NORMAL"
                    defaultChecked={ratioMode === "AAA_NORMAL"}
                    onClick={setRatioModeHandler}
                  ></input>
                  <label className="form-check-label" htmlFor="modeAAANormal">
                    <b>AAA</b> (normal text)
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="ratio_mode"
                    id="modeAAALarge"
                    value="AAA_LARGE"
                    defaultChecked={ratioMode === "AAA_LARGE"}
                    onClick={setRatioModeHandler}
                  ></input>
                  <label className="form-check-label" htmlFor="modeAAALarge">
                    <b>AAA</b> (large text)
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="ratio_mode"
                    id="modeGraphics"
                    value="GRAPHICS"
                    defaultChecked={ratioMode === "GRAPHICS"}
                    onClick={setRatioModeHandler}
                  ></input>
                  <label className="form-check-label" htmlFor="modeGraphics">
                    Graphics
                  </label>
                </div>
              </fieldset>

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      {colourList.map((hex, index) => (
                        <th
                          className="text-center"
                          scope="col"
                          key={"col-" + index}
                        >
                          {hex}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {colourList.map((rowHex, rowIndex) => (
                      <tr key={"row-" + rowIndex}>
                        <th className="text-center" scope="row">
                          {rowHex}
                        </th>
                        {colourList.map((columnHex, columnIndex) => (
                          <td
                            key={`cell-${rowIndex}-${columnIndex}`}
                            style={getCellStyle(rowHex, columnHex)}
                          >
                            {cellText(rowHex, columnHex)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="container fs-6 text-center p-2">
          Copyright &copy; Drew Maughan, all rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
