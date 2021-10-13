# Licenses API reference

## Get list of licenses

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const licenses = NeuroioRestApi.licenses.getLicenses();

licenses.then((licenses) => {
  console.log({ licenses });
});
```

## Get license

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const licenseId = 1;

const license = NeuroioRestApi.licenses.getLicense(licenseId);

license.then((license) => {
  console.log({ license });
});
```

## Create license

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const license = NeuroioRestApi.licenses.createLicense({
  name: "My new awesome license",
  entry_storage_days: 100
});

license.then((license) => {
  console.log({ license });
});
```

## Delete license

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const licenseId = 1;

const license = NeuroioRestApi.licenses.deleteLicense(licenseId);

license.then(() => {
  console.log("License was deleted!");
});
```

## Update license settings

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const licenseId = 1;

const license = NeuroioRestApi.licenses.updateLicense({
  id: licenseId,
  name: "Even better license name",
  is_active: false
});

license.then((license) => {
  console.log({ license });
});
```
