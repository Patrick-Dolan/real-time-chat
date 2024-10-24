interface Message {
  createdAt: string;
  senderId: string;
  img?: string;
  text: string;
}

function SentMessage({ message }: { message: Message }) {
  return (
    <div className="max-w-7/10 ml-auto" key={message?.createdAt}>
      <div>
        {message.img && (
          <img
            src={message.img}
            alt="message image"
            className="rounded-lg object-cover w-full"
          />
        )}
        <p className="bg-indigo-600 p-2 rounded-lg">{message.text}</p>
        {/* <span className="text-sm">{message.createdAt}</span> */}
      </div>
    </div>
  );
}

export default SentMessage;
