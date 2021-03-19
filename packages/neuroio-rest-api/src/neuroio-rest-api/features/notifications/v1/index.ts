import { Api, ApiSettingsInterface } from "../../../../base/api";
import { id } from "../../../../base/types";

import {
  NotificationsInterface,
  NotificationInterface,
  NotificationsFiltersInterface,
} from "../../../api-facade/v1/notifications";

class Notifications extends Api implements NotificationsInterface {
  constructor(settings: ApiSettingsInterface) {
    super(settings);
    this.getNotifications = this.getNotifications.bind(this);
    this.getNotification = this.getNotification.bind(this);
    this.createNotification = this.createNotification.bind(this);
    this.updateNotification = this.updateNotification.bind(this);
    this.deleteNotification = this.deleteNotification.bind(this);
  }

  static apiEndpoint = "notifications/";

  static getNotificationData = ({
    name,
    is_active,
    http_method,
    destination_url,
    results,
    age_from,
    age_to,
    sex,
    moods,
    sources,
    persons_groups,
    liveness,
  }: NotificationInterface = {}): {} => ({
    name,
    is_active,
    http_method,
    destination_url,
    results,
    age_from,
    age_to,
    sex,
    moods,
    sources,
    persons_groups,
    liveness,
  });

  getNotifications(filters: NotificationsFiltersInterface = {}): Promise<null> {
    const getFiltersData = ({
      q,
      limit,
      offset,
      spaces_ids,
    }: NotificationsFiltersInterface): {} => ({
      q,
      limit,
      offset,
      spaces_ids,
    });

    return this.httpClient.get(
      Notifications.apiEndpoint,
      getFiltersData(filters)
    );
  }

  getNotification(notificationId: id): Promise<NotificationInterface> {
    return this.httpClient.get(
      `${Notifications.apiEndpoint}${notificationId}/`
    );
  }

  createNotification(
    data: NotificationInterface
  ): Promise<NotificationInterface> {
    return this.httpClient.post(
      Notifications.apiEndpoint,
      Notifications.getNotificationData(data)
    );
  }

  updateNotification({ id, ...restData }: NotificationInterface = {}): Promise<
    NotificationInterface
  > {
    return this.httpClient.put(
      `${Notifications.apiEndpoint}${id}/`,
      Notifications.getNotificationData(restData)
    );
  }

  deleteNotification(notificationId: id): Promise<null> {
    return this.httpClient.delete(
      `${Notifications.apiEndpoint}${notificationId}/`
    );
  }
}

export { Notifications };
