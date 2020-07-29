import { AuthInterface, LoginUserInterface, HttpClientInterface } from "./auth";

export interface EndpointInterface {
  base: string;
  auth: string;
}

export interface ApiFacadeSettingsInterface {
  httpClient: HttpClientInterface;
  auth: AuthInterface;
}

export interface ApiFacadeInterface {
  init(username: string, password: string): Promise<LoginUserInterface>;
  setToken(token: string): void;
  deleteToken(): void;
  setEndpoint(endpoint: EndpointInterface): void;

  auth: AuthInterface;
}

class ApiFacade implements ApiFacadeInterface {
  protected httpClient: HttpClientInterface;
  auth: AuthInterface;

  constructor({ httpClient, auth }: ApiFacadeSettingsInterface) {
    this.httpClient = httpClient;
    this.auth = auth;
  }

  init(username: string, password: string): Promise<LoginUserInterface> {
    return this.auth
      .login(username, password)
      .then((body: LoginUserInterface) => {
        const { token } = body;
        this.setToken(token.key);

        return body;
      });
  }

  setToken(token: string): void {
    this.httpClient.setToken(token);
  }

  deleteToken(): void {
    this.httpClient.deleteToken();
  }

  setEndpoint(endpoint: EndpointInterface): void {
    if (!endpoint) return;
    this.httpClient.setBaseURL(endpoint.base);
    this.auth.setAuthURL(endpoint.auth);
  }
}

export { ApiFacade };
