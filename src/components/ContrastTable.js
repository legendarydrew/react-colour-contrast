import { isUnsafeRatio, contrastValue } from "../functions";
import "./ContrastTable.css";

export default function ContrastTable({ colourList, ratioMode }) {
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
   * Returns text to display for a colour combination.
   * If the colour combination is considered unsafe, or the colours are identical, a "cross" is shown.
   *
   * @param {string} bgColour
   * @param {string} fgColour
   * @returns {backgroundColor: string, color: string, textAlign: string}
   */
  function cellText(bgColour, fgColour) {
    if (
      !(
        isIdentical(bgColour, fgColour) ||
        isUnsafeRatio(ratioMode, bgColour, fgColour)
      )
    ) {
      return contrastValue(bgColour, fgColour);
    }

    return "×";
  }

  /**
   * Returns style attributes to use for a colour combination.
   *
   * @param {string} bgColour
   * @param {string} fgColour
   * @returns {backgroundColor: string, color: string, textAlign: string}
   */
  function getCellStyle(bgColour, fgColour) {
    if (
      !(
        isIdentical(bgColour, fgColour) ||
        isUnsafeRatio(ratioMode, bgColour, fgColour)
      )
    ) {
      return { backgroundColor: bgColour, color: fgColour };
    }
  }

  return (
    <div className="table-responsive">
      {colourList.length ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>&nbsp;</th>
              {colourList.map((hex, index) => (
                <th className="text-center" scope="col" key={"col-" + index}>
                  {hex}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {colourList.map((rowHex, rowIndex) => (
              <tr key={"row-" + rowIndex}>
                <th className="text-end align-middle" scope="row">
                  {rowHex}
                </th>
                {colourList.map((columnHex, columnIndex) => (
                  <td
                    key={`cell-${rowIndex}-${columnIndex}`}
                    className="align-middle text-center"
                    style={getCellStyle(rowHex, columnHex)}
                  >
                    {cellText(rowHex, columnHex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
}
