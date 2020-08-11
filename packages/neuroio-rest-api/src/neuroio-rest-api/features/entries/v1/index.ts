import { Api, ApiSettingsInterface } from "../../../../base/api";
import { id } from "../../../../base/types";

import {
  EntriesFiltersInterface,
  EntriesInterface,
  EntryInterface,
  EntriesStatsInterface,
} from "../../../api-facade/v1/entries";

class Entries extends Api implements EntriesInterface {
  constructor(settings: ApiSettingsInterface) {
    super(settings);
    this.getEntries = this.getEntries.bind(this);
    this.getEntriesStatsByPersonId = this.getEntriesStatsByPersonId.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  static apiEndpoint = "entries/";

  getEntries(
    filters: EntriesFiltersInterface = {}
  ): Promise<Array<EntryInterface>> {
    const getFiltersData = ({
      pid,
      sources_ids,
      spaces_ids,
      result,
      liveness,
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
      sources_ids,
      spaces_ids,
      result,
      liveness,
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

  getEntriesStatsByPersonId(pid: string): Promise<EntriesStatsInterface> {
    return this.httpClient.get(`${Entries.apiEndpoint}stats/pid/${pid}/`);
  }

  deleteEntry(entryId: id): Promise<{}> {
    return this.httpClient.delete(`${Entries.apiEndpoint}${entryId}/`);
  }
}

export { Entries };
