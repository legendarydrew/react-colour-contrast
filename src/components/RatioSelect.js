export default function RatioSelect({ selected, selectHandler }) {
  const ratios = [
    { label: "none", value: "" },
    { label: "<b>AA</b> (normal text)", value: "AA_NORMAL" },
    { label: "<b>AA</b> (large text)", value: "AA_LARGE" },
    { label: "<b>AAA</b> (normal text)", value: "AAA_NORMAL" },
    { label: "<b>AAA</b> (large text)", value: "AAA_LARGE" },
    { label: "Graphics", value: "GRAPHICS" },
  ];
  return (
    <fieldset className="mb-3">
      <legend>Display safe values</legend>

      {ratios.map((row) => (
        <div className="form-check form-check-inline" key={row.value}>
          <input
            className="form-check-input"
            type="radio"
            name="ratio_mode"
            id={"mode-" + (row.value.length ? row.value.toLowerCase() : "none")}
            value=""
            defaultChecked={selected === row.value}
            onClick={() => selectHandler(row.value)}
          ></input>
          <label
            className="form-check-label"
            htmlFor={
              "mode-" + (row.value.length ? row.value.toLowerCase() : "none")
            }
            dangerouslySetInnerHTML={{ __html: row.label} }
          ></label>
        </div>
      ))}
    </fieldset>
  );
}
