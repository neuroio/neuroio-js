# Neuroio API JS library

![Node.js CI](https://github.com/neuroio/neuroio-js/workflows/Node.js%20CI/badge.svg)

## Installation

### NPM

```bash
npm i --save @neuroio/api
```

### Yarn

```bash
yarn add @neuroio/api
```

## Usage

```js
// ES2015 module import:
import { createNeuroioRestApi, createNeuroioWsApi } from "@neuroio/api";

// CommonJS module require:
const { createNeuroioRestApi, createNeuroioWsApi } = require("@neuroio/api");

// REST
const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: "YOUR_NEUROIO_TOKEN",
});

// WebSocket
const NeuroioWsApi = createNeuroioWsApi({
  version: 1,
  token: "YOUR_NEUROIO_TOKEN",
});

NeuroioWsApi.connect();
```
