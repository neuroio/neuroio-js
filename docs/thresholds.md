# Thresholds API reference

## Get thresholds settings

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const thresholds = NeuroioRestApi.thresholds.getThresholds();

thresholds.then(thresholds => {
  console.log({ thresholds });
});
```

## Update thresholds settings

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

NeuroioRestApi.thresholds.updateThresholds({
  exact: 0.23,
  ha: 0.41,
  junk: 1,
});
```

## Reset thresholds settings to default

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const defaultThresholds = NeuroioRestApi.thresholds.resetThresholds();

defaultThresholds.then(thresholds => {
  console.log({ thresholds });
});
```
