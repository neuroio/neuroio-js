import { SpaceInterface } from "../v1/spaces";
import { TokenInterface } from "../v1/tokens";
import { AuthApiInterface } from "../../../base/auth-api";

export interface UserInterface {
  username: string;
  space: SpaceInterface | null;
}

export interface LoginUserInterface {
  token: TokenInterface;
  user: UserInterface;
}

export interface ChangeUserPasswordInterface {
  old_password: string;
  password: string;
  password2: string;
  reset_tokens?: boolean;
}

export interface AuthInterface extends AuthApiInterface {
  login(username: string, password: string): Promise<LoginUserInterface>;
  logout(tokenId: string): Promise<{}>;
  whoami(): Promise<UserInterface>;
  changePassword(data: ChangeUserPasswordInterface): Promise<{}>;
}

// _________
export interface HttpClientInterface {
  setToken(token: string): void;
  deleteToken(): void;
  setBaseURL(url: string): void;
}
