import "isomorphic-form-data";

import axios from "axios";
import { createHttpClient } from "../http-client";

import { ApiFacadeV1, ApiFacadeV1Interface } from "./api-facade/v1";
import { Auth as AuthV1 } from "./features/auth/v1";
import { Entries as EntriesV1 } from "./features/entries/v1";
import { Notifications as NotificationsV1 } from "./features/notifications/v1";
import { Persons as PersonsV1 } from "./features/persons/v1";
import { Sources as SourcesV1 } from "./features/sources/v1";
import { Tokens as TokensV1 } from "./features/tokens/v1";
import { Utilities as UtilitiesV1 } from "./features/utilities/v1";
import { PersonsGroups as PersonsGroupsV1 } from "./features/persons-groups/v1";
import { Thresholds as ThresholdsV1 } from "./features/thresholds/v1";

import { apiEndpoints, apiVersions } from "../constants";

interface NeuroioRestApiSettingsInterface {
  token?: string;
  version?: number;
}

function createNeuroioRestApiV1({
  token,
}: {
  token?: string;
} = {}): ApiFacadeV1Interface {
  const HttpClient = createHttpClient({ client: axios });
  const httpClient = new HttpClient({
    baseURL: apiEndpoints.v1.base,
    token,
  });

  return new ApiFacadeV1({
    httpClient,
    auth: new AuthV1({ httpClient, authURL: apiEndpoints.v1.auth }),
    tokens: new TokensV1({ httpClient, authURL: apiEndpoints.v1.auth }),
    notifications: new NotificationsV1({ httpClient }),
    entries: new EntriesV1({ httpClient }),
    persons: new PersonsV1({ httpClient }),
    sources: new SourcesV1({ httpClient }),
    utilities: new UtilitiesV1({ httpClient }),
    personsGroups: new PersonsGroupsV1({ httpClient }),
    thresholds: new ThresholdsV1({ httpClient }),
  });
}

function createNeuroioRestApi(
  settings: NeuroioRestApiSettingsInterface = {}
): ApiFacadeV1Interface | undefined {
  const { version, token } = settings;

  if (!version) {
    throw new Error(
      `You did not specify Neuroio API version.
      Available versions: ${apiVersions.join(", ")}`
    );
  }

  const numVersion = Number(version);

  if (!apiVersions.includes(numVersion)) {
    throw new Error(
      `You have specified a non-existent version of Neuroio API: ${version}.
      Available versions: ${apiVersions.join(", ")}`
    );
  }

  switch (numVersion) {
    case 1:
      return createNeuroioRestApiV1({ token });
  }
}

export { createNeuroioRestApi };
