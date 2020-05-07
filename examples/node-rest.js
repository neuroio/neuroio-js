require("dotenv").config();

const { createNeuroioRestApi } = require("@neuroio/rest-api");

const { NEUROIO_TOKEN } = process.env;

const NeuroioRestApi = createNeuroioRestApi({
  version: 1,
  token: NEUROIO_TOKEN,
});

NeuroioRestApi.notifications.getNotifications().then(notifications => {
  console.log(notifications);
});
