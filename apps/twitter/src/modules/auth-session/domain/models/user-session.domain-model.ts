export class UserSessionDomainModel {
  createdAt: Date;

  expiredAt: Date;

  readonly id!: string;

  userId: string;
}
