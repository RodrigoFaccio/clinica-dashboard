import {create} from 'zustand';

type UserState = {
  isLogged: boolean;
  username: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
};

const useUserStore = create<UserState>((set) => ({
  isLogged: false,
  username: null,
  token: null,
  login: (username, token) => set({ isLogged: true, username, token }),
  logout: () => set({ isLogged: false, username: null, token: null }),
}));

export default useUserStore;
