import { Paginatable, Searchable, id } from "../../../../base/types";
import { AuthApiInterface } from "../../../../base/auth-api";

export interface LicenseInterface {
  // General
  id?: id;

  // read only
  unavailable_at?: string;
  created?: string;

  name?: string;
  entry_storage_days?: number;
  is_active?: boolean;
}

export interface LicensesFiltersInterface extends Paginatable, Searchable {
  date_from?: string;
  date_to?: string;
  is_bound?: boolean;
}

export interface LicensesInterface extends AuthApiInterface {
  getLicenses(filters: LicensesFiltersInterface): Promise<LicenseInterface[]>;
  getLicense(licenseId: id): Promise<LicenseInterface>;
  createLicense(license: LicenseInterface): Promise<LicenseInterface>;
  deleteLicense(licenseId: id): Promise<null>;
}
