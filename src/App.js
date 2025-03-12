import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import RawInput from "./components/RawInput";
import RatioSelect from "./components/RatioSelect";
import ContrastTable from "./components/ContrastTable";

// TODO consider saving the (edited) raw input into localStorage.
// TODO consider support for rgb(), also sometimes found in stylesheets.

export default function App() {
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
      <header className="bg-secondary-subtle p-3">
        <div className="container">
          <h1>Colour Contrast Table Thing</h1>
        </div>
      </header>

      <main className="p-3">
        <div className="container">
          <div className="row">
            <RawInput
              defaultValue={defaultColours}
              generateHandler={generateTable}
            ></RawInput>

            <div className="col-lg-9">
              <RatioSelect
                selected={ratioMode}
                selectHandler={(newMode) => setRatioMode(newMode)}
              ></RatioSelect>

              <ContrastTable
                ratioMode={ratioMode}
                colourList={colourList}
              ></ContrastTable>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-light py-3 px-5">
        <div className="container fs-6 text-center">
          Copyright &copy; Drew Maughan, all rights reserved.
        </div>
      </footer>
    </div>
  );
}
