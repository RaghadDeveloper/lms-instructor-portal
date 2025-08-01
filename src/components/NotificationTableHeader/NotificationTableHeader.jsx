import "./NotificationTableHeader.css";

function NotificationTableHeader() {
  return (
    <div className="notification-header">
      <h5 className="id">ID</h5>
      <h5 className="not-content">Content</h5>
      <h5 className="created-at">Recieved</h5>
      <h5 className="mark-as-read">Read</h5>
      <h5 className="delete">Delete</h5>
      <h5 className="details">Details</h5>
    </div>
  );
}

export default NotificationTableHeader;
