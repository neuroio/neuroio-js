import { Api } from "../../../../base/api";

import { addFileToFormData, addDataToFormData } from "../../../../utils";
import {
  SearchPersonByImageParamsInterface,
  PersonsInterface,
  CreatePersonParamsInterface,
  ReinitializePersonByEntryParamsInterface,
  ReinitializePersonByImageParamsInterface,
  CreatePersonFromEntryParamsInterface,
  PersonResponseIterface,
} from "../../../api-facade/v1/persons";

class Persons extends Api implements PersonsInterface {
  static apiEndpoint = "persons/";

  searchPersonByImage({
    image,
    identify_asm,
  }: SearchPersonByImageParamsInterface): Promise<PersonResponseIterface> {
    if (!image) return Promise.reject("No image provided");

    const fieldsData = { identify_asm };
    const data = new FormData();

    addFileToFormData(data, image, "image");
    addDataToFormData(data, fieldsData);

    return this.httpClient.post(`${Persons.apiEndpoint}search/`, data);
  }

  createPerson({
    image,
    source,
    facesize,
    create_on_ha,
    create_on_junk,
    identify_asm,
  }: CreatePersonParamsInterface): Promise<PersonResponseIterface> {
    const fieldsData = {
      source,
      facesize,
      create_on_ha,
      create_on_junk,
      identify_asm,
    };
    const data = new FormData();

    addFileToFormData(data, image, "image");
    addDataToFormData(data, fieldsData);

    return this.httpClient.post(Persons.apiEndpoint, data);
  }

  createPersonFromEntry({
    entryId,
    create_on_ha,
    create_on_junk,
  }: CreatePersonFromEntryParamsInterface): Promise<{}> {
    return this.httpClient.post(`${Persons.apiEndpoint}entry/`, {
      id: entryId,
      create_on_ha,
      create_on_junk,
    });
  }

  deletePerson(pid: string): Promise<{}> {
    return this.httpClient.delete(`${Persons.apiEndpoint}${pid}/`);
  }

  reinitializePersonByEntry({
    entryId,
  }: ReinitializePersonByEntryParamsInterface): Promise<{}> {
    if (!entryId) return Promise.reject("No entry id provided");

    return this.httpClient.post(`${Persons.apiEndpoint}reinit/`, {
      id: entryId,
    });
  }

  reinitializePersonByImage({
    pid,
    image,
    source,
    facesize,
    result,
  }: ReinitializePersonByImageParamsInterface): Promise<{}> {
    if (!image) return Promise.reject("No image provided");

    const fieldsData = { source, facesize, result };
    const data = new FormData();

    addFileToFormData(data, image, "image");
    addDataToFormData(data, fieldsData);

    return this.httpClient.post(`${Persons.apiEndpoint}reinit/${pid}`, data);
  }
}

export { Persons };
