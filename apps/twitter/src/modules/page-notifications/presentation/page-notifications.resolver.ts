import { Query, Resolver } from '@nestjs/graphql';

import { NotificationsAllResult, NotificationsMentionsResult } from './results';

@Resolver()
export class PageNotificationResolver {
  @Query(() => NotificationsAllResult)
  public async notificationsAll() {
    return;
  }

  @Query(() => NotificationsMentionsResult)
  public async notificationsMentions() {
    return;
  }
}
