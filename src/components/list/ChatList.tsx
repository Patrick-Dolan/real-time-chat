import { useState } from "react";
import Avatar from "../shared/Avatar";
import AddUser from "./AddUser";

function ChatList() {
  const [addMode, setAddMode] = useState(false);

  const toggleAddMode = () => {
    setAddMode((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1 w-full">
          <img src="/assets/icons/SearchIcon.svg" alt="Search" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent w-full m-1"
          />
        </div>
        <img
          src={`${
            addMode
              ? "/assets/icons/RemoveIcon.svg"
              : "/assets/icons/AddIcon.svg"
          }`}
          alt="Add"
          className="bg-slate-800 p-2 rounded-lg hover:cursor-pointer"
          onClick={toggleAddMode}
        />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center gap-4 cursor-pointer p-5 border-b border-b-black">
          <Avatar size="sm" rounded={true} />
          <div className="text">
            <span className="font-medium">Jane Doe</span>
            <p className="text-sm font-light">Hello</p>
          </div>
        </div>
        <div className="flex items-center gap-4 cursor-pointer p-5 border-b border-b-black">
          <Avatar size="sm" rounded={true} />
          <div className="text">
            <span className="font-medium">Jane Doe</span>
            <p className="text-sm font-light">Hello</p>
          </div>
        </div>
        <div className="flex items-center gap-4 cursor-pointer p-5 border-b border-b-black">
          <Avatar size="sm" rounded={true} />
          <div className="text">
            <span className="font-medium">Jane Doe</span>
            <p className="text-sm font-light">Hello</p>
          </div>
        </div>
        <div className="flex items-center gap-4 cursor-pointer p-5 border-b border-b-black">
          <Avatar size="sm" rounded={true} />
          <div className="text">
            <span className="font-medium">Jane Doe</span>
            <p className="text-sm font-light">Hello</p>
          </div>
        </div>
        <div className="flex items-center gap-4 cursor-pointer p-5 border-b border-b-black">
          <Avatar size="sm" rounded={true} />
          <div className="text">
            <span className="font-medium">Jane Doe</span>
            <p className="text-sm font-light">Hello</p>
          </div>
        </div>
        {!addMode || <AddUser />}
      </div>
    </>
  );
}

export default ChatList;
