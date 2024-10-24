import { useEffect, useState } from "react";
import Avatar from "../shared/Avatar";
import AddUser from "./AddUser";
import { useUserStore } from "../../lib/userStore";
import {
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";

interface Item {
  chatId: string;
  lastMessage: string;
  receiverId: string;
  updatedAt: number;
}

interface UserDetails {
  username: string;
  blocked: Array<string>;
  email: string;
  avatar: string;
  id: string;
}

interface ChatSelection {
  chatId: string;
  lastMessage: string;
  receiverId: string;
  updatedAt: number;
  user: UserDetails;
  isSeen?: boolean;
}

function ChatList() {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState<DocumentData | undefined>(undefined);

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser?.id),
      async (res) => {
        const items = res.data()?.chats;

        const promises = items.map(async (item: Item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  const toggleAddMode = () => {
    setAddMode((prev) => !prev);
  };

  const handleChatSelect = async (chat: ChatSelection) => {
    const userChats = chats?.map((item: ChatSelection) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item: ChatSelection) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser?.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log((err as Error).message);
    }
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
        {chats?.map((chat: ChatSelection) => (
          <div
            className={`flex items-center gap-4 cursor-pointer p-5 border-b border-b-black ${
              chat?.isSeen ? "bg-transparent" : "bg-blue-500"
            }`}
            key={chat.chatId}
            onClick={() => handleChatSelect(chat)}
          >
            <Avatar size="sm" rounded={true} avatarURL={chat.user.avatar} />
            <div className="text">
              <span className="font-medium">{chat.user.username}</span>
              <p className="text-sm font-light">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
        {!addMode || <AddUser />}
      </div>
    </>
  );
}

export default ChatList;
