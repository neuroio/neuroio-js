# Users API reference

## Neuroio API references

[Neuroio API](https://kb.neuroio.com/#/authorization)

!> Note that parameters documentation available on the links to Neuroio API references below.

## Get current user

[Neuroio API](https://kb.neuroio.com/#/authorization?id=user-name-and-group)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const user = NeuroioRestApi.users.getUser();

user.then(user => {
  console.log({ user });
});
```

## Change current user password

[Neuroio API](https://kb.neuroio.com/#/authorization?id=password-change)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const result = NeuroioRestApi.users.changePassword({
  old_password: "your_old_pass",
  password: "your_new_pass",
  password2: "your_new_pass",
});

result.then(result => {
  console.log({ result });
});
```
