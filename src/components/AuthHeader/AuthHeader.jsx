import "./AuthHeader.css";

function AuthHeader({ title, description }) {
  return (
    <header>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

export default AuthHeader;
