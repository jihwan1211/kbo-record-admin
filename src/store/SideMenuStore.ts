import { create } from "zustand";

type SecondMenu = "WEEKLY-TEAM-ACHIEVED" | "WEEKLY-TEAM-NOT-ACHIEVED" | "WEEKLY-PLAYER-ACHIEVED" | "WEEKLY-PLAYER-NOT-ACHIEVED" | "UNDONE" | "DONE";

type State = {
  secondMenu: SecondMenu;
};

type Action = {
  setSecondMenu: (menu: SecondMenu) => void;
};

const useSideMenuStore = create<State & Action>((set) => ({
  secondMenu: "WEEKLY-TEAM-NOT-ACHIEVED",
  setSecondMenu: (menu: SecondMenu) => {
    set({ secondMenu: menu });
  },
}));

export default useSideMenuStore;
