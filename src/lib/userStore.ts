import { doc, DocumentData, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

interface UserStore {
  currentUser: DocumentData | null | undefined;
  isLoading: boolean;
  fetchUserInfo: (uid: string | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid: string | null | undefined) => {
    if (!uid) return set({ currentUser: null, isLoading: false });
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.log((err as Error).message);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
