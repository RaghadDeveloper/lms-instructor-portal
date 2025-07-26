import "./InfoBlock.css";

function InfoBlock({ label, value, onClick }) {
  return (
    <div className={`info-block ${onClick && "clickable"}`} onClick={onClick}>
      <h4>{label} </h4>
      <span>{value}</span>
    </div>
  );
}

export default InfoBlock;
