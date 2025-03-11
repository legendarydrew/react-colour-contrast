import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  let colours = ["#FF0000", "#FFFF00", "#C022F0", "#0000FF"];

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

          <table className="table">
            <thead>
              <tr>
                <th>&nbsp;</th>
                {colours.map((hex, index) => (
                  <th key={'col-' + index}>{hex}</th>
                ))}
              </tr>
            </thead>
            <tbody>
            {colours.map((rowHex, rowIndex) => (
              <tr>
                <th scope="row" key={'row-' + rowIndex}>{rowHex}</th>
                {colours.map((columnHex, columnIndex) => (
                  <td key={`cell-${rowIndex}-${columnIndex}`}>{columnHex}</td>
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
