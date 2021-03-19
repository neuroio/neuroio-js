import { Api, ApiSettingsInterface } from "../../../../base/api";

import {
  PersonsGroupsInterface,
  GetPersonsGroupsFiltersInterface,
  PersonsGroupInterface,
  GetPersonsGroupPersonsFiltersInterface,
  AddPersonsToPersonsGroupsParamsInterface,
  RemovePersonsFromPersonsGroupsParamsInterface,
} from "../../../api-facade/v1/persons-groups";
import { id } from "../../../../base/types";

class PersonsGroups extends Api implements PersonsGroupsInterface {
  constructor(settings: ApiSettingsInterface) {
    super(settings);
    this.getPersonsGroups = this.getPersonsGroups.bind(this);
    this.getPersonsGroup = this.getPersonsGroup.bind(this);
    this.createPersonsGroup = this.createPersonsGroup.bind(this);
    this.updatePersonsGroup = this.updatePersonsGroup.bind(this);
    this.deletePersonsGroup = this.deletePersonsGroup.bind(this);
    this.getPersonsGroupPersons = this.getPersonsGroupPersons.bind(this);
    this.addPersonsToPersonsGroups = this.addPersonsToPersonsGroups.bind(this);
    this.removePersonsFromPersonsGroups = this.removePersonsFromPersonsGroups.bind(
      this
    );
  }

  static apiEndpoint = "groups/persons/";

  static getPersonsGroupData = ({ name }: PersonsGroupInterface = {}): {} => ({
    name,
  });

  getPersonsGroups(filters: GetPersonsGroupsFiltersInterface): Promise<null> {
    const getFiltersData = ({
      q,
      limit,
      offset,
      groups_ids,
      spaces_ids,
      pids_include,
      pids_exclude,
    }: GetPersonsGroupsFiltersInterface = {}): {} => ({
      q,
      limit,
      offset,
      groups_ids,
      spaces_ids,
      pids_include,
      pids_exclude,
    });

    return this.httpClient.get(
      PersonsGroups.apiEndpoint,
      getFiltersData(filters)
    );
  }

  getPersonsGroup(personGroupId: id): Promise<PersonsGroupInterface> {
    return this.httpClient.get(`${PersonsGroups.apiEndpoint}${personGroupId}/`);
  }

  createPersonsGroup(
    personsGroup: PersonsGroupInterface
  ): Promise<PersonsGroupInterface> {
    return this.httpClient.post(
      PersonsGroups.apiEndpoint,
      PersonsGroups.getPersonsGroupData(personsGroup)
    );
  }

  updatePersonsGroup({ id, ...restData }: PersonsGroupInterface = {}): Promise<
    PersonsGroupInterface
  > {
    return this.httpClient.put(
      `${PersonsGroups.apiEndpoint}${id}/`,
      PersonsGroups.getPersonsGroupData(restData)
    );
  }

  deletePersonsGroup(personGroupId: id): Promise<null> {
    return this.httpClient.delete(
      `${PersonsGroups.apiEndpoint}${personGroupId}/`
    );
  }

  getPersonsGroupPersons({
    groupId,
    ...filters
  }: GetPersonsGroupPersonsFiltersInterface = {}): Promise<null> {
    const getFiltersData = ({
      limit,
      offset,
      pids,
    }: GetPersonsGroupPersonsFiltersInterface = {}): {} => ({
      limit,
      offset,
      pids,
    });

    return this.httpClient.get(
      `${PersonsGroups.apiEndpoint}${groupId}/pids/`,
      getFiltersData(filters)
    );
  }

  addPersonsToPersonsGroups({
    groupsIds,
    persons,
  }: AddPersonsToPersonsGroupsParamsInterface = {}): Promise<null> {
    return this.httpClient.post(`${PersonsGroups.apiEndpoint}pids/`, {
      groups_ids: groupsIds,
      pids: persons,
    });
  }

  removePersonsFromPersonsGroups({
    groupsIds,
    persons,
  }: RemovePersonsFromPersonsGroupsParamsInterface = {}): Promise<null> {
    return this.httpClient.delete(`${PersonsGroups.apiEndpoint}pids/`, null, {
      groups_ids: groupsIds,
      pids: persons,
    });
  }
}

export { PersonsGroups };
