import { create } from "zustand";

export type TSecondMenu = "WEEKLY-TEAM-ACHIEVED" | "WEEKLY-TEAM-NOT-ACHIEVED" | "WEEKLY-PLAYER-ACHIEVED" | "WEEKLY-PLAYER-NOT-ACHIEVED" | "DAILY-NOT-ACHIEVED" | "DAILY-ACHIEVED";

type State = {
  secondMenu: TSecondMenu;
};

type Action = {
  setSecondMenu: (menu: TSecondMenu) => void;
};

const useSideMenuStore = create<State & Action>((set) => ({
  secondMenu: "WEEKLY-TEAM-NOT-ACHIEVED",
  setSecondMenu: (menu: TSecondMenu) => {
    set({ secondMenu: menu });
  },
}));

export default useSideMenuStore;
