import ChatList from "./ChatList";
import UserInfo from "./UserInfo";

function List() {
  return (
    <div className="w-1/4 p-4">
      <div className="mb-4">
        <UserInfo />
      </div>
      <ChatList />
    </div>
  );
}

export default List;
