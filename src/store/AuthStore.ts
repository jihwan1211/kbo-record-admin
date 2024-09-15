import { create } from "zustand";

const TOKEN_KEY = "TOKEN";

type State = {
  isLoggedIn: boolean;
};

type Action = {
  storeLogin: (token: string) => void;
  storeLogout: () => void;
};

export const getToken = () => {
  const accessToken = localStorage.getItem(TOKEN_KEY);
  return accessToken;
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const useAuthStore = create<State & Action>((set) => ({
  isLoggedIn: getToken() ? true : false,
  storeLogin: (token: string) => {
    setToken(token);
    set({ isLoggedIn: true });
  },
  storeLogout: () => {
    removeToken();
    set({ isLoggedIn: false });
  },
}));

export default useAuthStore;
