import { ChangeEvent, FormEvent, useState } from "react";
import Avatar from "../shared/Avatar";
import { toast } from "react-toastify";

interface AvatarFile {
  file: File | null;
  url: string;
}

const inputStyles = "bg-slate-800 p-2 rounded-lg";

function Login() {
  const [avatar, setAvatar] = useState<AvatarFile>({ file: null, url: "" });

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setAvatar({
      file: files[0],
      url: URL.createObjectURL(files[0]),
    });
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success("Hello");
  };

  return (
    <div className="h-full w-full flex justify-evenly items-center">
      <div className="w-3/12">
        <h2 className="text-center mb-4 font-bold text-lg">Welcome back,</h2>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            className={`${inputStyles}`}
            type="text"
            placeholder="Email"
            name="email"
          />
          <input
            className={`${inputStyles}`}
            type="password"
            placeholder="Password"
            name="password"
          />
          <button className="bg-blue-700 px-6 py-2 hover:bg-blue-800">
            Sign in
          </button>
        </form>
      </div>
      <div className="w-px bg-black h-3/4"></div>
      <div className="w-3/12">
        <h2 className="text-center mb-4 font-bold text-lg">
          Create an account
        </h2>
        <form className="flex flex-col gap-4">
          <div className="mx-auto">
            <Avatar size="md" avatarURL={avatar.url} />
          </div>
          <label
            htmlFor="file"
            className="text-center cursor-pointer bg-blue-700 px-6 py-2 hover:bg-blue-800 w-3/4 mx-auto"
          >
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <input
            className={`${inputStyles}`}
            type="text"
            placeholder="Username"
            name="username"
          />
          <input
            className={`${inputStyles}`}
            type="text"
            placeholder="Email"
            name="email"
          />
          <input
            className={`${inputStyles}`}
            type="password"
            placeholder="Password"
            name="password"
          />
          <button className="bg-blue-700 px-6 py-2 hover:bg-blue-800">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;