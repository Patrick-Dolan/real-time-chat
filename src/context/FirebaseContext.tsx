import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { UserDetails } from "../interfaces";

interface FirebaseContextProviderProps {
  children: ReactNode;
}

interface FirebaseContextType {
  user: User | null;
  logout: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  registerUser: (user: UserDetails) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseContextProvider = ({
  children,
}: FirebaseContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const registerUser = async (user: UserDetails) => {
    // Register user with auth
    const response = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    // Create user entry in DB
    await setDoc(doc(db, "users", response.user.uid), {
      username: user.username,
      email: user.email,
      avatar: user.imageURL,
      id: response.user.uid,
      blocked: [],
    });
    // Create user chats entry in DB
    await setDoc(doc(db, "userchats", response.user.uid), {
      chats: [],
    });
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        logout,
        signIn,
        registerUser,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFirebaseContext = () => {
  const contextValue = useContext(FirebaseContext);
  if (!contextValue) {
    throw new Error(
      "useFirebaseContext must be used within a FirebaseContextProvider."
    );
  }
  return contextValue;
};
