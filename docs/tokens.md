# User tokens API reference

## Neuroio API references

[Neuroio API](https://kb.neuroio.com/#/authorization)

!> Note that parameters documentation available on the links to Neuroio API references below.

## Create token

[Neuroio API](https://kb.neuroio.com/#/authorization?id=token-generation)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const token = NeuroioRestApi.tokens.createToken({
  permanent: true,
});

token.then((token) => {
  console.log({ token });
});
```

## Activate/Deactivate token

[Neuroio API](https://kb.neuroio.com/#/authorization?id=token-deactivationactivation)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const tokenId = 1;

const token = NeuroioRestApi.tokens.updateToken({
  id: tokenId,
  is_active: false,
});

token.then((token) => {
  console.log({ token });
});
```

## Delete user token

[Neuroio API](https://kb.neuroio.com/#/authorization?id=deleting-a-token)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const tokenId = 1;

const token = NeuroioRestApi.tokens.deleteToken(tokenId);

token.then(() => {
  console.log("Token was deleted!");
});
```

## Delete user tokens

[Neuroio API](https://kb.neuroio.com/#/authorization?id=deleting-all-users-tokens)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const tokens = NeuroioRestApi.tokens.deleteToken({ permanent: true });

tokens.then(() => {
  console.log("All permanent tokens were deleted!");
});
```
