import { AuthApi } from "../../../../base/auth-api";
import {
  TokenInterface,
  TokensInterface,
  GetTokensParamsInterface,
  GetTokenInterface,
  UpdateTokenParamsInterface,
} from "../../../api-facade/v1/tokens";
import { numeric } from "../../../../base/types";

const TOKENS = "tokens/";

class Tokens extends AuthApi implements TokensInterface {
  getTokens(params: GetTokensParamsInterface): Promise<Array<TokenInterface>> {
    return this.httpClient.get(this.authURL + TOKENS, params);
  }

  deleteTokens(data: GetTokenInterface): Promise<{}> {
    const { permanent } = data || {};

    return this.httpClient.delete(this.authURL + TOKENS, { permanent });
  }

  createToken(data: GetTokenInterface): Promise<TokenInterface> {
    const { permanent } = data || {};

    return this.httpClient.post(this.authURL + TOKENS, { permanent });
  }

  updateToken(data: UpdateTokenParamsInterface): Promise<TokenInterface> {
    const { id, is_active } = data || {};

    return this.httpClient.put(this.authURL + `${TOKENS}${id}/`, { is_active });
  }

  deleteToken(id: numeric): Promise<{}> {
    return this.httpClient.delete(this.authURL + `${TOKENS}${id}/`);
  }
}

export { Tokens };
