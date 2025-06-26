import "./FormBody.css";

function FormBody({ children, onSubmit }) {
  return (
    <form className="form-body" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default FormBody;
