import "./AuthHeader.css";

function AuthHeader({ title, description }) {
  return (
    <header className="d-flex flex-column me-5">
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

export default AuthHeader;
