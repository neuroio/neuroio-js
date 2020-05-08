import WebSocket from "isomorphic-ws";

import { createNeuroioWsApi } from "../../src";
import { NeuroioWsApiV1 } from "../../src/v1";
import { apiVersions } from "../../src/constants";

describe("createNeuroioWsApi test", () => {
  const mockedToken = "token";
  const existedVersions = [1];
  const nonExistedVersion = 999;

  test("should throw a non setted version error", () => {
    const call = () => {
      createNeuroioWsApi({ token: mockedToken });
    };

    expect(call).toThrow(
      new Error(`You did not specify Neuroio API version.
      Available versions: ${apiVersions.join(", ")}`)
    );
  });

  test("should throw a non existed version error", () => {
    const call = () => {
      createNeuroioWsApi({ token: mockedToken, version: nonExistedVersion });
    };

    expect(call).toThrow(
      new Error(
        `You have specified a non-existent version of Neuroio API: ${nonExistedVersion}.
      Available versions: ${apiVersions.join(", ")}`
      )
    );
  });

  test("should create an NeuroioWsApiV1 with correct parameters", () => {
    const NeuroioWsApi = createNeuroioWsApi({
      token: mockedToken,
      version: existedVersions[0],
    });

    expect(NeuroioWsApi).toBeInstanceOf(NeuroioWsApiV1);

    expect(NeuroioWsApi.token).toBe(mockedToken);
    expect(NeuroioWsApi.SocketClient).toBe(WebSocket);
  });
});
