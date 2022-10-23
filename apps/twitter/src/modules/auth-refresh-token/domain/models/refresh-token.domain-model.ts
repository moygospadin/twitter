export class RefreshTokenDomainModel {
  createdAt: Date;

  expiredAt: Date;

  readonly id!: string;

  userId: string;
}
