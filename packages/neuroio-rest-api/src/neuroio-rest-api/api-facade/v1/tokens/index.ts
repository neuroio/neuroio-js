import { Paginatable, id } from "../../../../base/types";
import { AuthApiInterface } from "../../../../base/auth-api";

export interface TokenInterface {
  key: string;
  id: id;
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
  id: id;
  is_active: boolean;
}

export interface TokensInterface extends AuthApiInterface {
  getTokens(params: GetTokensParamsInterface): Promise<Array<TokenInterface>>;
  getToken(id: id): Promise<TokenInterface>;
  createToken(params: GetTokenInterface): Promise<TokenInterface>;
  updateToken(params: UpdateTokenParamsInterface): Promise<TokenInterface>;
  deleteToken(id: id): Promise<void>;
  deleteTokens(params: GetTokenInterface): Promise<void>;
}
