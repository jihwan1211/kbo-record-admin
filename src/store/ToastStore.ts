import { create } from "zustand";

export type ToastType = "info" | "error";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastStoreState {
  toasts: Toast[];
  addToast: ({ message, type }: Omit<Toast, "id">) => void;
  removeToast: (id: number) => void;
}

const useToastStore = create<ToastStoreState>((set) => ({
  toasts: [],
  addToast: ({ message, type }: Omit<Toast, "id">) => {
    set((state) => ({
      toasts: [...state.toasts, { message, type, id: Date.now() }],
    }));
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

export default useToastStore;
