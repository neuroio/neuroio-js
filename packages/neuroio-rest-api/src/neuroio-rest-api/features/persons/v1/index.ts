import { Api, ApiSettingsInterface } from "../../../../base/api";

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
  constructor(settings: ApiSettingsInterface) {
    super(settings);
    this.searchPersonByImage = this.searchPersonByImage.bind(this);
    this.createPerson = this.createPerson.bind(this);
    this.createPersonFromEntry = this.createPersonFromEntry.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.reinitializePersonByEntry = this.reinitializePersonByEntry.bind(this);
    this.reinitializePersonByImage = this.reinitializePersonByImage.bind(this);
  }

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
  }: CreatePersonFromEntryParamsInterface): Promise<null> {
    return this.httpClient.post(`${Persons.apiEndpoint}entry/`, {
      id: entryId,
      create_on_ha,
      create_on_junk,
    });
  }

  deletePerson(pid: string): Promise<null> {
    return this.httpClient.delete(`${Persons.apiEndpoint}${pid}/`);
  }

  reinitializePersonByEntry({
    entryId,
  }: ReinitializePersonByEntryParamsInterface): Promise<null> {
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
  }: ReinitializePersonByImageParamsInterface): Promise<null> {
    if (!image) return Promise.reject("No image provided");

    const fieldsData = { source, facesize, result };
    const data = new FormData();

    addFileToFormData(data, image, "image");
    addDataToFormData(data, fieldsData);

    return this.httpClient.post(`${Persons.apiEndpoint}reinit/${pid}`, data);
  }
}

export { Persons };
