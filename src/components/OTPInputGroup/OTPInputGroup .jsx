import "./OTPInputGroup.css";

function OTPInputGroup({ length }) {
  return (
    <div className="input-group">
      {[...Array(length)].map((_, i) => (
        <input key={i} type="text" maxLength={1} />
      ))}
    </div>
  );
}

export default OTPInputGroup;
