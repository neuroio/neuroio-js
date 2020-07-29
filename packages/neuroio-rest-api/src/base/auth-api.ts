import { ApiSettingsInterface, ApiInterface } from "./api";

export interface AuthApiSettingsInterface extends ApiSettingsInterface {
  authURL: string;
}

export interface AuthApiInterface extends ApiInterface {
  setAuthURL(url: string): void;
}

class AuthApi implements AuthApiInterface {
  protected httpClient: any;
  protected authURL: string;

  constructor(settings: AuthApiSettingsInterface) {
    this.httpClient = settings.httpClient;
    this.authURL = settings.authURL;
  }

  setAuthURL(url: string) {
    this.authURL = url;
  }
}

export { AuthApi };
