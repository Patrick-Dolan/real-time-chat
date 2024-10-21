import Avatar from "../shared/Avatar";

function AddUser() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 m-auto w-max h-max p-4 bg-slate-900 rounded-lg">
      <form className="flex gap-2 mb-4">
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
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Avatar size="sm" />
          <p>Jane Doe</p>
        </div>
        <button className="bg-blue-700 hover:bg-blue-800 p-2 rounded-lg">
          Add User
        </button>
      </div>
    </div>
  );
}

export default AddUser;
