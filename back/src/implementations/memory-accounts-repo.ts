import { Account } from "../domain/account.js";
import { IAccountsRepo } from "../domain/iaccounts-repo.js";

export class MemoryAccountsRepo implements IAccountsRepo {
  private readonly accounts: Map<string, Account>;

  constructor() {
    this.accounts = new Map();
  }

  async init(): Promise<void> {}

  async destroy(): Promise<void> {}

  async storeAccount(account: Account): Promise<void> {
    this.accounts.set(account.id, account);
  }

  async getAccount(accountId: string): Promise<Account | null> {
    return this.accounts.get(accountId) ?? null;
  }

  async deleteAccount(accountId: string): Promise<boolean> {
    return this.accounts.delete(accountId);
  }
}
