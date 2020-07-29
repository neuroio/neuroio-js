import path from "path";
import { File } from "file-api";
import { readFile } from "../__helpers__";

import axios from "axios";
import { FormData } from "form-data";

import { createHttpClient } from "../../src/http-client";

import { ApiFacadeV1 } from "../../src/neuroio-rest-api/api-facade/v1";

import { Auth as AuthV1 } from "../../src/neuroio-rest-api/features/auth/v1";
import { Tokens as TokensV1 } from "../../src/neuroio-rest-api/features/tokens/v1";
import { Spaces as SpacesV1 } from "../../src/neuroio-rest-api/features/spaces/v1";
import { Entries as EntriesV1 } from "../../src/neuroio-rest-api/features/entries/v1";
import { Notifications as NotificationsV1 } from "../../src/neuroio-rest-api/features/notifications/v1";
import { Sources as SourcesV1 } from "../../src/neuroio-rest-api/features/sources/v1";
import { Utilities as UtilitiesV1 } from "../../src/neuroio-rest-api/features/utilities/v1";
import { Persons as PersonsV1 } from "../../src/neuroio-rest-api/features/persons/v1";
import { Thresholds as ThresholdsV1 } from "../../src/neuroio-rest-api/features/thresholds/v1";

jest.mock("axios");
jest.mock("form-data");

const endpoint = "https://api.mocked.com/";
const authEndpoint = "https://ima.mocked.com/";

const pathToMockedImage = path.resolve(__dirname, "../__mocks__/mock.jpg");

global.FormData = FormData;

describe("NeuroioApi test", () => {
  const userMock = {
    username: "jane_doe",
    space: null,
  };
  const tokenMock = {
    key: "token_key",
    id: 0,
    is_active: true,
    created: "2019-07-29T13:53:27.306Z",
    expires: "2020-07-29T13:53:27.306Z",
  };

  const HttpClient = createHttpClient({ client: axios });
  const httpClient = new HttpClient({
    baseURL: endpoint,
    token: "mocked_token",
  });

  const api = new ApiFacadeV1({
    httpClient,
    auth: new AuthV1({ httpClient, authURL: authEndpoint }),
    tokens: new TokensV1({ httpClient, authURL: authEndpoint }),
    spaces: new SpacesV1({ httpClient, authURL: authEndpoint }),
    notifications: new NotificationsV1({ httpClient }),
    entries: new EntriesV1({ httpClient }),
    persons: new PersonsV1({ httpClient }),
    sources: new SourcesV1({ httpClient }),
    utilities: new UtilitiesV1({ httpClient }),
    thresholds: new ThresholdsV1({ httpClient }),
  });

  let thenFn;
  let mockedFile;

  beforeAll((done) => {
    readFile(pathToMockedImage).then((fileBuffer) => {
      mockedFile = new File({
        buffer: fileBuffer,
        name: "handsome.jpg",
        type: "image/jpeg",
      });

      done();
    });
  });

  beforeEach(() => {
    thenFn = jest.fn();
  });

  afterEach(() => {
    axios.reset();
  });

  describe("Init test", () => {
    test("should call login with correct params, call setToken, return correct body", () => {
      const username = "Jane Doe";
      const password = "04.09.2001";

      const mockedData = {
        user: userMock,
        token: tokenMock,
      };

      api.init(username, password).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith(authEndpoint + "auth/token/", {
        username,
        password,
      });

      axios.mockResponse({ data: mockedData });

      expect(thenFn).toHaveBeenCalledWith(mockedData);
    });
  });

  describe("SetToken test", () => {
    test("should set default AUTH header with token to the client instance", () => {
      const mockedToken = "mocked token";

      api.setToken(mockedToken);

      expect(api.httpClient.client.defaults.headers.Authorization).toEqual(
        `Token ${mockedToken}`
      );
    });
  });

  describe("Auth module test", () => {
    const username = "Jane Doe";
    const password = "04.09.2001";

    describe("login/logout", () => {
      test("login: should send POST request to API server with data on correct endpoint", () => {
        api.auth.login(username, password).then(thenFn);

        expect(axios.post).toHaveBeenCalledWith(authEndpoint + "auth/token/", {
          username,
          password,
        });

        const mockedData = {
          user: userMock,
          token: tokenMock,
        };

        axios.mockResponse({ data: mockedData });

        expect(thenFn).toHaveBeenCalledWith(mockedData);
      });

      test("logout: should send DELETE request to API server on correct endpoint", () => {
        const tokenId = 4;

        api.auth.logout(tokenId);

        expect(axios.delete).toHaveBeenCalledWith(
          authEndpoint + `tokens/${tokenId}/`
        );
      });
    });

    test("whoami: should send get request to API server on correct endpoint", () => {
      api.auth.whoami().then(thenFn);

      expect(axios.get).toHaveBeenCalledWith(authEndpoint + "whoami/");

      axios.mockResponse({ data: userMock });

      expect(thenFn).toHaveBeenCalledWith(userMock);
    });

    test("changePassword: should send correct password data", () => {
      const mockedData = {
        old_password: "old_pass",
        password: "new_pass",
        password2: "new_pass",
      };

      api.auth.changePassword(mockedData).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith(
        authEndpoint + "auth/password/change/",
        mockedData
      );
    });
  });

  describe("Tokens module test", () => {
    test("getTokens: should return correct array of tokens", () => {
      const mockedTokens = [tokenMock];
      const reqParams = {
        permanent: false,
        limit: 20,
        offset: 10,
      };

      api.tokens.getTokens(reqParams).then(thenFn);

      expect(axios.get).toHaveBeenCalledWith(authEndpoint + "tokens/", {
        params: reqParams,
      });

      axios.mockResponse({ data: mockedTokens });

      expect(thenFn).toHaveBeenCalledWith(mockedTokens);
    });

    test("createToken: should send POST request with correct data", () => {
      const reqData = {
        permanent: true,
      };

      api.tokens.createToken(reqData).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith(
        authEndpoint + "tokens/",
        reqData
      );

      axios.mockResponse({ data: tokenMock });

      expect(thenFn).toHaveBeenCalledWith(tokenMock);
    });

    test("updateToken: should send PUT request with correct data", () => {
      const reqData = { id: 1, is_active: false };

      api.tokens.updateToken(reqData).then(thenFn);

      expect(axios.put).toHaveBeenCalledWith(
        authEndpoint + `tokens/${reqData.id}/`,
        {
          is_active: reqData.is_active,
        }
      );

      axios.mockResponse({ data: tokenMock });

      expect(thenFn).toHaveBeenCalledWith(tokenMock);
    });

    test("deleteToken: should send DELETE request with correct data", () => {
      const tokenId = 1;

      api.tokens.deleteToken(tokenId).then(thenFn);

      expect(axios.delete).toHaveBeenCalledWith(
        authEndpoint + `tokens/${tokenId}/`
      );
    });

    test("deleteTokens: should send DELETE request with correct data", () => {
      const reqParams = { permanent: true };

      api.tokens.deleteTokens(reqParams).then(thenFn);

      expect(axios.delete).toHaveBeenCalledWith(authEndpoint + "tokens/", {
        params: reqParams,
      });
    });
  });

  describe("Notifications module test", () => {
    const NOTIFICATIONS = "notifications/";
    const mockedNotification = {
      is_active: false,
      http_method: 0,
      destination_url: "https://mocked.com",
      results: [1],
      age_from: 20,
      age_to: 25,
      sex: 1,
      moods: [0],
      sources: ["webcam"],
      persons_groups: ["some", "persons groups"],
    };

    test("getNotifications: should return correct array of notifications", () => {
      const mockedNotifications = [mockedNotification];

      api.notifications
        .getNotifications({ q: "some q", limit: 20, offset: 0 })
        .then(thenFn);

      expect(axios.get).toHaveBeenCalledWith(NOTIFICATIONS, {
        params: { q: "some q", limit: 20, offset: 0 },
      });

      axios.mockResponse({ data: mockedNotifications });

      expect(thenFn).toHaveBeenCalledWith(mockedNotifications);
    });

    test("getNotification: should return correct notification object", () => {
      const notificationId = 1;

      api.notifications.getNotification(notificationId).then(thenFn);

      expect(axios.get).toHaveBeenCalledWith(
        `${NOTIFICATIONS}${notificationId}/`
      );

      axios.mockResponse({ data: mockedNotification });

      expect(thenFn).toHaveBeenCalledWith(mockedNotification);
    });

    test("createNotification: should send POST request with correct data", () => {
      api.notifications.createNotification(mockedNotification).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith(
        NOTIFICATIONS,
        mockedNotification
      );

      axios.mockResponse({ data: mockedNotification });

      expect(thenFn).toHaveBeenCalledWith(mockedNotification);
    });

    test("updateNotification: should send PUT request with correct data", () => {
      const notificationId = 1;

      api.notifications
        .updateNotification({ id: notificationId, ...mockedNotification })
        .then(thenFn);

      expect(axios.put).toHaveBeenCalledWith(
        `${NOTIFICATIONS}${notificationId}/`,
        mockedNotification
      );

      axios.mockResponse({ data: mockedNotification });

      expect(thenFn).toHaveBeenCalledWith(mockedNotification);
    });

    test("deleteNotification: should send DELETE request with correct data", () => {
      const notificationId = 1;

      api.notifications.deleteNotification(notificationId).then(thenFn);

      expect(axios.delete).toHaveBeenCalledWith(
        `${NOTIFICATIONS}${notificationId}/`
      );
    });
  });

  describe("Persons module test", () => {
    const mockedPerson = {
      age: 20,
      mood: "fear",
      source: "webcam",
    };

    test("searchPersonByImage: should return correct person object", () => {
      const personData = {
        image: mockedFile,
        identify_asm: true,
      };

      const expectedData = {
        identify_asm: true,
        image: {
          filename: "handsome.jpg",
          value: mockedFile,
        },
      };

      api.persons.searchPersonByImage(personData).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("persons/search/", {
        _data: expectedData,
      });

      axios.mockResponse({ data: mockedPerson });

      expect(thenFn).toHaveBeenCalledWith(mockedPerson);
    });

    test("createPerson: should send POST request with correct data", () => {
      const personData = {
        image: mockedFile,
        source: "webcam",
        facesize: 100,
        create_on_junk: false,
        create_on_ha: undefined,
        identify_asm: true,
      };

      const expectedData = {
        source: "webcam",
        facesize: 100,
        create_on_junk: false,
        identify_asm: true,
        image: {
          filename: "handsome.jpg",
          value: mockedFile,
        },
      };

      api.persons.createPerson(personData).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("persons/", {
        _data: expectedData,
      });

      axios.mockResponse({ data: mockedPerson });

      expect(thenFn).toHaveBeenCalledWith(mockedPerson);
    });

    test("createPersonFromEntry: should send POST request with correct data", () => {
      const entryId = 42;
      const create_on_ha = false;
      const create_on_junk = false;

      api.persons
        .createPersonFromEntry({
          entryId,
          create_on_ha,
          create_on_junk,
        })
        .then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("persons/entry/", {
        id: entryId,
        create_on_ha,
        create_on_junk,
      });
    });

    test("deletePerson: should send DELETE request with correct URL", () => {
      const pid = 42;

      api.persons.deletePerson(pid).then(thenFn);

      expect(axios.delete).toHaveBeenCalledWith(`persons/${pid}/`);
    });

    test("reinitializePersonByEntry: should send POST request with correct data", () => {
      const entryId = 42;

      api.persons.reinitializePersonByEntry({ entryId }).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("persons/reinit/", {
        id: entryId,
      });
    });

    test("reinitializePersonByImage: should send POST request with correct data", () => {
      const pid = 1;

      const personData = {
        pid,
        image: mockedFile,
        source: "webcam",
        facesize: 10,
        result: "ha",
      };

      const expectedData = {
        source: "webcam",
        facesize: 10,
        result: "ha",
        image: {
          filename: "handsome.jpg",
          value: mockedFile,
        },
      };

      api.persons.reinitializePersonByImage(personData).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith(`persons/reinit/${pid}`, {
        _data: expectedData,
      });

      axios.mockResponse({ data: mockedPerson });

      expect(thenFn).toHaveBeenCalledWith(mockedPerson);
    });
  });

  describe("Entries module test", () => {
    const mockedEntry = {
      id: 1,
      created: "2008-09-15T15:53:00",
      face_image: "https://mocked.com/entries/detected/1",
      initial_face_image: "https://mocked.com/entries/initial/1",
      full_image: "https://mocked.com/entries/detected/1",
      initial_full_image: "https://mocked.com/entries/initial/1",
      source: {
        id: 0,
        name: "webcam",
      },
      facesize: 10,
      age: 12,
      sex: 0,
      mood: "fear",
      liveness: "passed",
      result: "ha",
      detected: "2008-09-15T15:53:00",
    };

    test("getEntries: should return correct array of entries", () => {
      const mockedEntries = [mockedEntry];
      const mockedFilters = {
        result: "some_result",
        liveness: "some_liveness",
        sources_ids: 2,
        id_from: 100,
        date_from: "some_date_from",
        date_to: "some_date_to",
        limit: 100,
        offset: 20,
        mood: "happiness,fear",
        age_from: 10,
        age_to: 13,
        sex: "0,1",
      };

      api.entries.getEntries(mockedFilters).then(thenFn);

      expect(axios.get).toHaveBeenCalledWith("entries/", {
        params: mockedFilters,
      });

      axios.mockResponse({ data: mockedEntries });

      expect(thenFn).toHaveBeenCalledWith(mockedEntries);
    });

    test("getEntriesStatsByPersonId: should return correct object with stats of a person", () => {
      const pid = 1;

      api.entries.getEntriesStatsByPersonId(pid).then(thenFn);

      expect(axios.get).toHaveBeenCalledWith(`entries/stats/pid/${pid}/`);

      axios.mockResponse({ data: mockedEntry });

      expect(thenFn).toHaveBeenCalledWith(mockedEntry);
    });

    test("deleteEntry: should send DELETE request with correct data", () => {
      const entryId = 1;

      api.entries.deleteEntry(entryId).then(thenFn);

      expect(axios.delete).toHaveBeenCalledWith(`entries/${entryId}/`);
    });
  });

  describe("Sources module test", () => {
    const mockedSource = {
      name: "My new awesome source",
      identify_facesize_threshold: 7000,
      use_pps_timestamp: 1000,
    };

    test("getSources: should return correct array of sources", () => {
      const mockedSources = [mockedSource];

      api.sources
        .getSources({ q: "some q", limit: 20, offset: 0 })
        .then(thenFn);

      expect(axios.get).toHaveBeenCalledWith("sources/", {
        params: { q: "some q", limit: 20, offset: 0 },
      });

      axios.mockResponse({ data: mockedSources });

      expect(thenFn).toHaveBeenCalledWith(mockedSources);
    });

    test("createSource: should send POST request with correct data", () => {
      api.sources.createSource(mockedSource).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("sources/", mockedSource);
    });

    test("getSource: should return correct source object", () => {
      const sourceId = 1;

      api.sources.getSource(sourceId).then(thenFn);

      expect(axios.get).toHaveBeenCalledWith(`sources/${sourceId}/`);

      axios.mockResponse({ data: mockedSource });

      expect(thenFn).toHaveBeenCalledWith(mockedSource);
    });

    test("updateSource: should send PUT request with correct data", () => {
      const sourceId = 1;

      api.sources.updateSource({ id: sourceId, ...mockedSource }).then(thenFn);

      expect(axios.put).toHaveBeenCalledWith(
        `sources/${sourceId}/`,
        mockedSource
      );

      axios.mockResponse({ data: mockedSource });

      expect(thenFn).toHaveBeenCalledWith(mockedSource);
    });

    test("deleteSource: should send DELETE request with correct data", () => {
      const sourceId = 1;

      api.sources.deleteSource(sourceId).then(thenFn);

      expect(axios.delete).toHaveBeenCalledWith(`sources/${sourceId}/`);
    });
  });

  describe("Spaces module test", () => {
    const mockedSpace = {
      id: 0,
      name: "My new awesome space",
    };

    test("getSpaces: should return correct array of spaces", () => {
      const mockedSpaces = [mockedSpace];
      const reqParams = { limit: 20, offset: 0 };

      api.spaces.getSpaces(reqParams).then(thenFn);

      expect(axios.get).toHaveBeenCalledWith(authEndpoint + "spaces/", {
        params: reqParams,
      });

      axios.mockResponse({ data: mockedSpaces });

      expect(thenFn).toHaveBeenCalledWith(mockedSpaces);
    });

    test("createSpace: should send POST request with correct data", () => {
      const reqData = { name: mockedSpace.name };

      api.spaces.createSpace(reqData).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith(
        authEndpoint + "spaces/",
        reqData
      );
    });

    test("getSpace: should return correct space object", () => {
      const spaceId = 1;

      api.spaces.getSpace(spaceId).then(thenFn);

      expect(axios.get).toHaveBeenCalledWith(
        authEndpoint + `spaces/${spaceId}/`
      );

      axios.mockResponse({ data: mockedSpace });

      expect(thenFn).toHaveBeenCalledWith(mockedSpace);
    });

    test("updateSpace: should send PUT request with correct data", () => {
      const reqId = mockedSpace.id;
      const reqData = { name: mockedSpace.name };

      api.spaces.updateSpace({ id: reqId, ...reqData }).then(thenFn);

      expect(axios.put).toHaveBeenCalledWith(
        authEndpoint + `spaces/${reqId}/`,
        reqData
      );

      axios.mockResponse({ data: mockedSpace });

      expect(thenFn).toHaveBeenCalledWith(mockedSpace);
    });

    test("deleteSpace: should send DELETE request with correct data", () => {
      const spaceId = 1;

      api.spaces.deleteSpace(spaceId).then(thenFn);

      expect(axios.delete).toHaveBeenCalledWith(
        authEndpoint + `spaces/${spaceId}/`
      );
    });
  });

  describe("Thresholds module test", () => {
    test("getThresholds: should send GET to correct url and return correct data", () => {
      const mockedThresholds = {
        exact: 0.12,
        ha: 0.1,
        junk: 1,
      };

      api.thresholds.getThresholds().then(thenFn);
      expect(axios.get).toHaveBeenCalledWith("settings/thresholds/");

      axios.mockResponse({ data: mockedThresholds });
      expect(thenFn).toHaveBeenCalledWith(mockedThresholds);
    });

    test("updateThresholds: should send PUT to correct url and return correct data", () => {
      const mockedThresholds = {
        exact: 0.12,
        ha: 0.1,
        junk: 1,
      };

      api.thresholds.updateThresholds(mockedThresholds).then(thenFn);
      expect(axios.put).toHaveBeenCalledWith(
        "settings/thresholds/",
        mockedThresholds
      );

      axios.mockResponse({ data: mockedThresholds });
      expect(thenFn).toHaveBeenCalledWith(mockedThresholds);
    });

    test("resetThresholds: should send POST to correct url and return correct data", () => {
      const mockedThresholds = {
        exact: 0.12,
        ha: 0.1,
        junk: 1,
      };

      api.thresholds.resetThresholds().then(thenFn);
      expect(axios.post).toHaveBeenCalledWith("settings/thresholds/reset/");

      axios.mockResponse({ data: mockedThresholds });
      expect(thenFn).toHaveBeenCalledWith(mockedThresholds);
    });
  });

  describe("Utilities module test", () => {
    test("comparePhotos: should send POST request with correct data", () => {
      const mockedDataToCompare = {
        image1: mockedFile,
        image2: mockedFile,
        result: "ha",
      };

      const expectedData = {
        result: "ha",
        image1: {
          filename: "handsome.jpg",
          value: mockedFile,
        },
        image2: {
          filename: "handsome.jpg",
          value: mockedFile,
        },
      };

      api.utilities.comparePhotos(mockedDataToCompare).then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("utility/compare/", {
        _data: expectedData,
      });
    });

    test("findOutCustomer: should send POST request with correct data", () => {
      const mockedData = {
        source: "webcam",
        offset: 100,
      };

      api.utilities.findOutCustomer(mockedData).then(thenFn);

      expect(axios.get).toHaveBeenCalledWith("utility/customer/", {
        params: mockedData,
      });
    });

    test("verifyPersonPhotoWithDocumentPhoto: should send POST request with correct data", () => {
      const mockedDataToVerify = {
        photo_face: mockedFile,
        photo_face_facesize: 2000,
        photo_id: mockedFile,
        photo_id_facesize: 2000,
        id_code: "ru",
        result: "exact",
      };

      const expectedData = {
        photo_face: {
          filename: "handsome.jpg",
          value: mockedFile,
        },
        photo_face_facesize: 2000,
        photo_id: {
          filename: "handsome.jpg",
          value: mockedFile,
        },
        id_code: "ru",
        photo_id_facesize: 2000,
        result: "exact",
      };

      api.utilities
        .verifyPersonPhotoWithDocumentPhoto(mockedDataToVerify)
        .then(thenFn);

      expect(axios.post).toHaveBeenCalledWith("faceid/verification/", {
        _data: expectedData,
      });
    });
  });
});
