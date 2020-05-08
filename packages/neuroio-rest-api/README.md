# Neuroio REST API Client TS/JS library

## Installation

### NPM

```bash
npm i --save @neuroio/rest-api
```

### Yarn

```bash
yarn add @neuroio/rest-api
```

## Usage

```js
// ES2015 module import:
import { createNeuroioRestApi } from "@neuroio/rest-api";

// CommonJS module require:
const { createNeuroioRestApi } = require("@neuroio/rest-api");

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});
```
