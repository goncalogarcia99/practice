import { Account } from "./account";

export interface IAccountsRepo {
  init(): Promise<void>;
  destroy(): Promise<void>;
  storeAccount(account: Account): Promise<void>;
  getAccount(accountId: string): Promise<Account | null>;
  deleteAccount(accountId: string): Promise<boolean>;
}
