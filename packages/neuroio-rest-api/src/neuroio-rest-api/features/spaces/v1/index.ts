import { AuthApi, AuthApiSettingsInterface } from "../../../../base/auth-api";
import {
  SpaceInterface,
  SpaceDataInterface,
  SpacesInterface,
  GetSpacesParamsInterface,
  CreateSpaceTokenInterface,
} from "../../../api-facade/v1/spaces";
import { id } from "../../../../base/types";
import { TokenInterface } from "../../../api-facade/v1/tokens";

class Spaces extends AuthApi implements SpacesInterface {
  constructor(settings: AuthApiSettingsInterface) {
    super(settings);
    this.getSpaces = this.getSpaces.bind(this);
    this.getSpace = this.getSpace.bind(this);
    this.createSpace = this.createSpace.bind(this);
    this.updateSpace = this.updateSpace.bind(this);
    this.deleteSpace = this.deleteSpace.bind(this);
    this.createToken = this.createToken.bind(this);
  }

  static apiEndpoint = "spaces/";

  static getSpaceData = ({ name }: SpaceDataInterface): {} => ({
    name,
  });

  getSpaces(params: GetSpacesParamsInterface): Promise<Array<SpaceInterface>> {
    return this.httpClient.get(this.authURL + Spaces.apiEndpoint, params);
  }

  getSpace(id: id): Promise<SpaceInterface> {
    return this.httpClient.get(this.authURL + `${Spaces.apiEndpoint}${id}/`);
  }

  createSpace(data: SpaceDataInterface): Promise<SpaceInterface> {
    return this.httpClient.post(
      this.authURL + Spaces.apiEndpoint,
      Spaces.getSpaceData(data)
    );
  }

  updateSpace(data: SpaceInterface): Promise<SpaceInterface> {
    return this.httpClient.put(
      this.authURL + `${Spaces.apiEndpoint}${data.id}/`,
      Spaces.getSpaceData(data)
    );
  }

  deleteSpace(id: id): Promise<null> {
    return this.httpClient.delete(this.authURL + `${Spaces.apiEndpoint}${id}/`);
  }

  createToken(data: CreateSpaceTokenInterface): Promise<TokenInterface> {
    const { id, ...restData } = data;

    return this.httpClient.post(
      this.authURL + `${Spaces.apiEndpoint}${id}/tokens/`,
      restData
    );
  }
}

export { Spaces };
