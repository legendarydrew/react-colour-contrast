import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import { contrastValue, isUnsafeRatio } from "./functions";
import RawInput from "./components/RawInput";

// TODO divide this into components!
// TODO consider saving the (edited) raw input into localStorage.
// TODO consider support for rgb(), also sometimes found in stylesheets.

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

  let [ratioMode, setRatioMode] = useState("");
  let [colourList, setColourList] = useState([]);

  /**
   * Returns TRUE if both provided colours are identical.
   *
   * @param {string} bgColour
   * @param {string} fgColour
   * @returns {boolean}
   */
  function isIdentical(bgColour, fgColour) {
    return bgColour === fgColour;
  }

  /**
   * Returns style attributes to use for a colour combination.
   *
   * @param {string} bgColour
   * @param {string} fgColour
   * @returns {backgroundColor: string, color: string, textAlign: string}
   */
  function getCellStyle(bgColour, fgColour) {
    if (isIdentical(bgColour, fgColour) || isUnsafeRatio(ratioMode, bgColour, fgColour)) {
      return { textAlign: "center" };
    }
    return { backgroundColor: bgColour, color: fgColour, textAlign: "right" };
  }

  /**
   * Updates the currently selected ratio mode.
   * @param {Event} e
   */
  function setRatioModeHandler(e) {
    let newRatioMode = e.target.value;
    setRatioMode(newRatioMode);
  }

  /**
   * Returns text to display for a colour combination.
   * If the colour combination is considered unsafe, or the colours are identical, a "cross" is shown.
   *
   * @param {string} bgColour
   * @param {string} fgColour
   * @returns {backgroundColor: string, color: string, textAlign: string}
   */
  function cellText(bgColour, fgColour) {
    if (
      !(isIdentical(bgColour, fgColour) || isUnsafeRatio(ratioMode, bgColour, fgColour))
    ) {
      return contrastValue(bgColour, fgColour);
    }

    return "×";
  }

  function generateTable(rawInput) {
    
    // Parse the raw input, looking for hex colours.
    // (At the moment we are just looking at three- and six-character hex codes.)
    let hexCodes = [
      ...new Set(
        rawInput.match(new RegExp("(#[A-Z0-9]{6})|(#[A-Z0-9]{3})", "gi"))
      ),
      // We look for the six-character hex codes first. (Thank you regex101.com.)
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
            <RawInput defaultValue={defaultColours} generateHandler={generateTable}></RawInput>

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
