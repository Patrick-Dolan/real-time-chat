import { DocumentData } from "firebase/firestore";
import { create } from "zustand";
import { useUserStore } from "./userStore";

interface UserStore {
  chatId: string | null;
  user: DocumentData | null | undefined;
  isCurrentUserBlocked: boolean;
  isReceiverBlocked: boolean;
  changeChat: (chatId: string, user: DocumentData | null | undefined) => void;
  changeBlock: () => void;
}

export const useChatStore = create<UserStore>((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chatId: string, user: DocumentData | null | undefined) => {
    const currentUser = useUserStore.getState().currentUser;

    // Check if current user is blocked
    if (user?.blocked.includes(currentUser?.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // Check if receiver is blocked
    if (currentUser?.blocked.includes(user?.id)) {
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    }

    set({
      chatId,
      user,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },

  changeBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },
}));
