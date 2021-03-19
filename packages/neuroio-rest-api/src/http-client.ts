import { removeEmpty, isEmpty } from "./utils";
import qs from "qs";
import { HttpClientInterface } from "./neuroio-rest-api/api-facade/auth";
import sizeof from "object-sizeof";
import { getFormDataSize } from "./utils";

function getPayloadSize(payload: Record<string, unknown> | FormData): number {
  if (payload instanceof FormData) {
    return getFormDataSize(payload);
  } else {
    return sizeof(payload);
  }
}

const payloadIsTooLargeError = new Error("Payload is too large");

// 6mb
const MAX_PAYLOAD_SIZE = 6291456;

function prepareUrlParams(params: { q?: string }): Record<string, unknown> {
  const paramsWithValues = removeEmpty(params);

  if (Object.prototype.hasOwnProperty.call(params, "q")) {
    if (params.q === "") {
      delete paramsWithValues.q;
    }
  }

  return !isEmpty(paramsWithValues) ? paramsWithValues : {};
}

type RequestData = FormData | Record<string, unknown>;

type ResponseData = { data: Record<string, unknown> };

interface RequestClientInterface {
  defaults: { baseURL?: string; headers?: { Authorization?: string } };
  get(
    url: string,
    config?: { params?: Record<string, unknown> }
  ): Promise<ResponseData>;
  post(url: string, data?: RequestData): Promise<ResponseData>;
  put(url: string, data?: RequestData): Promise<ResponseData>;
  delete(
    url: string,
    config?: {
      params?: Record<string, unknown>;
      data?: Record<string, unknown> | FormData;
    }
  ): Promise<ResponseData>;
}

interface RequestClientCreatorSettingsInterface {
  baseURL?: string;
  headers?: { "Content-Type": string; token?: string };
  paramsSerializer?(params: any): string;
}

interface RequestClientCreatorInterface {
  create(
    settings: RequestClientCreatorSettingsInterface
  ): RequestClientInterface;
}

interface RequestClientCreatorSettingsInterface {
  baseURL?: string;
  token?: string;
}

function createHttpClient({
  client,
}: {
  client: RequestClientCreatorInterface;
}): {
  new (settings: RequestClientCreatorSettingsInterface): HttpClientInterface;
} {
  return class HttpClient implements HttpClientInterface {
    private client: RequestClientInterface;

    constructor({ baseURL, token }: RequestClientCreatorSettingsInterface) {
      Object.assign(this, { baseURL, token });

      const headers: {
        "Content-Type": string;
        token?: string;
      } = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.token = `Token ${token}`;
      }

      this.client = client.create({
        baseURL,
        headers,
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: "comma" });
        },
      });
    }

    setToken(token: string): void {
      if (token && this.client.defaults.headers) {
        this.client.defaults.headers["Authorization"] = `Token ${token}`;
      }
    }

    deleteToken(): void {
      if (this.client.defaults.headers) {
        delete this.client.defaults.headers["Authorization"];
      }
    }

    setBaseURL(baseURL: string): void {
      if (baseURL) {
        this.client.defaults.baseURL = baseURL;
      }
    }

    post(url: string, data?: RequestData): Promise<Record<string, unknown>> {
      let preparedData = data;

      if (data && !(data instanceof FormData)) {
        preparedData = removeEmpty(data);
      }

      if (data && getPayloadSize(data) >= MAX_PAYLOAD_SIZE) {
        return Promise.reject(payloadIsTooLargeError);
      }

      if (preparedData) {
        return this.client.post(url, preparedData).then(({ data }) => data);
      } else {
        return this.client.post(url).then(({ data }) => data);
      }
    }

    get(
      url: string,
      params?: Record<string, unknown>
    ): Promise<Record<string, unknown>> {
      const config: { params?: Record<string, unknown> } = {};

      if (params) {
        config.params = prepareUrlParams(params);
      }

      if (!isEmpty(config)) {
        return this.client.get(url, config).then(({ data }) => data);
      } else {
        return this.client.get(url).then(({ data }) => data);
      }
    }

    put(url: string, data?: RequestData): Promise<Record<string, unknown>> {
      let preparedData = data;

      if (data && !(data instanceof FormData)) {
        preparedData = removeEmpty(data);
      }

      if (data && getPayloadSize(data) >= MAX_PAYLOAD_SIZE) {
        return Promise.reject(payloadIsTooLargeError);
      }

      return this.client.put(url, preparedData).then(({ data }) => data);
    }

    delete(
      url: string,
      params?: Record<string, unknown>,
      data?: RequestData
    ): Promise<Record<string, unknown>> {
      const config: {
        params?: Record<string, unknown>;
        data?: Record<string, unknown> | FormData;
      } = {};

      if (params) {
        config.params = prepareUrlParams(params);
      }

      let preparedData = data;

      if (data && !(data instanceof FormData)) {
        preparedData = removeEmpty(data);
      }

      if (preparedData) {
        config.data = preparedData;
      }

      if (data && getPayloadSize(data) >= MAX_PAYLOAD_SIZE) {
        return Promise.reject(payloadIsTooLargeError);
      }

      if (!isEmpty(config)) {
        return this.client.delete(url, config).then(({ data }) => data);
      } else {
        return this.client.delete(url).then(({ data }) => data);
      }
    }
  };
}

export { createHttpClient };
