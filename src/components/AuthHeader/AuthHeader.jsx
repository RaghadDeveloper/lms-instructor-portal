import "./AuthHeader.css";

function AuthHeader({ title, description }) {
  return (
    <header>
      <h2>
        {title}
        <span>NEXORA</span> Academy
      </h2>
      <p>{description}</p>
    </header>
  );
}

export default AuthHeader;
