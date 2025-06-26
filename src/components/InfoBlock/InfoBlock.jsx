import "./InfoBlock.css";

function InfoBlock({ label, value }) {
  return (
    <div className="info-block">
      <h4>{label} </h4>
      <span>{value}</span>
    </div>
  );
}

export default InfoBlock;
