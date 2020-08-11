# Spaces API reference

## Get list of spaces

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const spaces = NeuroioRestApi.spaces.getSpaces();

spaces.then((spaces) => {
  console.log({ spaces });
});
```

## Get space

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const spaceId = 1;

const space = NeuroioRestApi.spaces.getSpace(spaceId);

space.then((space) => {
  console.log({ space });
});
```

## Create space

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const space = NeuroioRestApi.spaces.createSpace({
  name: "My new awesome space",
});

space.then((space) => {
  console.log({ space });
});
```

## Delete space

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const spaceId = 1;

const space = NeuroioRestApi.spaces.deleteSpace(spaceId);

space.then(() => {
  console.log("Space was deleted!");
});
```

## Create space auth token

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const spaceId = 1;

const token = NeuroioRestApi.spaces.createToken(spaceId, { permanent: false });

token.then((token) => {
  console.log({ token });
});
```

## Update space settings

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const spaceId = 1;

const space = NeuroioRestApi.spaces.updateSpace({
  id: spaceId,
  name: "Even better space name",
});

space.then((space) => {
  console.log({ space });
});
```
