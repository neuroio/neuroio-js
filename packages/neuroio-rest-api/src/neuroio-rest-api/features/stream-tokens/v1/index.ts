import { Api, ApiSettingsInterface } from "../../../../base/api";
import {
  StreamTokensInterface,
  StreamTokenInterface,
  GetStreamTokenInterface,
  GetStreamTokensParamsInterface,
  UpdateStreamTokenParamsInterface,
} from "../../../api-facade/v1/stream-tokens";
import { id } from "../../../../base/types";

class StreamTokens extends Api implements StreamTokensInterface {
  constructor(settings: ApiSettingsInterface) {
    super(settings);
    this.getStreamTokens = this.getStreamTokens.bind(this);
    this.getStreamToken = this.getStreamToken.bind(this);
    this.createStreamToken = this.createStreamToken.bind(this);
    this.updateStreamToken = this.updateStreamToken.bind(this);
    this.deleteStreamToken = this.deleteStreamToken.bind(this);
    this.deleteStreamTokens = this.deleteStreamTokens.bind(this);
  }

  static apiEndpoint = "streams/tokens/";

  getStreamTokens(
    params: GetStreamTokensParamsInterface
  ): Promise<Array<StreamTokenInterface>> {
    return this.httpClient.get(StreamTokens.apiEndpoint, params);
  }

  deleteStreamTokens(params: GetStreamTokensParamsInterface): Promise<null> {
    const getFiltersData = ({
      limit,
      offset,
      permanent,
    }: GetStreamTokensParamsInterface = {}) => ({
      limit,
      offset,
      permanent,
    });

    return this.httpClient.delete(
      StreamTokens.apiEndpoint,
      getFiltersData(params)
    );
  }

  getStreamToken(id: id): Promise<StreamTokenInterface> {
    return this.httpClient.get(`${StreamTokens.apiEndpoint}${id}/`);
  }

  createStreamToken(
    data: GetStreamTokenInterface
  ): Promise<StreamTokenInterface> {
    const { permanent } = data || {};

    return this.httpClient.post(StreamTokens.apiEndpoint, {
      permanent,
    });
  }

  updateStreamToken(
    data: UpdateStreamTokenParamsInterface
  ): Promise<StreamTokenInterface> {
    const { id, is_active } = data || {};

    return this.httpClient.put(`${StreamTokens.apiEndpoint}${id}/`, {
      is_active,
    });
  }

  deleteStreamToken(id: id): Promise<null> {
    return this.httpClient.delete(`${StreamTokens.apiEndpoint}${id}/`);
  }
}

export { StreamTokens };
