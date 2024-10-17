import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";

function App() {
  return (
    <div className="m-auto w-11/12 h-full bg-slate-400 dark:bg-slate-700 flex">
      <List />
      <Chat />
      <Detail />
    </div>
  );
}

export default App;
