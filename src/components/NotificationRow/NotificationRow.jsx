import { TbTrash } from "react-icons/tb";
import "./NotificationRow.css";

function NotificationRow({ index, notification }) {
  return (
    <div className="notification-row">
      <p className="id">{index + 1}</p>
      <p className="not-content">{notification.message}</p>
      <p className="created-at">{notification.created_at}</p>
      <button className="delete">
        <TbTrash />
      </button>
      <button className="details">See more</button>
    </div>
  );
}

export default NotificationRow;
