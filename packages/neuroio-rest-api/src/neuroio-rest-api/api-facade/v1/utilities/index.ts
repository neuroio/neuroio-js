import { Result, Sex, Mood } from "../../../../base/types";

export interface ComparePhotosParamsInterface {
  image1: File;
  image2: File;
  result?: Result;
}

export interface ComparePhotosResponseInterface {
  similar: boolean;
  result: Result;
}

export interface ComparePersonPhotoWithDocumentPhotoParamsInterface {
  photo: File;
  facesize?: number;
  result?: Result;
}

export interface VerifyPersonPhotoWithDocumentPhotoParamsInterface {
  photo_face: File;
  photo_face_facesize?: number;

  id_code: string;
  photo_id: File;
  photo_id_facesize?: number;

  result?: Result;
}

export interface VerifyPersonPhotoWithDocumentPhotoResponseInterface
  extends ComparePhotosResponseInterface {
  extra?: {};
  documents: [];
}

export interface CheckAsmParamsInterface {
  image: File;
}

export interface CheckAsmResponseInterface {
  age: number;
  sex: Sex;
  mood: Mood;
}

export interface FindOutCustomerParamsInterface {
  source?: string;
  offset?: number;
}

export interface FindOutCustomerResponseInterface {
  pid: string;
}

export interface GetApiVersionResponseInterface {
  version: string;
}

export interface UtilitiesInterface {
  comparePhotos(
    params: ComparePhotosParamsInterface
  ): Promise<ComparePhotosResponseInterface>;

  comparePersonPhotoWithDocumentPhoto(
    params: ComparePersonPhotoWithDocumentPhotoParamsInterface
  ): Promise<ComparePhotosResponseInterface>;

  verifyPersonPhotoWithDocumentPhoto(
    params: VerifyPersonPhotoWithDocumentPhotoParamsInterface
  ): Promise<VerifyPersonPhotoWithDocumentPhotoResponseInterface>;

  checkAsm(params: CheckAsmParamsInterface): Promise<CheckAsmResponseInterface>;

  findOutCustomer(
    params: FindOutCustomerParamsInterface
  ): Promise<FindOutCustomerResponseInterface>;

  getSupportedIdTypes(): Promise<{}>;

  getApiVersion(): Promise<GetApiVersionResponseInterface>;
}
