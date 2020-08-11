import { AuthApi, AuthApiSettingsInterface } from "../../../../base/auth-api";
import {
  AuthInterface,
  UserInterface,
  LoginUserInterface,
  ChangeUserPasswordInterface,
} from "../../../api-facade/auth";

class Auth extends AuthApi implements AuthInterface {
  constructor(settings: AuthApiSettingsInterface) {
    super(settings);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.whoami = this.whoami.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  login(username: string, password: string): Promise<LoginUserInterface> {
    return this.httpClient
      .post(this.authURL + "auth/token/", { username, password })
      .then(({ token, user }: LoginUserInterface) => ({
        token,
        user,
      }));
  }

  logout(tokenId: string): Promise<{}> {
    return this.httpClient.delete(this.authURL + `tokens/${tokenId}/`);
  }

  whoami(): Promise<UserInterface> {
    return this.httpClient.get(this.authURL + "whoami/");
  }

  changePassword(data: ChangeUserPasswordInterface): Promise<{}> {
    return this.httpClient.post(this.authURL + "auth/password/change/", data);
  }
}

export { Auth };
