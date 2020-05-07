# Notifications API reference

## Neuroio API references

[Neuroio API](https://kb.neuroio.com/#/notifications)

!> Note that parameters documentation available on the links to Neuroio API references below.

## Get list of notifications

[Neuroio API](https://kb.neuroio.com/#/notifications?id=request-of-list-of-notification-profiles)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const notifications = NeuroioRestApi.notifications.getNotifications();

notifications.then(notifications => {
  console.log({ notifications });
});
```

## Get notification

[Neuroio API](https://kb.neuroio.com/#/notifications?id=request-of-the-notification-profile-settings)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const notificationId = 1;

const notification = NeuroioRestApi.notifications.getNotification(
  notificationId
);

notification.then(notification => {
  console.log({ notification });
});
```

## Create notification

[Neuroio API](https://kb.neuroio.com/#/notifications?id=creating-notification-profile)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const notification = NeuroioRestApi.notifications.createNotification({
  name: "My new awesome notification",
  is_active: 7000,
  http_method: 0,
  destination_url: "https://destination-url.com/",
  results: ["new", "ha", "junk"],
  age_from: 0,
  age_to: 20,
  sex: [1],
  moods: ["fear"],
  sources: ["webcam"],
});

notification.then(notification => {
  console.log({ notification });
});
```

## Update notification settings

[Neuroio API](https://kb.neuroio.com/#/notifications?id=changing-of-the-notification-profile-settings)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const notificationId = 1;

const notification = NeuroioRestApi.notifications.updateNotification({
  id: notificationId,
  is_active: false,
});

notification.then(notification => {
  console.log({ notification });
});
```

## Delete notification

[Neuroio API](https://kb.neuroio.com/#/notifications?id=deleting-of-notification-profile)

```js
import { createNeuroioRestApi } from "@neuroio/api";

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

const notificationId = 1;

const notification = NeuroioRestApi.notifications.deleteNotification(
  notificationId
);

notification.then(() => {
  console.log("Notification was deleted!");
});
```
