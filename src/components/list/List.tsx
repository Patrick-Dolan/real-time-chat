import ChatList from "./ChatList";
import UserInfo from "./UserInfo";

function List() {
  return (
    <div className="w-1/4 overflow-hidden flex flex-col">
      <div className="p-4">
        <UserInfo />
      </div>
      <ChatList />
    </div>
  );
}

export default List;
