import { Api } from "../../../../base/api";
import { id } from "../../../../base/types";

import {
  EntriesFiltersInterface,
  EntriesInterface,
} from "../../../api-facade/v1/entries";

class Entries extends Api implements EntriesInterface {
  static apiEndpoint = "entries/";

  getEntries(filters: EntriesFiltersInterface = {}): Promise<{}> {
    const getFiltersData = ({
      pid,
      result,
      liveness,
      source,
      id_from,
      date_from,
      date_to,
      limit,
      offset,
      sex,
      mood,
      age_from,
      age_to,
    }: EntriesFiltersInterface): {} => ({
      pid,
      result,
      liveness,
      source,
      id_from,
      date_from,
      date_to,
      limit,
      offset,
      sex,
      mood,
      age_from,
      age_to,
    });

    return this.httpClient.get(Entries.apiEndpoint, getFiltersData(filters));
  }

  getEntriesStatsByPersonId(pid: string): Promise<{}> {
    return this.httpClient.get(`${Entries.apiEndpoint}stats/pid/${pid}/`);
  }

  deleteEntry(entryId: id): Promise<{}> {
    return this.httpClient.delete(`${Entries.apiEndpoint}${entryId}/`);
  }
}

export { Entries };
