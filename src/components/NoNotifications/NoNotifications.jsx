import "./NoNotifications.css";
import noNotifications from "./../../assets/images/noNotifications.png";

function NoNotifications() {
  return (
    <div className="no-notifications">
      <img src={noNotifications} alt="No Notifications img" />
      <p>
        Nothing to see here right now. We'll let you know when something needs
        your attention.
      </p>
    </div>
  );
}

export default NoNotifications;
