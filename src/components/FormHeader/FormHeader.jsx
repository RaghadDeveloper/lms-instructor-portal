import "./FormHeader.css";

function FormHeader({ title, description }) {
  return (
    <header className="form-header">
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

export default FormHeader;
