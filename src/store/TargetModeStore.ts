import { create } from "zustand";

interface DateStoreState {
  target: "weekly" | "daily";
  mode: "team" | "player";
  setTargetModeState: (target: "weekly" | "daily", mode: "team" | "player") => void;
}

const useTargetModeStore = create<DateStoreState>((set) => ({
  target: "weekly",
  mode: "team",
  setTargetModeState: (target, mode) => {
    set(() => ({
      target,
      mode,
    }));
  },
}));

export default useTargetModeStore;
