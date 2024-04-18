import { Account } from "@/type/Account";
import { User } from "@/type/User";
import { create } from "zustand";
import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set, get) => ({
      user: null,
      account: null,
      setUser: (user: User) => set({ user }),
      setAccount: (account: Account) =>
        set({ account }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(
        () => sessionStorage
      ),
    }
  )
);
