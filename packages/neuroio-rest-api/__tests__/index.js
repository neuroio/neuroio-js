import { createNeuroioRestApi } from "../src/neuroio-rest-api";
import { apiVersions } from "../src/constants";

import { ApiFacadeV1 } from "../src/neuroio-rest-api/api-facade/v1";

import { Auth as AuthV1 } from "../src/neuroio-rest-api/features/auth/v1";
import { Tokens as TokensV1 } from "../src/neuroio-rest-api/features/tokens/v1";
import { Entries as EntriesV1 } from "../src/neuroio-rest-api/features/entries/v1";
import { Notifications as NotificationsV1 } from "../src/neuroio-rest-api/features/notifications/v1";
import { Sources as SourcesV1 } from "../src/neuroio-rest-api/features/sources/v1";
import { Utilities as UtilitiesV1 } from "../src/neuroio-rest-api/features/utilities/v1";
import { Persons as PersonsV1 } from "../src/neuroio-rest-api/features/persons/v1";

describe("createNeuroioRestApi test", () => {
  const mockedToken = "token";
  const existedVersions = [1];
  const nonExistedVersion = 999;

  test("should throw a non setted version error", () => {
    const call = () => {
      createNeuroioRestApi({ token: mockedToken });
    };

    expect(call).toThrow(
      new Error(`You did not specify Neuroio API version.
      Available versions: ${apiVersions.join(", ")}`)
    );
  });

  test("should throw a non existed version error", () => {
    const call = () => {
      createNeuroioRestApi({ token: mockedToken, version: nonExistedVersion });
    };

    expect(call).toThrow(
      new Error(
        `You have specified a non-existent version of Neuroio API: ${nonExistedVersion}.
      Available versions: ${apiVersions.join(", ")}`
      )
    );
  });

  test("should create an NeuroioWsApiV1 with correct parameters", () => {
    const NeuroioRestApiInstanse = createNeuroioRestApi({
      token: mockedToken,
      version: existedVersions[0],
    });

    expect(NeuroioRestApiInstanse).toBeInstanceOf(ApiFacadeV1);

    expect(NeuroioRestApiInstanse.auth).toBeInstanceOf(AuthV1);
    expect(NeuroioRestApiInstanse.entries).toBeInstanceOf(EntriesV1);
    expect(NeuroioRestApiInstanse.tokens).toBeInstanceOf(TokensV1);
    expect(NeuroioRestApiInstanse.notifications).toBeInstanceOf(
      NotificationsV1
    );
    expect(NeuroioRestApiInstanse.sources).toBeInstanceOf(SourcesV1);
    expect(NeuroioRestApiInstanse.utilities).toBeInstanceOf(UtilitiesV1);
    expect(NeuroioRestApiInstanse.persons).toBeInstanceOf(PersonsV1);
  });
});
