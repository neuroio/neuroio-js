import { Paginatable, id } from "../../../../base/types";

export interface StreamTokenInterface {
  key: string;
  id: id;
  is_active: boolean;
  created: string;
  expires: string;
}

export interface GetStreamTokenInterface {
  permanent?: boolean;
}

export interface GetStreamTokensParamsInterface
  extends Paginatable,
    GetStreamTokenInterface {}

export interface UpdateStreamTokenParamsInterface {
  id: id;
  is_active: boolean;
}

export interface StreamTokensInterface {
  getStreamTokens(filters: GetStreamTokenInterface): Promise<null>;
  getStreamToken(streamTokenId: id): Promise<StreamTokenInterface>;
  createStreamToken(
    streamToken: GetStreamTokenInterface
  ): Promise<StreamTokenInterface>;
  updateStreamToken(
    params: UpdateStreamTokenParamsInterface
  ): Promise<StreamTokenInterface>;
  deleteStreamToken(streamTokenId: id): Promise<null>;
  deleteStreamTokens(params: GetStreamTokenInterface): Promise<null>;
}
