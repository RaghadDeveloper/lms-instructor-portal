import "./CheckBox.css";

function CheckBox({ label }) {
  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        id="isFree"
        name="isFree"
        className="circle-checkbox"
      />
      <label htmlFor="isFree" className="checkbox-label">
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
