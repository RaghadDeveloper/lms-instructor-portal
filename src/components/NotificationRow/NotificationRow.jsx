import { TbTrash } from "react-icons/tb";
import "./NotificationRow.css";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteNotification,
  readNotification,
} from "../../features/notifications/notificationsThunk";

function NotificationRow({ num, notification }) {
  const dispatch = useDispatch();

  const handlReadNotification = () => {
    dispatch(readNotification(notification.id));
  };

  const handldeleteNotification = () => {
    dispatch(deleteNotification(notification.id));
  };

  return (
    <div
      className={`notification-row ${!notification.read_at ? "not-read" : ""}`}
    >
      <p className="id">{num}</p>
      <p className="not-content">{notification.message}</p>
      <p className="created-at">{notification.created_at}</p>
      <button className="mark-as-read" onClick={handlReadNotification}>
        <MdOutlineMarkEmailUnread />
      </button>
      <button className="delete" onClick={handldeleteNotification}>
        <TbTrash />
      </button>
      <button className="details">See more</button>
    </div>
  );
}

export default NotificationRow;
