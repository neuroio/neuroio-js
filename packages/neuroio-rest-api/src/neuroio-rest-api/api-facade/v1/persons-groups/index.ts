import { Paginatable, Searchable, id } from "../../../../base/types";

export interface GetPersonsGroupsFiltersInterface
  extends Paginatable,
    Searchable {
  groups_ids?: Array<id>;
  spaces_ids?: Array<id>;
  pids_include?: Array<string>;
  pids_exclude?: Array<string>;
}

export interface PersonsGroupInterface {
  id?: id;
  // read only
  space_id?: id;
  name?: string;
  persons_count?: number;
}

export interface GetPersonsGroupPersonsFiltersInterface extends Paginatable {
  groupId?: id;
  pids?: Array<string>;
}

export interface AddPersonsToPersonsGroupsParamsInterface {
  groupsIds?: Array<id>;
  persons?: Array<string>;
}

export interface RemovePersonsFromPersonsGroupsParamsInterface {
  groupsIds?: Array<id>;
  persons?: Array<string>;
}

export interface PersonsGroupsInterface {
  getPersonsGroups(params: GetPersonsGroupsFiltersInterface): Promise<null>;
  getPersonsGroup(personsGroupId: id): Promise<PersonsGroupInterface>;
  createPersonsGroup(
    personsGroup: PersonsGroupInterface
  ): Promise<PersonsGroupInterface>;
  updatePersonsGroup(
    personsGroup: PersonsGroupInterface
  ): Promise<PersonsGroupInterface>;
  deletePersonsGroup(personsGroupId: id): Promise<null>;
  getPersonsGroupPersons(
    filters: GetPersonsGroupPersonsFiltersInterface
  ): Promise<null>;
  addPersonsToPersonsGroups(
    params: AddPersonsToPersonsGroupsParamsInterface
  ): Promise<null>;
  removePersonsFromPersonsGroups(
    params: RemovePersonsFromPersonsGroupsParamsInterface
  ): Promise<null>;
}
