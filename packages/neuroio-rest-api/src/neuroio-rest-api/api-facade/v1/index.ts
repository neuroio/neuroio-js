import {
  ApiFacade,
  ApiFacadeInterface,
  ApiFacadeSettingsInterface,
} from "../base";

import { NotificationsInterface } from "./notifications";
import { EntriesInterface } from "./entries";
import { PersonsInterface } from "./persons";
import { SourcesInterface } from "./sources";
import { TokensInterface } from "./tokens";
import { UtilitiesInterface } from "./utilities";
import { PersonsGroupsInterface } from "./persons-groups";
import { ThresholdsClassInterface } from "./thresholds";

interface ApiFacadeV1SettingsInterface extends ApiFacadeSettingsInterface {
  notifications: NotificationsInterface;
  entries: EntriesInterface;
  persons: PersonsInterface;
  sources: SourcesInterface;
  tokens: TokensInterface;
  utilities: UtilitiesInterface;
  personsGroups: PersonsGroupsInterface;
  thresholds: ThresholdsClassInterface;
}

export interface ApiFacadeV1Interface extends ApiFacadeInterface {
  notifications: NotificationsInterface;
  entries: EntriesInterface;
  persons: PersonsInterface;
  sources: SourcesInterface;
  tokens: TokensInterface;
  utilities: UtilitiesInterface;
  personsGroups: PersonsGroupsInterface;
  thresholds: ThresholdsClassInterface;
}

class ApiFacadeV1 extends ApiFacade {
  notifications: NotificationsInterface;
  entries: EntriesInterface;
  persons: PersonsInterface;
  sources: SourcesInterface;
  tokens: TokensInterface;
  utilities: UtilitiesInterface;
  personsGroups: PersonsGroupsInterface;
  thresholds: ThresholdsClassInterface;

  constructor({
    httpClient,
    auth,
    notifications,
    entries,
    persons,
    sources,
    tokens,
    utilities,
    personsGroups,
    thresholds,
  }: ApiFacadeV1SettingsInterface) {
    super({
      auth,
      httpClient,
    });

    this.notifications = notifications;
    this.entries = entries;
    this.persons = persons;
    this.sources = sources;
    this.tokens = tokens;
    this.utilities = utilities;
    this.personsGroups = personsGroups;
    this.thresholds = thresholds;
  }
}

export { ApiFacadeV1 };
