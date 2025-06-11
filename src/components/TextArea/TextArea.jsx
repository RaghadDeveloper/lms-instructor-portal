import "./TextArea.css";

function TextArea({ id, label }) {
  return (
    <div className="textarea">
      <textarea id={id} placeholder=" " />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default TextArea;
