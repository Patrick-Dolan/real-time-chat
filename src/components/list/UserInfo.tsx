function UserInfo() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full flex justify-center items-center bg-black">
          <img
            src="/public/assets/icons/AvatarIcon.svg"
            alt="Avatar"
            className="h-6"
          />
        </div>
        <h2 className="font-bold">John Doe</h2>
      </div>
      <div className="flex gap-2 h-5">
        <img src="/public/assets/icons/MoreHorizontalIcon.svg" alt="More" />
        <img src="/public/assets/icons/VideoCamIcon.svg" alt="Video" />
        <img src="/public/assets/icons/EditIcon.svg" alt="Edit" />
      </div>
    </div>
  );
}

export default UserInfo;
