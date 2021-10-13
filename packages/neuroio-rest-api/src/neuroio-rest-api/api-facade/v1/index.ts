import {
  ApiFacade,
  ApiFacadeInterface,
  ApiFacadeSettingsInterface,
  EndpointInterface,
} from "../base";

import { TokensInterface } from "./tokens";
import { SpacesInterface } from "./spaces";
import { NotificationsInterface } from "./notifications";
import { EntriesInterface } from "./entries";
import { PersonsInterface } from "./persons";
import { SourcesInterface } from "./sources";
import { UtilitiesInterface } from "./utilities";
import { PersonsGroupsInterface } from "./persons-groups";
import { ThresholdsClassInterface } from "./thresholds";
import { StreamTokensInterface } from "./stream-tokens";
import { LicensesInterface } from "./licenses";

interface ApiFacadeV1SettingsInterface extends ApiFacadeSettingsInterface {
  tokens: TokensInterface;
  spaces: SpacesInterface;
  licenses: LicensesInterface;

  notifications: NotificationsInterface;
  entries: EntriesInterface;
  persons: PersonsInterface;
  sources: SourcesInterface;
  utilities: UtilitiesInterface;
  personsGroups: PersonsGroupsInterface;
  thresholds: ThresholdsClassInterface;
  streamTokens: StreamTokensInterface;
}

export interface ApiFacadeV1Interface extends ApiFacadeInterface {
  tokens: TokensInterface;
  spaces: SpacesInterface;
  licenses: LicensesInterface;

  notifications: NotificationsInterface;
  entries: EntriesInterface;
  persons: PersonsInterface;
  sources: SourcesInterface;
  utilities: UtilitiesInterface;
  personsGroups: PersonsGroupsInterface;
  thresholds: ThresholdsClassInterface;
  streamTokens: StreamTokensInterface;
}

class ApiFacadeV1 extends ApiFacade {
  tokens: TokensInterface;
  spaces: SpacesInterface;
  licenses: LicensesInterface;

  notifications: NotificationsInterface;
  entries: EntriesInterface;
  persons: PersonsInterface;
  sources: SourcesInterface;
  utilities: UtilitiesInterface;
  personsGroups: PersonsGroupsInterface;
  thresholds: ThresholdsClassInterface;
  streamTokens: StreamTokensInterface;

  constructor({
    httpClient,
    auth,
    tokens,
    spaces,
    licenses,
    notifications,
    entries,
    persons,
    sources,
    utilities,
    personsGroups,
    thresholds,
    streamTokens,
  }: ApiFacadeV1SettingsInterface) {
    super({
      auth,
      httpClient,
    });

    this.tokens = tokens;
    this.spaces = spaces;
    this.licenses = licenses;

    this.notifications = notifications;
    this.entries = entries;
    this.persons = persons;
    this.sources = sources;
    this.utilities = utilities;
    this.personsGroups = personsGroups;
    this.thresholds = thresholds;
    this.streamTokens = streamTokens;
  }

  setEndpoint(endpoint: EndpointInterface): void {
    super.setEndpoint(endpoint);
    this.tokens.setAuthURL(endpoint.auth);
    this.spaces.setAuthURL(endpoint.auth);
    this.licenses.setAuthURL(endpoint.auth);
  }
}

export { ApiFacadeV1 };
