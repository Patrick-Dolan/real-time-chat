import Avatar from "../shared/Avatar";

function UserInfo() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar size="sm" rounded={true} />
        <h2 className="font-bold">John Doe</h2>
      </div>
      <div className="flex gap-2 h-5">
        <img src="/assets/icons/MoreHorizontalIcon.svg" alt="More" />
        <img src="/assets/icons/VideoCamIcon.svg" alt="Video" />
        <img src="/assets/icons/EditIcon.svg" alt="Edit" />
      </div>
    </div>
  );
}

export default UserInfo;
