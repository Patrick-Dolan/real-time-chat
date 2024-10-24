import { useState, useRef, useEffect, ChangeEvent } from "react";
import Avatar from "../shared/Avatar";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import uploadImage from "../../lib/uploadImage";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";

interface Chat {
  createdAt: Timestamp;
  messages: Array<Message>;
}

interface Message {
  createdAt: string;
  senderId: string;
  img?: string;
  text: string;
}

interface ImageFile {
  file: File | null;
  url: string;
}

function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImage] = useState<ImageFile>({
    file: null,
    url: "",
  });
  const [chat, setChat] = useState<Chat | null>(null);

  const { currentUser } = useUserStore();
  const { chatId, user } = useChatStore();

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (chatId) {
      const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
        setChat(res.data() as Chat);
      });

      return () => {
        unSub();
      };
    }
  }, [chatId]);

  console.log(chat);

  const handleEmoji = (e: { emoji: string }) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSend = async () => {
    if (text === "") return;

    let imageUrl: string | null = null;

    if (chatId) {
      try {
        if (img.file) {
          imageUrl = await uploadImage(img.file);
        }

        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion({
            senderId: currentUser?.id,
            text,
            createdAt: new Date(),
            ...(imageUrl && { img: imageUrl }),
          }),
        });

        const userIds = [currentUser?.id, user?.id];

        userIds.forEach(async (id) => {
          const userChatsRef = doc(db, "userchats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatsData = userChatsSnapshot.data();

            const chatIndex = userChatsData.chats.findIndex(
              (chat: { chatId: string }) => chat.chatId === chatId
            );

            userChatsData.chats[chatIndex].lastMessage = text;
            userChatsData.chats[chatIndex].isSeen =
              id === currentUser?.id ? true : false;
            userChatsData.chats[chatIndex].updatedAt = Date.now();

            await updateDoc(userChatsRef, {
              chats: userChatsData.chats,
            });
          }
        });
      } catch (err) {
        console.log((err as Error).message);
      } finally {
        setImage({ file: null, url: "" });
        setText("");
      }
    } else {
      console.log("Chat ID is null");
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setImage({
      file: files[0],
      url: URL.createObjectURL(files[0]),
    });
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
        {chat?.messages.map((message: Message) =>
          message.senderId === currentUser?.id ? (
            <SentMessage message={message} key={message.createdAt} />
          ) : (
            <ReceivedMessage
              message={message}
              avatar={user?.avatar || ""}
              key={message.createdAt}
            />
          )
        )}
        {/* Message display for uploading images to chat */}
        {img.url && (
          <div>
            <div>
              <img
                src={img.url}
                alt=""
                className="rounded-lg object-cover w-full"
              />
            </div>
          </div>
        )}
        <div ref={messageEndRef}></div>
      </div>
      {/* Bottom */}
      <div className="flex items-center p-4 justify-between gap-3 mt-auto">
        <div className="flex items-center p-2 gap-3">
          <label htmlFor="file">
            <img
              className="h-5 w-5 cursor-pointer"
              src="/assets/icons/ImageIcon.svg"
              alt="Image"
            />
          </label>
          <input
            type="file"
            name="file"
            id="file"
            className="hidden"
            onChange={handleImageChange}
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
        <button
          className="bg-indigo-800 py-2 px-3 rounded-lg"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
