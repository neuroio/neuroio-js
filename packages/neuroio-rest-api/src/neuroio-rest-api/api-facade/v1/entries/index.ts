import {
  id,
  Sex,
  Liveness,
  Result,
  Mood,
  Paginatable,
  Searchable,
} from "../../../../base/types";
import { SpaceInterface } from "../spaces";

export interface EntriesFiltersInterface extends Paginatable, Searchable {
  pid?: string;

  sources_ids?: Array<id>;
  spaces_ids?: Array<id>;

  result?: Array<Result>;
  liveness?: Array<Liveness>;
  sex?: Array<Sex>;
  mood?: Array<Mood>;
  age_from?: number;
  age_to?: number;

  id_from?: number;
  entry_id_from?: number;

  date_to?: string;
  date_from?: string;
}

export interface EntryInterface {
  id: id;
  created: string;
  face_image: string;
  full_image: string;
  source: {
    id: id;
    name: string;
  };
  space: SpaceInterface;
  facesize: number;
  age: number;
  sex: Sex;
  mood: Mood;
  liveness: Liveness;
  pid: string;
  result: string;
  confidence: number;
  pid_created: string;
  initial_face_image: string;
  initial_full_image: string;
  exposure: number;
  pan: number;
  tilt: number;
}

export interface EntriesStatsInterface {
  pid: string;
  pid_created: string;
  pid_source: {
    id: id;
    name: string;
  };
  age: number;
  sex: Sex;
  initial_face_image: string;
  initial_full_image: string;
  initial_facesize: number;
  initial_liveness: string;
  total: number;
  exact: number;
  ha: number;
  junk: number;
  reinit: number;
  liveness: {
    passed: number;
    failed: number;
    undetermined: number;
  };
}

export interface EntriesInterface {
  getEntries(filters: EntriesFiltersInterface): Promise<Array<EntryInterface>>;
  getEntriesStatsByPersonId(pid: string): Promise<EntriesStatsInterface>;
  deleteEntry(entryId: id): Promise<{}>;
}
