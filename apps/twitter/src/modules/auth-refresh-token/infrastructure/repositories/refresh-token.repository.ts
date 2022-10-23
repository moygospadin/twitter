import { Injectable } from '@nestjs/common';

import { PrismaTwitterClient } from '@libs/prisma/infrastructure/prisma-twitter.client';
import { InterfaceValidator } from '@typings';

import { RefreshTokenDomainModel } from '../../domain/models';
import {
  DeleteByIdParameters,
  DeleteByUserIdParameters,
  DeleteOldestRefreshTokenParameters,
  FindByIdParameters,
  RefreshTokenRepositoryInterface,
} from '../../domain/repository-interfaces';

@Injectable()
export class RefreshTokenRepository implements InterfaceValidator<RefreshTokenRepository, RefreshTokenRepositoryInterface> {
  constructor(private readonly prismaClient: PrismaTwitterClient) {}

  public async add({ createdAt, expiredAt, userId }: Omit<RefreshTokenDomainModel, 'id'>): Promise<RefreshTokenDomainModel> {
    return this.prismaClient.refreshTokens.create({ data: { createdAt, expiredAt, userId } });
  }

  public async deleteById({ refreshTokenId }: DeleteByIdParameters): Promise<void> {
    await this.prismaClient.refreshTokens.delete({ where: { id: refreshTokenId } });
  }

  public async deleteByUserId({ userId }: DeleteByUserIdParameters): Promise<void> {
    await this.prismaClient.refreshTokens.deleteMany({ where: { userId } });
  }

  public async deleteOldestRefreshToken({ userId }: DeleteOldestRefreshTokenParameters): Promise<void> {
    const oldestRefreshToken = await this.prismaClient.refreshTokens.findFirst({
      orderBy: { createdAt: 'asc' },
      take: 1,
      where: { userId },
    });

    await this.prismaClient.refreshTokens.delete({ where: { id: oldestRefreshToken.id } });
  }

  public async findById({ refreshTokenId }: FindByIdParameters): Promise<RefreshTokenDomainModel> {
    return this.prismaClient.refreshTokens.findFirst({ where: { id: refreshTokenId } });
  }
}
