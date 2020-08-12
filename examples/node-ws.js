require("dotenv").config();

const { createNeuroioWsApi } = require("@neuroio/websocket");

const { NEUROIO_TOKEN } = process.env;

const NeuroioWsApi = createNeuroioWsApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

NeuroioWsApi.on("connect", () => {
  console.log("🤝 connected!");
});

NeuroioWsApi.on("message", message => {
  console.log("✉️ message received!", { message });
});

NeuroioWsApi.connect();

/**
 * NOTE: if you want to update token
 * you should connect to socket again
 * all previos listeners will remain
 */
