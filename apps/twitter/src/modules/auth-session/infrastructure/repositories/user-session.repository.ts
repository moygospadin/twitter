import { Injectable } from '@nestjs/common';

import { PrismaTwitterClient } from '@libs/prisma/infrastructure/prisma-twitter.client';
import { InterfaceValidator } from '@typings';

import { UserSessionDomainModel } from '../../domain/models';
import {
  DeleteByIdParameters,
  DeleteMultipleByUserIdAndGetParameters,
  DeleteOldestSessionParameters,
  FindMultipleByUserIdParameters,
  GetCountByUserIdParameters,
  UserSessionRepositoryInterface,
} from '../../domain/repository-interfaces';

@Injectable()
export class UserSessionRepository implements InterfaceValidator<UserSessionRepository, UserSessionRepositoryInterface> {
  constructor(private readonly prismaClient: PrismaTwitterClient) {}

  public async add({ createdAt, expiredAt, userId }: Omit<UserSessionDomainModel, 'id'>): Promise<UserSessionDomainModel> {
    return this.prismaClient.userSessions.create({ data: { createdAt, expiredAt, userId } });
  }

  public async deleteById({ sessionId }: DeleteByIdParameters): Promise<void> {
    await this.prismaClient.userSessions.delete({ where: { id: sessionId } });
  }

  public async deleteMultipleByUserIdAndGet({ userId }: DeleteMultipleByUserIdAndGetParameters): Promise<UserSessionDomainModel[]> {
    const userSessions = await this.prismaClient.userSessions.findMany({ where: { userId } });

    const idsOfUserSessionsToBeDeleted = userSessions.map(({ id }) => id);

    await this.prismaClient.userSessions.deleteMany({ where: { id: { in: idsOfUserSessionsToBeDeleted } } });

    return userSessions;
  }

  public async deleteOldestSession({ userId }: DeleteOldestSessionParameters) {
    const oldestRefreshToken = await this.prismaClient.userSessions.findFirst({
      orderBy: { createdAt: 'asc' },
      take: 1,
      where: { userId },
    });

    await this.prismaClient.userSessions.delete({ where: { id: oldestRefreshToken.id } });
  }

  public async findMultipleByUserId({ userId }: FindMultipleByUserIdParameters): Promise<UserSessionDomainModel[]> {
    return this.prismaClient.userSessions.findMany({ where: { userId } });
  }

  public async getCountByUserId({ userId }: GetCountByUserIdParameters): Promise<number> {
    return this.prismaClient.userSessions.count({ where: { userId } });
  }
}
