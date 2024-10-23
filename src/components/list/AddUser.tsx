import { FormEvent, useState } from "react";
import Avatar from "../shared/Avatar";
import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";

function AddUser() {
  const [user, setUser] = useState<DocumentData | null>(null);
  const { currentUser } = useUserStore();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      }
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user?.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser?.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser?.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user?.id,
          updatedAt: Date.now(),
        }),
      });
      console.log(newChatRef.id);
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 m-auto w-max h-max p-4 bg-slate-900 rounded-lg">
      <form className="flex gap-2 mb-4" onSubmit={handleSearch}>
        <input
          className="bg-slate-800 p-2 rounded-lg hover:cursor-pointer"
          type="text"
          placeholder="Username"
          name="username"
        />
        <button className="bg-blue-700 hover:bg-blue-800 p-2 rounded-lg">
          Search
        </button>
      </form>
      {user && (
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar size="sm" avatarURL={user.avatar} />
            <p>{user.username}</p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-700 hover:bg-blue-800 p-2 rounded-lg"
          >
            Add User
          </button>
        </div>
      )}
    </div>
  );
}

export default AddUser;
