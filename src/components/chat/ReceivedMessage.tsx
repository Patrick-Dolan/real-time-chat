import Avatar from "../shared/Avatar";

interface Message {
  createdAt: string;
  senderId: string;
  img?: string;
  text: string;
}

function ReceivedMessage({
  message,
  avatar,
}: {
  message: Message;
  avatar: string;
}) {
  return (
    <div className="max-w-7/10 flex gap-4">
      <div>
        <Avatar size="sm" rounded={true} avatarURL={avatar} />
      </div>
      <div>
        {message.img && (
          <img
            src={message.img}
            alt="message image"
            className="rounded-lg object-cover w-full"
          />
        )}
        <p>{message.text}</p>
        {/* <span className="text-sm">1 min ago</span> */}
      </div>
    </div>
  );
}

export default ReceivedMessage;
