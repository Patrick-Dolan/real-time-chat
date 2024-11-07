import { useEffect, useState } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/shared/Notification";
import { User } from "firebase/auth";
import { useFirebaseContext } from "./context/FirebaseContext";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const { currentUser } = useFirebaseContext();

  useEffect(() => {
    setLoggedInUser(currentUser);
  }, [currentUser]);

  return (
    <div className="m-auto w-11/12 h-full bg-slate-400 dark:bg-slate-700 flex">
      {loggedInUser ? (
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
