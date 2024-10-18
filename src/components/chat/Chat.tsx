import { useState } from "react";
import Avatar from "../shared/Avatar";
import EmojiPicker from "emoji-picker-react";

function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleEmoji = (e: { emoji: string }) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className="flex flex-col flex-1 border-black border-l border-r h-full">
      <div className="p-4 flex items-center justify-between border-b border-black">
        <div className="flex items-center gap-4">
          <Avatar rounded={true} size="sm" />
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold">Jane Doe</span>
            <p className="text-sm font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <img className="h-5" src="/assets/icons/PhoneIcon.svg" alt="phone" />
          <img
            className="h-5"
            src="/assets/icons/VideoCamIcon.svg"
            alt="video"
          />
          <img className="h-5" src="/assets/icons/InfoIcon.svg" alt="info" />
        </div>
      </div>
      {/* Center */}
      <div className="flex-1 border-b border-black overflow-y-scroll flex flex-col gap-5 p-4">
        <div className="max-w-7/10 flex gap-4">
          <div>
            <Avatar size="sm" rounded={true} />
          </div>
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              magni voluptatum sit, recusandae nemo nulla nesciunt porro
              laboriosam cumque iusto! Impedit, corporis. Pariatur iste
              voluptatibus dolorum aliquam fuga unde et?
            </p>
            <span className="text-sm">1 min ago</span>
          </div>
        </div>
        <div className="max-w-7/10 ml-auto">
          <div className="texts">
            <img
              src="https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1020%2C1020&ssl=1"
              alt="message image"
              className="rounded-lg object-cover w-full"
            />
            <p className="bg-indigo-600 p-2 rounded-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              magni voluptatum sit, recusandae nemo nulla nesciunt porro
              laboriosam cumque iusto! Impedit, corporis. Pariatur iste
              voluptatibus dolorum aliquam fuga unde et?
            </p>
            <span className="text-sm">1 min ago</span>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="flex items-center p-4 justify-between gap-3 mt-auto">
        <div className="flex items-center p-2 gap-3">
          <img
            className="h-5 w-5 cursor-pointer"
            src="/assets/icons/ImageIcon.svg"
            alt="Image"
          />
          <img
            className="h-5 w-5 cursor-pointer"
            src="/assets/icons/CameraIcon.svg"
            alt="Camera"
          />
          <img
            className="h-5 w-5 cursor-pointer"
            src="/assets/icons/MicIcon.svg"
            alt="Microphone"
          />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          className="flex-1 p-2 rounded-lg border-none text-white bg-slate-800"
          onChange={(e) => setText(e.target.value)}
        />
        <div className="cursor-pointer relative">
          <img
            className="h-5 w-5"
            src="/assets/icons/EmojiIcon.svg"
            alt="Emoji"
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="absolute bottom-14 left-0">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="bg-indigo-800 py-2 px-3 rounded-lg">Send</button>
      </div>
    </div>
  );
}

export default Chat;
