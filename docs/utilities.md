# Utilities API reference

## Neuroio API references

[Neuroio API](https://kb.neuroio.com/#/utilities)

!> Note that parameters documentation available on the links to Neuroio API references below.

## Compare persons in photos

[Neuroio API](https://kb.neuroio.com/#/utilities?id=comparison)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const comparingResult = NeuroioRestApi.utilities.comparePhotos({
  photo1: "dataURIPhoto",
  photo2: "dataURIPhoto",
  result: "ha",
});

comparingResult.then(comparingResult => {
  console.log({ comparingResult });
});
```

## Compare person photo with person on document

[Neuroio API](https://kb.neuroio.com/#/utilities?id=comparison)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const comparingResult = NeuroioRestApi.utilities.comparePersonPhotoWithDocumentPhoto(
  {
    photo: "dataURIPhoto",
    result: "ha",
    facesize: 2000,
  }
);

comparingResult.then(comparingResult => {
  console.log({ comparingResult });
});
```

## Verify person and document with parsing document fields

[Neuroio API](https://kb.neuroio.com/#/utilities?id=comparison)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const verifyingResult = NeuroioRestApi.utilities.verifyPersonPhotoWithDocumentPhoto(
  {
    photo_face: "dataURIPhoto",
    photo_face_facesize: 2000,
    photo_id: "dataURIPhoto",
    photo_id_facesize: 2000,
    id_code: "ru",
    result: "exact",
  }
);

verifyingResult.then(verifyingResult => {
  console.log({ verifyingResult });
});
```

## Find out customer

[Neuroio API](https://kb.neuroio.com/#/utilities?id=who-is-a-customer)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const customer = NeuroioRestApi.utilities.findOutCustomer({
  source: "webcam",
  offset: 10,
});

comparingResult.then(customer => {
  console.log({ customer });
});
```
