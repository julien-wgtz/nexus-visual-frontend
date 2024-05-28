import { Account } from '@/data/type/Account';
import { AccountStatus } from '@/data/enum/Account';
import { User } from '@/data/type/User';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import useDashboardStore from './dashboardStore';

export const useAppStore = create(
  persist(
    (set, get) => ({
      user: null,
      account: null,
      accountId: null,
      role: AccountStatus.FREE,
      setUser: (user: User) => set({ user }),
      setAccount: (account: Account) => {
        set({ 
          account,
          status: account.status,
          accountId: account.id
        })

      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
