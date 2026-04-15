import { Account } from "../domain/account";
import { IExternalApi } from "../domain/iexternal_api";

export class ExternalApi implements IExternalApi {
  async init(): Promise<void> {}

  async destroy(): Promise<void> {}

  async doSomething(): Promise<any> {
    return this.getWithAuthentication();
  }

  private async getChuckNorrisJoke(): Promise<string> {
    const url: string = "https://api.chucknorris.io/jokes/random";

    const response: Response = await fetch(url);

    const json = await response.json();
    const joke: string = json.value;
    return joke;
  }

  private async getWithAuthentication(): Promise<string> {
    const url: string =
      "https://www.blp-digital.ch/datasync/purchase-orders/aea842f0-e52a-f011-9af4-6045bde99e66?start=&count=1&detail=true&search=";
    const token: string =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjMzNDQ0MTA3MTU4Mjk1ODg2MiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiMTgzMDI1NjY2NzI2Mjk3ODU3Il0sImNsaWVudF9pZCI6ImdvbmNhbG8tbWFjaGluZS11c2VyQHNlcnZpY2UtYWNjb3VudC5hZjkzM2ZmMC0yMTdiLTU5YzEtODVmNC1iZDFjM2NjNzY5MmQuYmxwLWRpZ2l0YWwuY29tIiwiZXhwIjoxNzYyNzUzOTQzLCJpYXQiOjE3NjI3MTA3NDMsImlzcyI6Imh0dHBzOi8vbG9naW4uYmxwLWRpZ2l0YWwuY2giLCJqdGkiOiJWMl8zNDU5NzA5MjkyNTc0NTQzNzktYXRfMzQ1OTcwOTI5MjU3NTE5OTE1IiwibmJmIjoxNzYyNzEwNzQzLCJzdWIiOiIzNDU2MjM2NTI1OTY5NjczMTQiLCJ1cm46eml0YWRlbDppYW06b3JnOnByb2plY3Q6MTgzMDI1NjY2NzI2Mjk3ODU3OnJvbGVzIjp7ImFmOTMzZmYwLTIxN2ItNTljMS04NWY0LWJkMWMzY2M3NjkyZCI6eyIzMzEzMDA0ODEzODcyNDYwNTMiOiJhZjkzM2ZmMC0yMTdiLTU5YzEtODVmNC1iZDFjM2NjNzY5MmQubG9naW4uYmxwLWRpZ2l0YWwuY2gifSwidXNlciI6eyIzMzEzMDA0ODEzODcyNDYwNTMiOiJhZjkzM2ZmMC0yMTdiLTU5YzEtODVmNC1iZDFjM2NjNzY5MmQubG9naW4uYmxwLWRpZ2l0YWwuY2gifX0sInVybjp6aXRhZGVsOmlhbTp1c2VyOm1ldGFkYXRhIjp7ImFmOTMzZmYwLTIxN2ItNTljMS04NWY0LWJkMWMzY2M3NjkyZCI6IlpXVTJNelZqTkRJdE4yUTFZeTAxT1dGbUxUaGtPR0V0TTJJM1kyWm1ZVE14TVdVMyIsInVzZXJJRCI6IlpXVTJNelZqTkRJdE4yUTFZeTAxT1dGbUxUaGtPR0V0TTJJM1kyWm1ZVE14TVdVMyJ9fQ.DEJZtyZrCMVXNGL_hEAnvZ7IjicKKKMNf8_r9K4aZGdm5xthG1LxzhBmt5eOMwaqDqSJ0o1JMkr2TB4dmiSoJncOBxrwgerpfapxi_tCSrK-3_lH57SgYEvynHd6-Ai-2rn9-z1y4aVbmo4R7K5DvkD8NGRTmaxD7xlEdrmgrExgdYyPvBpNbhWsFGzmyq5ulEOYsTyhLlBDbZzUoMEVtUgBzsoOAb39yjQQ2-7mNxwMjBQfvafljH5IBHPpN5RSsNwRURlKK0qTiJLF95LgUfbgjrjrHQ6GieHWeDpc9UyPlpdtkmkhUgB4I56ObxKl_eAT9MjSp_WJfZGIY262kw";

    const response: Response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    return JSON.stringify(json);
  }

  private async createAccount(): Promise<string> {
    const url = "http://localhost:1234/accounts";
    const account: Account = {
      id: "1234",
      details: "hello world",
    };

    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });

    const json = await response.json();
    const accountId: string = json.accountId;
    return accountId;
  }
}
