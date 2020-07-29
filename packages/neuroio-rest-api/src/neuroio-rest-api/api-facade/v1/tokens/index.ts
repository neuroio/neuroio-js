import { numeric, Paginatable } from "../../../../base/types";
import { AuthApiInterface } from "../../../../base/auth-api";

export interface TokenInterface {
  key: string;
  id: number;
  is_active: boolean;
  created: string;
  expires: string;
}

export interface GetTokenInterface {
  permanent?: boolean;
}

export interface GetTokensParamsInterface
  extends Paginatable,
    GetTokenInterface {}

export interface UpdateTokenParamsInterface {
  id: numeric;
  is_active: boolean;
}

export interface TokensInterface extends AuthApiInterface {
  getTokens(params: GetTokensParamsInterface): Promise<Array<TokenInterface>>;
  createToken(params: GetTokenInterface): Promise<TokenInterface>;
  updateToken(params: UpdateTokenParamsInterface): Promise<TokenInterface>;
  deleteToken(tokenId: numeric): Promise<{}>;
  deleteTokens(params: GetTokenInterface): Promise<{}>;
}
