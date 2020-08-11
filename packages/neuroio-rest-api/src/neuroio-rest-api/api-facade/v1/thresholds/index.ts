import { id } from "../../../../base/types";

export interface ThresholdsInterface {
  // read only
  space_id?: id;
  exact?: number;
  ha?: number;
  junk?: number;
}

export interface ThresholdsClassInterface {
  getThresholds(): Promise<ThresholdsInterface>;
  updateThresholds(
    Thresholds: ThresholdsInterface
  ): Promise<ThresholdsInterface>;
  resetThresholds(): Promise<ThresholdsInterface>;
}
