import {
  ApiFacade,
  ApiFacadeInterface,
  ApiFacadeSettingsInterface,
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

interface ApiFacadeV1SettingsInterface extends ApiFacadeSettingsInterface {
  tokens: TokensInterface;
  spaces: SpacesInterface;

  notifications: NotificationsInterface;
  entries: EntriesInterface;
  persons: PersonsInterface;
  sources: SourcesInterface;
  utilities: UtilitiesInterface;
  personsGroups: PersonsGroupsInterface;
  thresholds: ThresholdsClassInterface;
}

export interface ApiFacadeV1Interface extends ApiFacadeInterface {
  tokens: TokensInterface;
  spaces: SpacesInterface;

  notifications: NotificationsInterface;
  entries: EntriesInterface;
  persons: PersonsInterface;
  sources: SourcesInterface;
  utilities: UtilitiesInterface;
  personsGroups: PersonsGroupsInterface;
  thresholds: ThresholdsClassInterface;
}

class ApiFacadeV1 extends ApiFacade {
  tokens: TokensInterface;
  spaces: SpacesInterface;

  notifications: NotificationsInterface;
  entries: EntriesInterface;
  persons: PersonsInterface;
  sources: SourcesInterface;
  utilities: UtilitiesInterface;
  personsGroups: PersonsGroupsInterface;
  thresholds: ThresholdsClassInterface;

  constructor({
    httpClient,
    auth,
    tokens,
    spaces,
    notifications,
    entries,
    persons,
    sources,
    utilities,
    personsGroups,
    thresholds,
  }: ApiFacadeV1SettingsInterface) {
    super({
      auth,
      httpClient,
    });

    this.tokens = tokens;
    this.spaces = spaces;

    this.notifications = notifications;
    this.entries = entries;
    this.persons = persons;
    this.sources = sources;
    this.utilities = utilities;
    this.personsGroups = personsGroups;
    this.thresholds = thresholds;
  }
}

export { ApiFacadeV1 };
