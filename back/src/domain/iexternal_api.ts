export interface IExternalApi {
  init(): Promise<void>;
  destroy(): Promise<void>;
  doSomething(): Promise<any>;
}
