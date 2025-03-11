import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  let colours = [
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
  let ratioMode = null;

  function isIdentical(bgColour, fgColour) {
    return bgColour === fgColour;
  }

  function getCellStyle(bgColour, fgColour) {
    if (isIdentical(bgColour, fgColour)) {
      return null;
    }
    return { backgroundColor: bgColour, color: fgColour };
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
    // TODO we're assuming the colour codes are provided as six-letter hex values.
    const PRECISION = 3;
    const bg = [
      bgColour.slice(-6, -4),
      bgColour.slice(-4, -2),
      bgColour.slice(-2),
    ].map((v) => parseInt(`0x${v}`));
    const fg = [
      fgColour.slice(-6, -4),
      fgColour.slice(-4, -2),
      fgColour.slice(-2),
    ].map((v) => parseInt(`0x${v}`));
    return contrast(bg, fg).toPrecision(PRECISION);
  }

  function setRatioMode(e) {
    console.log(e.target.value);
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
          <p>The content goes here.</p>

          <fieldset className="mb-3">
            <legend>Display safe values</legend>

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="ratio_mode" id="modeNone" value="" onClick={setRatioMode}></input>
              <label className="form-check-label" htmlFor="modeNone">none</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="ratio_mode" id="modeAANormal" value="AA_NORMAL" onClick={setRatioMode}></input>
              <label className="form-check-label" htmlFor="modeAANormal">AA (normal text)</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="ratio_mode" id="modeAALarge" value="AA_LARGE" onClick={setRatioMode}></input>
              <label className="form-check-label" htmlFor="modeAALarge">AA (large text)</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="ratio_mode" id="modeAAANormal" value="AAA_NORMAL" onClick={setRatioMode}></input>
              <label className="form-check-label" htmlFor="modeAAANormal">AAA (normal text)</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="ratio_mode" id="modeAAALarge" value="AAA_LARGE" onClick={setRatioMode}></input>
              <label className="form-check-label" htmlFor="modeAAALarge">AAS (large text)</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="ratio_mode" id="modeGraphics" value="GRAPHICS" onClick={setRatioMode}></input>
              <label className="form-check-label" htmlFor="modeGraphics">Graphics</label>
            </div>
          </fieldset>

          <table className="table">
            <thead>
              <tr>
                <th>&nbsp;</th>
                {colours.map((hex, index) => (
                  <th key={"col-" + index}>{hex}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {colours.map((rowHex, rowIndex) => (
                <tr key={"row-" + rowIndex}>
                  <th scope="row">{rowHex}</th>
                  {colours.map((columnHex, columnIndex) => (
                    <td
                      key={`cell-${rowIndex}-${columnIndex}`}
                      style={getCellStyle(rowHex, columnHex)}
                    >
                      {!isIdentical(rowHex, columnHex)
                        ? contrastValue(rowHex, columnHex)
                        : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
