import { AuthApi, AuthApiSettingsInterface } from "../../../../base/auth-api";
import {
  TokenInterface,
  TokensInterface,
  GetTokensParamsInterface,
  GetTokenInterface,
  UpdateTokenParamsInterface,
} from "../../../api-facade/v1/tokens";
import { id } from "../../../../base/types";

class Tokens extends AuthApi implements TokensInterface {
  constructor(settings: AuthApiSettingsInterface) {
    super(settings);
    this.getTokens = this.getTokens.bind(this);
    this.getToken = this.getToken.bind(this);
    this.deleteTokens = this.deleteTokens.bind(this);
    this.createToken = this.createToken.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.deleteToken = this.deleteToken.bind(this);
  }

  static apiEndpoint = "tokens/";

  getTokens(params: GetTokensParamsInterface): Promise<Array<TokenInterface>> {
    return this.httpClient.get(this.authURL + Tokens.apiEndpoint, params);
  }

  deleteTokens(data: GetTokenInterface): Promise<void> {
    const { permanent } = data || {};

    return this.httpClient.delete(this.authURL + Tokens.apiEndpoint, {
      permanent,
    });
  }

  getToken(id: id): Promise<TokenInterface> {
    return this.httpClient.get(this.authURL + `${Tokens.apiEndpoint}${id}/`);
  }

  createToken(data: GetTokenInterface): Promise<TokenInterface> {
    const { permanent } = data || {};

    return this.httpClient.post(this.authURL + Tokens.apiEndpoint, {
      permanent,
    });
  }

  updateToken(data: UpdateTokenParamsInterface): Promise<TokenInterface> {
    const { id, is_active } = data || {};

    return this.httpClient.put(this.authURL + `${Tokens.apiEndpoint}${id}/`, {
      is_active,
    });
  }

  deleteToken(id: id): Promise<void> {
    return this.httpClient.delete(this.authURL + `${Tokens.apiEndpoint}${id}/`);
  }
}

export { Tokens };
