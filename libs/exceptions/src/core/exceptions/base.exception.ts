import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  protected readonly context: string;
  protected readonly description: string;
  protected readonly serializedName: string;

  constructor(serializedName: string, status: number, context: string, description: string) {
    super('', status);

    this.context = context;
    this.description = description;
    this.serializedName = serializedName;
  }

  public getContext(): string {
    return this.context;
  }

  public getDescription(): string {
    return this.description;
  }

  public getSerializedName(): string {
    return this.serializedName;
  }
}
