# Persons API reference

## Neuroio API references

[Neuroio API](https://kb.neuroio.com/#/persons)

!> Note that parameters documentation available on the links to Neuroio API references below.

## Create person

[Neuroio API](https://kb.neuroio.com/#/persons?id=person-creation-with-an-image)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const person = NeuroioRestApi.persons.createPerson({
  image: "dataURIPhoto",
  source: "webcam",
  facesize: 10,
  create_on_ha: true,
  create_on_junk: false,
  identify_asm: true,
});

person.then((person) => {
  console.log({ person });
});
```

## Create person from entry

[Neuroio API](https://kb.neuroio.com/#/persons?id=creating-a-persona-from-a-nm-junk-ha-entry)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const person = NeuroioRestApi.persons.createPersonFromEntry({
  entryId: 1,
  create_on_ha: true,
  create_on_junk: false,
});

person.then((person) => {
  console.log({ person });
});
```

## Delete person

[Neuroio API](https://kb.neuroio.com/#/persons?id=person-removal-from-the-database)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const pid = 1;

const person = NeuroioRestApi.persons.deletePerson(pid);

person.then(() => {
  console.log("Person was deleted!");
});
```

## Search person by image

[Neuroio API](https://kb.neuroio.com/#/persons?id=person-search-by-image)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const person = NeuroioRestApi.persons.searchPersonByImage({
  image: "dataURIPhoto",
  identify_asm: true,
});

person.then((person) => {
  console.log({ person });
});
```

## Reinitialize person by entry

[Neuroio API](https://kb.neuroio.com/#/persons?id=re-initialization-from-a-entry)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const entryId = 1;

const person = NeuroioRestApi.persons.reinitializePersonByEntry({
  entryId,
});

person.then((person) => {
  console.log({ person });
});
```

## Reinitialize person by image

[Neuroio API](https://kb.neuroio.com/#/persons?id=re-initialization-by-image)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const pid = 1;

const person = NeuroioRestApi.persons.reinitializePersonByImage({
  pid,
  image: "dataURIPhoto",
  source: "webcam",
  facesize: 100,
  result: "ha",
});

person.then((person) => {
  console.log({ person });
});
```
