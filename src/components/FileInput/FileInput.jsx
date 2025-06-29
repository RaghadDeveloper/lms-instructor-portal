import { useState } from "react";
import "./FileInput.css";

function FileInput({ id, label, name, onChange, disabled }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    setFileName(e.target.files[0]?.name || "");
    onChange?.(e);
  };

  return (
    <div className="file-field">
      <input
        id={id}
        type="file"
        name={name}
        onChange={handleFileChange}
        disabled={disabled}
        accept="image/*"
        required
      />
      <label
        htmlFor={id}
        className={`custom-file-label ${fileName ? "file-selected" : ""}`}
      >
        {label}
      </label>
      {fileName && <span className="file-name">{fileName}</span>}
    </div>
  );
}

export default FileInput;
