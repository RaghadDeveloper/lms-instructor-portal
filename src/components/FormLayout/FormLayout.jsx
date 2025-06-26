import "./FormLayout.css";

function FormLayout({ children }) {
  return (
    <div className="form-layout">
      <div>{children}</div>
    </div>
  );
}

export default FormLayout;
