import { convertReadStreamToBuffer } from '@jebulday/aws';
import { Injectable, PipeTransform } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';

import { MaxFileSizeExceededException, MimeTypeIsNotAllowedException } from '../../core/exceptions';

interface FileUploadValidationPipeOptions {
  allowedMimeTypes?: string[];
  maxFileSize?: number;
}

@Injectable()
export class FileUploadValidationPipe implements PipeTransform {
  private readonly allowedMimeTypes: string[];
  private readonly fileUploadValidationPipeErrorContext = 'File upload validation pipe';
  private readonly maxFileSize: number;

  constructor(options?: FileUploadValidationPipeOptions) {
    this.allowedMimeTypes = options?.allowedMimeTypes;
    this.maxFileSize = options?.maxFileSize;
  }

  private async validateFileLength(value: FileUpload): Promise<void> {
    if (!this.maxFileSize) {
      return;
    }

    const readStream = value.createReadStream();
    const buffer = await convertReadStreamToBuffer(readStream);

    if (buffer.byteLength > this.maxFileSize) {
      throw new MaxFileSizeExceededException(this.fileUploadValidationPipeErrorContext);
    }
  }

  private validateMimeType(value: FileUpload): void {
    if (!this.allowedMimeTypes) {
      return;
    }

    const { mimetype } = value;

    if (!this.allowedMimeTypes.includes(mimetype)) {
      throw new MimeTypeIsNotAllowedException(this.fileUploadValidationPipeErrorContext);
    }
  }

  public async transform(value: FileUpload) {
    if (!value) {
      return value;
    }

    this.validateMimeType(value);

    await this.validateFileLength(value);

    return value;
  }
}
