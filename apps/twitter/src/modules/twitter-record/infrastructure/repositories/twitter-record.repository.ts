import { Injectable } from '@nestjs/common';

import { compressRowsByIdentifier } from '@libs/prisma';
import { PrismaTwitterClient } from '@libs/prisma/infrastructure/prisma-twitter.client';
import { InterfaceValidator } from '@typings';

import { CommentDomnainModel } from '../../../twitter-record-comment/domain/models';
import {
  AddCommentParameters,
  CommentRepositoryInterface,
  DeleteCommentByIdParameters,
  GetFlatChildTreeOfCommentsByTweetIdParameters,
} from '../../../twitter-record-comment/domain/repository-interfaces';
import { RetweetDomnainModel } from '../../../twitter-record-retweet/domain/models';
import {
  AddRetweetParameters,
  DeleteRetweetByIdParameters,
  GetRetweetsByUserIdParameters,
  RetweetRepositoryInterface,
} from '../../../twitter-record-retweet/domain/repository-interfaces';
import { TweetDomnainModel } from '../../../twitter-record-tweet/domain/models';
import {
  AddTweetParameters,
  DeleteTweetByIdParameters,
  GetTweetsByUserIdParameters,
  TweetRepositoryInterface,
} from '../../../twitter-record-tweet/domain/repository-interfaces';

import { GetFlatChildTreeOfCommentsByRecordIdSqlQueryResult } from './twitter-record.repository-type';

@Injectable()
export class TwitterRecordRepository
  implements
    InterfaceValidator<TwitterRecordRepository, CommentRepositoryInterface & RetweetRepositoryInterface & TweetRepositoryInterface>
{
  constructor(private readonly prismaClient: PrismaTwitterClient) {}

  public async addComment({
    commentedRecordAuthorId,
    commentedRecordId,
    createdAt,
    images,
    updatedAt,
    userId,
  }: AddCommentParameters): Promise<CommentDomnainModel> {
    const { authorId, parentRecordAuthorId, parentRecordId, twitterRecordImages, ...rest } =
      await this.prismaClient.twitterRecords.create({
        data: {
          authorId: userId,
          createdAt,
          isComment: true,
          parentRecordAuthorId: commentedRecordAuthorId,
          parentRecordId: commentedRecordId,
          twitterRecordImages: { createMany: { data: images } },
          updatedAt,
        },
        include: { twitterRecordImages: true },
      });

    return {
      ...rest,
      commentedRecordAuthorId: parentRecordAuthorId,
      commentedRecordId: parentRecordId,
      images: twitterRecordImages,
      userId: authorId,
    };
  }

  public async addRetweet({
    createdAt,
    retweetedRecordAuthorId,
    retweetedRecordId,
    updatedAt,
    userId,
  }: AddRetweetParameters): Promise<Omit<RetweetDomnainModel, 'retweetedTweet'>> {
    const { authorId, ...rest } = await this.prismaClient.twitterRecords.create({
      data: {
        authorId: userId,
        createdAt,
        isComment: false,
        parentRecordAuthorId: retweetedRecordAuthorId,
        parentRecordId: retweetedRecordId,
        text: null,
        updatedAt,
      },
    });

    return { userId: authorId, ...rest };
  }

  public async addTweet({ createdAt, images, text, updatedAt, userId }: AddTweetParameters): Promise<TweetDomnainModel> {
    const { authorId, twitterRecordImages, ...rest } = await this.prismaClient.twitterRecords.create({
      data: {
        authorId: userId,
        createdAt,
        isComment: false,
        parentRecordAuthorId: null,
        parentRecordId: null,
        text,
        twitterRecordImages: { createMany: { data: images } },
        updatedAt,
      },
      include: { twitterRecordImages: true },
    });

    return { images: twitterRecordImages, userId: authorId, ...rest };
  }

  public async deleteCommentById({ commentId, userId }: DeleteCommentByIdParameters): Promise<void> {
    await this.prismaClient.twitterRecords.deleteMany({ where: { authorId: userId, id: commentId } });
    await this.prismaClient.twitterRecordImages.deleteMany({ where: { recordId: commentId } });
  }

  public async deleteRetweetById({ retweetId, userId }: DeleteRetweetByIdParameters): Promise<void> {
    await this.prismaClient.twitterRecords.deleteMany({ where: { authorId: userId, id: retweetId } });
    await this.prismaClient.twitterRecordImages.deleteMany({ where: { recordId: retweetId } });
  }

  public async deleteTweetById({ tweetId, userId }: DeleteTweetByIdParameters): Promise<void> {
    await this.prismaClient.twitterRecords.deleteMany({ where: { authorId: userId, id: tweetId } });
    await this.prismaClient.twitterRecordImages.deleteMany({ where: { recordId: tweetId } });
  }

  public async getFlatChildTreeOfCommentsByTweetId({
    tweetId,
  }: GetFlatChildTreeOfCommentsByTweetIdParameters): Promise<CommentDomnainModel[]> {
    const flatCommentsTreeOfRecord = await this.prismaClient.$queryRaw<GetFlatChildTreeOfCommentsByRecordIdSqlQueryResult[]>`
      WITH RECURSIVE "childTweets" AS (SELECT *
        FROM "twitterRecords" AS "root"
        WHERE "root"."id" = uuid(${tweetId})
        UNION ALL
        SELECT "child".*
        FROM "childTweets" AS "parent",
            "twitterRecords" AS "child"
        WHERE "child"."parentRecordId" = parent.id
          AND "child"."isComment" IS TRUE)
      SELECT 
        "childTweets"."authorId"             AS "userId",
        "childTweets"."createdAt"            AS "createdAt",
        "childTweets"."id"                   AS "id",
        "childTweets"."parentRecordAuthorId" AS "commentedRecordAuthorId",
        "childTweets"."parentRecordId"       AS "commentedRecordId",
        "childTweets"."text"                 AS "text",
        "childTweets"."updatedAt"            AS "updatedAt",
        "twitterRecordImages"."id"           AS "twitterRecordImageId",
        "twitterRecordImages"."key"          AS "twitterRecordImageKey",
        "twitterRecordImages"."url"          AS "twitterRecordImageUrl"
      FROM "childTweets"
        LEFT JOIN "twitterRecordImages" ON "twitterRecordImages"."recordId" = "childTweets"."id"
      ORDER BY "childTweets"."createdAt" ASC;
    `;

    return compressRowsByIdentifier(
      flatCommentsTreeOfRecord,
      [
        { column: 'twitterRecordImageKey', columnAs: 'key', compressTo: 'images' },
        { column: 'twitterRecordImageUrl', columnAs: 'url', compressTo: 'images' },
        { column: 'twitterRecordImageId', columnAs: 'id', compressTo: 'images' },
      ],
      'id',
    );
  }

  public async getRetweetsByUserId({ userId }: GetRetweetsByUserIdParameters): Promise<RetweetDomnainModel[]> {
    const retweets = await this.prismaClient.twitterRecords.findMany({
      include: {
        twitterRecords: {
          include: { twitterRecordImages: true },
        },
      },
      where: { authorId: userId, isComment: false, parentRecordId: { not: null } },
    });

    return retweets.map((retweet) => {
      const { authorId, createdAt, id, twitterRecords: retweetedTweet, updatedAt } = retweet;
      const retweetedTweetImages = retweetedTweet.twitterRecordImages.map(({ id, key, url }) => ({ id, key, url }));

      return {
        createdAt,
        id,
        retweetedTweet: {
          createdAt: retweetedTweet.createdAt,
          id: retweetedTweet.id,
          images: retweetedTweetImages,
          text: retweet.text,
          updatedAt: retweetedTweet.updatedAt,
          userId: retweetedTweet.authorId,
        },
        updatedAt,
        userId: authorId,
      };
    });
  }

  public async getTweetsByUserId({ userId }: GetTweetsByUserIdParameters): Promise<TweetDomnainModel[]> {
    const tweets = await this.prismaClient.twitterRecords.findMany({
      include: { twitterRecordImages: true },
      where: { authorId: userId, parentRecordId: null },
    });

    return tweets.map((tweet) => {
      const { authorId, createdAt, id, text, twitterRecordImages, updatedAt } = tweet;
      const images = twitterRecordImages.map(({ id, key, url }) => ({ id, key, url }));

      return {
        createdAt,
        id,
        images,
        text,
        updatedAt,
        userId: authorId,
      };
    });
  }
}
