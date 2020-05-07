import { NeuroioWsApiV1, NeuroioWsApiV1Interface } from "./v1";
import { apiVersions, apiEndpoints } from "./constants";
import WebSocket from "isomorphic-ws";

interface NeuroioWsApiSettingsInterface {
  token?: string;
  version?: number | string;
  endpoint?: string;
}

function createNeuroioWsApi(
  settings: NeuroioWsApiSettingsInterface = {}
): NeuroioWsApiV1Interface | undefined {
  const { token, version, endpoint } = settings;

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
      return new NeuroioWsApiV1({
        SocketClient: WebSocket,
        token,
        endpoint,
        apiEndpoints,
      });
  }
}

export { createNeuroioWsApi };
