import { Paginatable, Searchable, id } from "../../../../base/types";
import { AuthApiInterface } from "../../../../base/auth-api";

export interface SpaceInterface {
  id: id;
  name: string;
}

export interface SpaceDataInterface {
  name: string;
}

export interface GetSpacesParamsInterface extends Paginatable, Searchable {}

export interface SpacesInterface extends AuthApiInterface {
  getSpaces(params: GetSpacesParamsInterface): Promise<Array<SpaceInterface>>;
  getSpace(id: id): Promise<SpaceInterface>;
  createSpace(data: SpaceDataInterface): Promise<SpaceInterface>;
  updateSpace(data: SpaceInterface): Promise<SpaceInterface>;
  deleteSpace(id: id): Promise<{}>;
}
