import { Account } from "./account";
import { IAccountsRepo } from "./iaccounts_repo";
import { IExternalApi } from "./iexternal_api";

export class Aggregate {
  private readonly accountsRepo: IAccountsRepo;
  private readonly externalApi: IExternalApi;

  constructor(accountsRepo: IAccountsRepo, externalApi: IExternalApi) {
    this.accountsRepo = accountsRepo;
    this.externalApi = externalApi;
  }

  async init(): Promise<void> {}

  async destroy(): Promise<void> {}

  async createAccount(account: Account): Promise<string> {
    if (await this.accountsRepo.getAccount(account.id)) {
      throw new Error("account already exists");
    }
    await this.accountsRepo.storeAccount(account);
    return account.id;
  }

  async getAccount(accountId: string): Promise<Account | null> {
    return this.accountsRepo.getAccount(accountId);
  }

  async deleteAccount(accountId: string): Promise<boolean> {
    return this.accountsRepo.deleteAccount(accountId);
  }

  async doSomething(): Promise<any> {
    return this.externalApi.doSomething();
  }
}
