# Neuroio WebSocket Client TS/JS library

## Installation

### NPM

```bash
npm i --save @neuroio/websocket
```

### Yarn

```bash
yarn add @neuroio/websocket
```

## Usage

```js
// ES2015 module import:
import { createNeuroioWsApi } from "@neuroio/websocket";

// CommonJS module require:
const { createNeuroioWsApi } = require("@neuroio/websocket");

const NeuroioWsApi = createNeuroioWsApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

NeuroioWsApi.connect();
```
