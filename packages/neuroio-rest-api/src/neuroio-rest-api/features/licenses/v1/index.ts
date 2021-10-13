import { AuthApi, AuthApiSettingsInterface } from "../../../../base/auth-api";
import {
  LicensesInterface,
  LicenseInterface,
  LicensesFiltersInterface,
} from "../../../api-facade/v1/licenses";
import { id } from "../../../../base/types";

class Licenses extends AuthApi implements LicensesInterface {
  constructor(settings: AuthApiSettingsInterface) {
    super(settings);
    this.getLicenses = this.getLicenses.bind(this);
    this.getLicense = this.getLicense.bind(this);
    this.createLicense = this.createLicense.bind(this);
    this.updateLicense = this.updateLicense.bind(this);
    this.deleteLicense = this.deleteLicense.bind(this);
  }

  static apiEndpoint = "licenses/sources/";

  getLicenses(
    filters: LicensesFiltersInterface = {}
  ): Promise<LicenseInterface[]> {
    const getFiltersData = ({
      q,
      limit,
      offset,
      date_from,
      date_to,
      is_bound,
    }: LicensesFiltersInterface = {}): Record<string, unknown> => ({
      q,
      limit,
      offset,
      date_from,
      date_to,
      is_bound,
    });

    return this.httpClient.get(
      this.authURL + Licenses.apiEndpoint,
      getFiltersData(filters)
    );
  }

  getLicense(licenseId: id): Promise<LicenseInterface> {
    return this.httpClient.get(
      this.authURL + `${Licenses.apiEndpoint}${licenseId}/`
    );
  }

  createLicense({
    name,
    entry_storage_days,
  }: LicenseInterface = {}): Promise<LicenseInterface> {
    return this.httpClient.post(this.authURL + Licenses.apiEndpoint, {
      name,
      entry_storage_days,
    });
  }

  updateLicense({
    id,
    name,
    entry_storage_days,
    is_active,
  }: LicenseInterface = {}): Promise<LicenseInterface> {
    return this.httpClient.put(this.authURL + `${Licenses.apiEndpoint}${id}/`, {
      name,
      entry_storage_days,
      is_active,
    });
  }

  deleteLicense(licenseId: id): Promise<null> {
    return this.httpClient.delete(
      this.authURL + `${Licenses.apiEndpoint}${licenseId}/`
    );
  }
}

export { Licenses };
