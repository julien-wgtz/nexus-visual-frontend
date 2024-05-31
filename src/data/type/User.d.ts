import { Account } from "./Account";

export type User = {
  id: number;
  email: string;
  theme: string;
  language: string;
  featureFlags: JSON;
  role: UserRole;
  currentAccount: Account;
};

