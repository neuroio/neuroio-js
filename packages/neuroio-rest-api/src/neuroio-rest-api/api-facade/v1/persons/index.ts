import { id, Result, Sex, Mood } from "../../../../base/types";

export interface PersonResponseIterface {
  result: Result;
  pid: string;
  age: number;
  sex: Sex;
  mood: Mood;
}

export interface SearchPersonByImageParamsInterface {
  image: File;
  identify_asm?: boolean;
}

export interface CreatePersonParamsInterface {
  image: File;
  source: string;
  facesize?: number;
  create_on_ha?: boolean;
  create_on_junk?: boolean;
  identify_asm?: boolean;
}

export interface CreatePersonFromEntryParamsInterface {
  entryId: number;
  create_on_ha?: boolean;
  create_on_junk?: boolean;
}

export interface ReinitializePersonByEntryParamsInterface {
  entryId: id;
}

export interface ReinitializePersonByImageParamsInterface {
  pid: string;
  image: File;
  source: string;
  facesize?: number;
  result?: Result;
  identify_asm?: boolean;
}

export interface PersonsInterface {
  searchPersonByImage(
    params: SearchPersonByImageParamsInterface
  ): Promise<PersonResponseIterface>;
  createPerson(
    person: CreatePersonParamsInterface
  ): Promise<PersonResponseIterface>;
  createPersonFromEntry(
    person: CreatePersonFromEntryParamsInterface
  ): Promise<{}>;
  deletePerson(pid: string): Promise<{}>;
  reinitializePersonByEntry(
    params: ReinitializePersonByEntryParamsInterface
  ): Promise<{}>;
  reinitializePersonByImage(
    params: ReinitializePersonByImageParamsInterface
  ): Promise<{}>;
}
