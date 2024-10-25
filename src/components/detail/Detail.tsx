import Avatar from "../shared/Avatar";
import { auth, db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

function Detail() {
  const { currentUser } = useUserStore();
  const { changeBlock, user, isReceiverBlocked, isCurrentUserBlocked } =
    useChatStore();

  const handleBlock = async () => {
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", currentUser?.id);

      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked
          ? arrayRemove(user?.id)
          : arrayUnion(user?.id),
      });
      changeBlock();
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  return (
    <div className="w-1/4 overflow-y-auto">
      <div className="p-4 flex flex-col items-center gap-2 border-b border-black">
        <Avatar size="md" rounded={false} avatarURL={user?.avatar || ""} />
        <h2 className="text-lg font-bold">{user?.username}</h2>
        <p className="text-sm">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div>
          <div className="flex justify-between">
            <span>Chat Settings</span>
            <img
              src="/assets/icons/ArrowDownIcon.svg"
              alt="Arrow down"
              className="cursor-pointer bg-slate-800"
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <span>Privacy & Help</span>
            <img
              src="/assets/icons/ArrowDownIcon.svg"
              alt="Arrow down"
              className="cursor-pointer bg-slate-800"
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <span>Shared Photos</span>
            <img
              src="/assets/icons/ArrowUpIcon.svg"
              alt="Arrow up"
              className="cursor-pointer bg-slate-800"
            />
          </div>
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1020%2C1020&ssl=1"
                  alt=""
                  className="rounded-lg h-10"
                />
                <span className="text-sm text-gray-300 font-light">
                  photo-name.png
                </span>
              </div>
              <img
                src="/assets/icons/DownloadIcon.svg"
                alt="Download"
                className="bg-slate-800 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1020%2C1020&ssl=1"
                  alt=""
                  className="rounded-lg h-10"
                />
                <span className="text-sm text-gray-300 font-light">
                  photo-name.png
                </span>
              </div>
              <img
                src="/assets/icons/DownloadIcon.svg"
                alt="Download"
                className="bg-slate-800 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1020%2C1020&ssl=1"
                  alt=""
                  className="rounded-lg h-10"
                />
                <span className="text-sm text-gray-300 font-light">
                  photo-name.png
                </span>
              </div>
              <img
                src="/assets/icons/DownloadIcon.svg"
                alt="Download"
                className="bg-slate-800 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <span>Shared Files</span>
            <img
              src="/assets/icons/ArrowDownIcon.svg"
              alt="Arrow down"
              className="cursor-pointer bg-slate-800"
            />
          </div>
        </div>
        <button
          onClick={handleBlock}
          className="bg-red-700 px-6 py-2 hover:bg-red-800"
        >
          {isCurrentUserBlocked
            ? "You are Blocked"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
        <button
          onClick={() => auth.signOut()}
          className="bg-blue-700 px-6 py-2 hover:bg-blue-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Detail;
