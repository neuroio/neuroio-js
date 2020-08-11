import { Api, ApiSettingsInterface } from "../../../../base/api";
import {
  ThresholdsClassInterface,
  ThresholdsInterface,
} from "../../../api-facade/v1/thresholds";

class Thresholds extends Api implements ThresholdsClassInterface {
  constructor(settings: ApiSettingsInterface) {
    super(settings);
    this.getThresholds = this.getThresholds.bind(this);
    this.updateThresholds = this.updateThresholds.bind(this);
    this.resetThresholds = this.resetThresholds.bind(this);
  }

  static apiEndpoint = "settings/thresholds/";

  getThresholds(): Promise<ThresholdsInterface> {
    return this.httpClient.get(Thresholds.apiEndpoint);
  }

  updateThresholds({ exact, ha, junk }: ThresholdsInterface = {}): Promise<
    ThresholdsInterface
  > {
    return this.httpClient.put(Thresholds.apiEndpoint, { exact, ha, junk });
  }

  resetThresholds(): Promise<ThresholdsInterface> {
    return this.httpClient.post(`${Thresholds.apiEndpoint}reset/`);
  }
}

export { Thresholds };
