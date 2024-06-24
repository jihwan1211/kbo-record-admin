import { create } from "zustand";

type SecondMenu = "DONE" | "UNDONE";

type State = {
  secondMenu: SecondMenu;
};

type Action = {
  setSecondMenu: (menu: SecondMenu) => void;
};

const useSideMenuStore = create<State & Action>((set) => ({
  secondMenu: "UNDONE",
  setSecondMenu: (menu: SecondMenu) => {
    set({ secondMenu: menu });
  },
}));

export default useSideMenuStore;
