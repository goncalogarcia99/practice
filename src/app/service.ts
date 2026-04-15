import express, { Express, json, urlencoded } from "express";
import { Server } from "net";
import { Aggregate } from "../domain/aggregate";
import { IAccountsRepo } from "../domain/iaccounts_repo";
import { IExternalApi } from "../domain/iexternal_api";
import { ExternalApi } from "../implementations/external_api";
import { MemoryAccountsRepo } from "../implementations/memory_accounts_repo";
import { Routes } from "./routes";

const PORT = 1234;
const PATH_ACCOUNTS_API = "/accounts";

export class Service {
  static app: Express;
  static expressServer: Server;
  static accountsRepo: IAccountsRepo;
  static externalApi: IExternalApi;
  static aggregate: Aggregate;

  static async start(): Promise<void> {
    console.log(`PID: ${process.pid}`);

    this.accountsRepo = new MemoryAccountsRepo();
    await this.accountsRepo.init();

    this.externalApi = new ExternalApi();
    await this.externalApi.init();

    this.aggregate = new Aggregate(this.accountsRepo, this.externalApi);
    await this.aggregate.init();

    await this.setUpExpress();
  }

  static async stop(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      this.expressServer.close(async (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
    await this.aggregate.destroy();
    await this.accountsRepo.destroy();
    await this.externalApi.destroy();
  }

  private static async setUpExpress(): Promise<void> {
    this.app = express();
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));

    const routes: Routes = new Routes(this.aggregate, this.accountsRepo);
    this.app.use(PATH_ACCOUNTS_API, routes.router);

    await new Promise<void>((resolve, reject) => {
      const onError = (err: Error) => {
        reject(err);
      };

      this.expressServer = this.app.listen(PORT, () => {
        this.expressServer.off("error", onError);
        console.log(`Server ready 🚀`);
        console.log(`Port: ${PORT}`);
        resolve();
      });

      this.expressServer.once("error", onError);
    });
  }
}
