# Authorization API reference

## Neuroio API references

[Neuroio API](https://kb.neuroio.com/#/authorization)

## Login

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const username = "Jane Doe";
const password = "04.09.2001";

const userWithToken = NeuroioRestApi.auth.login(username, password);

notification.then(userWithToken => {
  console.log({ userWithToken });
});
```

## Logout

!> Note that you got token Id with login response.

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const tokenId = 12;

const logout = NeuroioRestApi.auth.logout(tokenId);

logout.then(() => {
  console.log("Logout successful!");
});
```
