import { AuthApi } from "../../../../base/auth-api";
import {
  AuthInterface,
  UserInterface,
  LoginUserInterface,
  ChangeUserPasswordInterface,
} from "../../../api-facade/auth";

class Auth extends AuthApi implements AuthInterface {
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
