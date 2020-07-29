import { AuthApi } from "../../../../base/auth-api";
import {
  SpaceInterface,
  SpaceDataInterface,
  SpacesInterface,
  GetSpacesParamsInterface,
} from "../../../api-facade/v1/spaces";
import { id } from "../../../../base/types";

const SPACES = "spaces/";

class Spaces extends AuthApi implements SpacesInterface {
  static getSpaceData = ({ name }: SpaceDataInterface): {} => ({
    name,
  });

  getSpaces(params: GetSpacesParamsInterface): Promise<Array<SpaceInterface>> {
    return this.httpClient.get(this.authURL + SPACES, params);
  }

  getSpace(id: id): Promise<SpaceInterface> {
    return this.httpClient.get(this.authURL + `${SPACES}${id}/`);
  }

  createSpace(data: SpaceDataInterface): Promise<SpaceInterface> {
    return this.httpClient.post(
      this.authURL + SPACES,
      Spaces.getSpaceData(data)
    );
  }

  updateSpace(data: SpaceInterface): Promise<SpaceInterface> {
    return this.httpClient.put(
      this.authURL + `${SPACES}${data.id}/`,
      Spaces.getSpaceData(data)
    );
  }

  deleteSpace(id: id): Promise<{}> {
    return this.httpClient.delete(this.authURL + `${SPACES}${id}/`);
  }
}

export { Spaces };
