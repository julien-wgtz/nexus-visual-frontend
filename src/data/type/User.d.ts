import { Account } from "./Account";

export type User = {
  id: number;
  email: string;
  role: UserRole;
  currentAccount: Account;
};

