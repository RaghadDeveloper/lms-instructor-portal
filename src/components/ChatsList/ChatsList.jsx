import "./ChatsList.css";
import UserItem from "../UserItem/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllChat } from "../../features/chats/chatsThunk";

function ChatsList() {
  const dispatch = useDispatch();
  const { loadingAllChats, chats } = useSelector((state) => state.chats);

  useEffect(() => {
    dispatch(getAllChat());
  }, [dispatch]);

  return (
    <div className="chats-list">
      <h2>All Chats</h2>
      {loadingAllChats ? (
        <p>Loading...</p>
      ) : !chats.length ? (
        <p>You don't have any chat yet</p>
      ) : (
        <ul>
          {chats?.map((chat) => (
            <UserItem key={chat.id} chat={chat} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ChatsList;
