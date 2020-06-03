import { Api } from "../../../../base/api";

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
  static apiEndpoint = "groups/persons/";

  static getPersonsGroupData = ({ name }: PersonsGroupInterface = {}): {} => ({
    name,
  });

  getPersonsGroups(filters: GetPersonsGroupsFiltersInterface): Promise<{}> {
    const getFiltersData = ({
      q,
      limit,
      offset,
      groups_ids,
      pids_include,
      pids_exclude,
    }: GetPersonsGroupsFiltersInterface = {}): {} => ({
      q,
      limit,
      offset,
      groups_ids,
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

  deletePersonsGroup(personGroupId: id): Promise<{}> {
    return this.httpClient.delete(
      `${PersonsGroups.apiEndpoint}${personGroupId}/`
    );
  }

  getPersonsGroupPersons({
    groupId,
    ...filters
  }: GetPersonsGroupPersonsFiltersInterface = {}): Promise<{}> {
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
  }: AddPersonsToPersonsGroupsParamsInterface = {}): Promise<{}> {
    return this.httpClient.post(`${PersonsGroups.apiEndpoint}pids/`, {
      groups_ids: groupsIds,
      pids: persons,
    });
  }

  removePersonsFromPersonsGroups({
    groupsIds,
    persons,
  }: RemovePersonsFromPersonsGroupsParamsInterface = {}): Promise<{}> {
    return this.httpClient.delete(`${PersonsGroups.apiEndpoint}pids/`, null, {
      groups_ids: groupsIds,
      pids: persons,
    });
  }
}

export { PersonsGroups };
