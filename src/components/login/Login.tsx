import { ChangeEvent, FormEvent, useState } from "react";
import Avatar from "../shared/Avatar";
import { toast } from "react-toastify";
import uploadImage from "../../lib/uploadImage";
import { useFirebaseContext } from "../../context/FirebaseContext";
import { UserDetails } from "../../interfaces";

interface AvatarFile {
  file: File | null;
  url: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

const inputStyles = "bg-slate-800 p-2 rounded-lg";

function Login() {
  const [avatar, setAvatar] = useState<AvatarFile>({ file: null, url: "" });
  const [loading, setLoading] = useState(false);

  const { signIn, registerUser } = useFirebaseContext();

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setAvatar({
      file: files[0],
      url: URL.createObjectURL(files[0]),
    });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formRef = e.currentTarget as HTMLFormElement;
    const formData = new FormData(e.currentTarget);
    const formValues: LoginFormValues = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const { email, password } = formValues;

    try {
      setLoading(true);
      await signIn(email, password);
      formRef.reset();
      toast.success("You're signed in!");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formRef = e.currentTarget as HTMLFormElement;
    const formData = new FormData(e.currentTarget);
    const formValues: RegisterFormValues = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const { username, email, password } = formValues;

    try {
      setLoading(true);
      const imageURL = avatar.file ? await uploadImage(avatar.file) : "";
      const user: UserDetails = {
        email,
        password,
        username,
        imageURL,
      };
      await registerUser(user);
      formRef.reset();
      toast.success("Account created!");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
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
          <button
            disabled={loading}
            className="bg-blue-700 px-6 py-2 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Sign in"}
          </button>
        </form>
      </div>
      <div className="w-px bg-black h-3/4"></div>
      <div className="w-3/12">
        <h2 className="text-center mb-4 font-bold text-lg">
          Create an account
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
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
            required
          />
          <input
            className={`${inputStyles}`}
            type="text"
            placeholder="Email"
            name="email"
            required
          />
          <input
            className={`${inputStyles}`}
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <button
            disabled={loading}
            className="bg-blue-700 px-6 py-2 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
