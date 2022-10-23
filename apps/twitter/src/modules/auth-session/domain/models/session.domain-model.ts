export class SessionDomainModel {
  readonly id!: string;

  ip: string;

  loggedAt: Date;

  userAgent: string;

  userId: string;
}
