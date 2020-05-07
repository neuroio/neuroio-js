# WebSocket API reference

## Neuroio API references

[Neuroio API](https://kb.neuroio.com/#/notifications?id=establishing-a-connection-to-websocket-server)

!> Note that parameters documentation available on the links to Neuroio API references below.

## Install

## Establishing a connection

```js
import { createNeuroioWsApi } from "@neuroio/api";

const NeuroioWsApi = createNeuroioWsApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

NeuroioWsApi.on("connect", () => {
  console.log("🤝 connected!");
});

NeuroioWsApi.connect();
```

## Receiving messages

[Neuroio API](https://kb.neuroio.com/#/notifications?id=for-websocket-connections)

```js
import { createNeuroioWsApi } from "@neuroio/api";

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
```

!> if you want to update token or api endpoint you should connect to socket again all previos listeners will remain
