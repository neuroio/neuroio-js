# Entries API reference

## Get list of entries

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const haEntries = NeuroioRestApi.entries.getEntries({ result: "ha" });

haEntries.then((haEntries) => {
  console.log({ haEntries });
});
```

## Get list of entries of a person

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const pid = "123";

const personEntries = NeuroioRestApi.entries.getEntries({ pid });

personEntries.then((personEntries) => {
  console.log({ personEntries });
});
```

## Get entries stats by PID

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const pid = "123";

const entriesStats = NeuroioRestApi.entries.getEntriesStatsByPersonId(pid);

entriesStats.then((entriesStats) => {
  console.log({ entriesStats });
});
```

## Delete entry

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const entryId = 1;

const entry = NeuroioRestApi.entries.deleteEntry(entryId);

entry.then(() => {
  console.log("Entry was deleted!");
});
```
