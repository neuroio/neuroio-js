# Sources API reference

## Neuroio API references

[Neuroio API](https://kb.neuroio.com/#/sources)

!> Note that parameters documentation available on the links to Neuroio API references below.

## Get list of sources

[Neuroio API](https://kb.neuroio.com/#/sources?id=list-of-sources-request)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const sources = NeuroioRestApi.sources.getSources();

sources.then((sources) => {
  console.log({ sources });
});
```

## Get source

[Neuroio API](https://kb.neuroio.com/#/sources?id=source-settings-request)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const sourceId = 1;

const source = NeuroioRestApi.sources.getSource(sourceId);

source.then((source) => {
  console.log({ source });
});
```

## Create source

[Neuroio API](https://kb.neuroio.com/#/sources?id=source-creation)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const source = NeuroioRestApi.sources.createSource({
  name: "My new awesome source",
  identify_facesize_threshold: 7000,
  use_pps_timestamp: 1000,
});

source.then((source) => {
  console.log({ source });
});
```

## Delete source

[Neuroio API](https://kb.neuroio.com/#/sources?id=deleting-a-source)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const sourceId = 1;

const source = NeuroioRestApi.sources.deleteSource(sourceId);

source.then(() => {
  console.log("Source was deleted!");
});
```

## Update source settings

[Neuroio API](https://kb.neuroio.com/#/sources?id=source-settings-change)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const sourceId = 1;

const source = NeuroioRestApi.sources.updateSource({
  id: sourceId,
  identify_facesize_threshold: 7200,
});

source.then((source) => {
  console.log({ source });
});
```
