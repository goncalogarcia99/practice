import { Request, Response, Router } from "express";
import { Account } from "../domain/account";
import { Aggregate } from "../domain/aggregate";
import { IAccountsRepo } from "../domain/iaccounts_repo";

type ReqBodyAccountId = {
  accountId: string;
};

export class Routes {
  private readonly _router: Router;
  private readonly aggregate: Aggregate;
  private readonly accountsRepo: IAccountsRepo;

  constructor(aggregate: Aggregate, accountRepo: IAccountsRepo) {
    this._router = Router();
    this.aggregate = aggregate;
    this.accountsRepo = accountRepo;

    this._router.post("/", this.postAccount.bind(this));
    this._router.get("/:accountId", this.getAccount.bind(this));
    this._router.delete("/:accountId", this.deleteAccount.bind(this));

    this._router.get("/", this.doSomething.bind(this));
  }

  get router(): Router {
    return this._router;
  }

  private async postAccount(req: Request, res: Response): Promise<void> {
    try {
      const accountId: string = await this.aggregate.createAccount(req.body);
      res.status(200).json({
        result: "success",
        accountId,
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "account already exists") {
        res.status(409).json({
          result: "error",
          message: err.message,
        });
        return;
      }
      res.status(500).json({
        result: "error",
        message: "unknown error",
      });
    }
  }

  // Goes straight to repo, not through the aggregate.
  private async getAccount(
    req: Request<ReqBodyAccountId>,
    res: Response,
  ): Promise<void> {
    try {
      const account: Account | null = await this.accountsRepo.getAccount(
        req.params.accountId,
      );
      if (!account) {
        res.status(404).json({
          result: "error",
          message: "no such account",
        });
        return;
      }
      res.status(200).json({
        result: "success",
        account,
      });
    } catch (err: unknown) {
      res.status(500).json({
        result: "error",
        message: "unknown error",
      });
    }
  }

  private async deleteAccount(
    req: Request<ReqBodyAccountId>,
    res: Response,
  ): Promise<void> {
    try {
      const deleteResult: boolean = await this.aggregate.deleteAccount(
        req.params.accountId,
      );
      if (!deleteResult) {
        res.status(404).json({
          result: "error",
          message: "no such account",
        });
        return;
      }
      res.status(200).json({
        result: "success",
        message: "account deleted",
      });
    } catch (err: unknown) {
      res.status(500).json({
        result: "error",
        message: "unknown error",
      });
    }
  }

  private async doSomething(req: Request, res: Response): Promise<void> {
    try {
      const doSomethingResult = await this.aggregate.doSomething();
      res.status(200).json({
        result: "success",
        doSomethingResult,
      });
    } catch (err: unknown) {
      res.status(500).json({
        result: "error",
        message: "unknown error",
      });
    }
  }
}
