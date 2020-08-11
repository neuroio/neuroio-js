export interface ApiSettingsInterface {
  httpClient: any;
}

export interface ApiInterface {}

class Api implements ApiInterface {
  protected httpClient: any;

  constructor(settings: ApiSettingsInterface) {
    this.httpClient = settings.httpClient;
  }
}

export { Api };
