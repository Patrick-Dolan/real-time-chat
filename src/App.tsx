import { useEffect, useState } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/shared/Notification";
import { User } from "firebase/auth";
import { useUserContext } from "./context/UserContext";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const { currentUser, isLoading } = useUserContext();

  useEffect(() => {
    setLoggedInUser(currentUser);
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-4xl font-bold px-16 py-8 bg-slate-700 rounded-lg">
          Loading...
        </h1>
      </div>
    );
  }

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
