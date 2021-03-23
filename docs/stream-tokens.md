# Stream tokens API reference

## Create stream auth token

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const token = NeuroioRestApi.streamTokens.createStreamToken({
  permanent: true,
});

token.then((token) => {
  console.log({ token });
});
```

## Get stream auth token

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const tokenId = 1;

const token = NeuroioRestApi.streamTokens.getStreamToken(tokenId);

token.then((token) => {
  console.log({ token });
});
```


## Activate/Deactivate token

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const tokenId = 1;

const token = NeuroioRestApi.streamTokens.updateStreamToken({
  id: tokenId,
  is_active: false,
});

token.then((token) => {
  console.log({ token });
});
```

## Delete user token

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const tokenId = 1;

const token = NeuroioRestApi.streamTokens.deleteStreamTokens(tokenId);

token.then(() => {
  console.log("Token was deleted!");
});
```

## Delete user tokens

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const tokens = NeuroioRestApi.streamTokens.deleteStreamTokens({ permanent: true });

tokens.then(() => {
  console.log("All permanent tokens were deleted!");
});
```
