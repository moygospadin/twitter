export enum TwitterRoutingKey {
  chatCreated = 'twitter.producer.event.chatCreated',
  chatMemberAdded = 'twitter.producer.event.chatMemberAdded',
  messageCreated = 'twitter.producer.event.messageCreated',
  messageDeleted = 'twitter.producer.event.messageDeleted',
  messageReplied = 'twitter.producer.event.messageReplied',
  messageUpdated = 'twitter.producer.event.messageUpdated',
}
