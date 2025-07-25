import "./NoResults.css";
import NoResult from "./../../assets/images/noResults.png";

function NoResults() {
  return (
    <div className="no-results">
      <img src={NoResult} alt="No Results" />
      <p>No Results</p>
    </div>
  );
}

export default NoResults;
