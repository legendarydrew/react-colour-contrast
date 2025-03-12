import { useState } from "react";

export default function RawInput({ defaultValue, generateHandler }) {
  let [contents, setContents] = useState(defaultValue.join("\n"));

  function inputHandler(e) {
    setContents(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    generateHandler(contents);
  }

  return (
    <form onSubmit={submitHandler} className="col-lg-3">
      <label htmlFor="rawInput" className="form-label">
        HTML colours
      </label>
      <textarea
        className="form-control font-monospace"
        id="rawInput"
        rows="12"
        placeholder="Enter HTML hex codes (#xxxxxx)..."
        onChange={inputHandler}
        value={contents}
      ></textarea>
      <div className="d-grid mt-1">
        <button className="btn btn-lg btn-primary" type="submit">
          Generate!
        </button>
      </div>
    </form>
  );
}
