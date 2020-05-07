const { createNeuroioWsApi } = require("@neuroio/websocket");

const NeuroioWsApi = createNeuroioWsApi({
  version: 1,
  token: "NEUROIO_TOKEN",
});

NeuroioWsApi.connect();

NeuroioWsApi.on("connect", () => {
  console.log("🤝 connected!");
});

NeuroioWsApi.on("message", (message) => {
  console.log("✉️ message received!", { message });
});
