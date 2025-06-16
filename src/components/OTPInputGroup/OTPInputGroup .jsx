import "./OTPInputGroup.css";

function OTPInputGroup({ length, value, onChange, disabled }) {
  const handleChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;

    const newCode = [...value];
    newCode[index] = val;
    onChange(newCode);

    if (index < length - 1) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...value];
      if (value[index]) {
        newCode[index] = "";
      } else if (index > 0) {
        const prev = document.getElementById(`otp-${index - 1}`);
        if (prev) prev.focus();
        newCode[index - 1] = "";
      }
      onChange(newCode);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("Text").trim().replace(/\D/g, "");
    if (pasted.length !== length) return;

    const newCode = pasted.split("").slice(0, length);
    onChange(newCode);

    const last = document.getElementById(`otp-${length - 1}`);
    if (last) last.focus();
  };

  return (
    <div className="input-group">
      {[...Array(length)].map((_, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="text"
          disabled={disabled}
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}

export default OTPInputGroup;
