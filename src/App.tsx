import { useEffect, useState } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/shared/Notification";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./lib/firebase";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user);
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <div className="m-auto w-11/12 h-full bg-slate-400 dark:bg-slate-700 flex">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}

export default App;
