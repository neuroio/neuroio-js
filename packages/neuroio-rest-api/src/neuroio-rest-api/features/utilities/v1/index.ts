import { Api } from "../../../../base/api";

import { addFileToFormData, addDataToFormData } from "../../../../utils";
import {
  UtilitiesInterface,
  ComparePhotosParamsInterface,
  ComparePhotosResponseInterface,
  ComparePersonPhotoWithDocumentPhotoParamsInterface,
  VerifyPersonPhotoWithDocumentPhotoParamsInterface,
  VerifyPersonPhotoWithDocumentPhotoResponseInterface,
  FindOutCustomerParamsInterface,
  FindOutCustomerResponseInterface,
  GetApiVersionResponseInterface,
  CheckAsmParamsInterface,
  CheckAsmResponseInterface,
} from "../../../api-facade/v1/utilities";

class Utilities extends Api implements UtilitiesInterface {
  comparePhotos({
    image1,
    image2,
    result,
  }: ComparePhotosParamsInterface): Promise<ComparePhotosResponseInterface> {
    const fieldsData = { result };
    const data = new FormData();

    addFileToFormData(data, image1, "image1");
    addFileToFormData(data, image2, "image2");
    addDataToFormData(data, fieldsData);

    return this.httpClient.post("utility/compare/", data);
  }

  comparePersonPhotoWithDocumentPhoto({
    photo,
    facesize,
    result,
  }: ComparePersonPhotoWithDocumentPhotoParamsInterface): Promise<
    ComparePhotosResponseInterface
  > {
    const fieldsData = { facesize, result };
    const data = new FormData();

    addFileToFormData(data, photo, "photo");
    addDataToFormData(data, fieldsData);

    return this.httpClient.post("faceid/compare/", data);
  }

  verifyPersonPhotoWithDocumentPhoto({
    photo_face,
    photo_face_facesize,
    photo_id,
    photo_id_facesize,
    id_code,
    result,
  }: VerifyPersonPhotoWithDocumentPhotoParamsInterface): Promise<
    VerifyPersonPhotoWithDocumentPhotoResponseInterface
  > {
    const fieldsData = {
      photo_face_facesize,
      photo_id_facesize,
      id_code,
      result,
    };
    const data = new FormData();

    addFileToFormData(data, photo_face, "photo_face");
    addFileToFormData(data, photo_id, "photo_id");
    addDataToFormData(data, fieldsData);

    return this.httpClient.post("faceid/verification/", data);
  }

  findOutCustomer({
    source,
    offset,
  }: FindOutCustomerParamsInterface): Promise<
    FindOutCustomerResponseInterface
  > {
    return this.httpClient.get("utility/customer/", { source, offset });
  }

  checkAsm({
    image,
  }: CheckAsmParamsInterface): Promise<CheckAsmResponseInterface> {
    return this.httpClient.post("utility/compare/", { image });
  }

  getSupportedIdTypes(): Promise<{}> {
    return this.httpClient.get("faceid/id-codes/");
  }

  getApiVersion(): Promise<GetApiVersionResponseInterface> {
    return this.httpClient.get("version/");
  }
}

export { Utilities };
