import { convertReadStreamToBuffer } from '@jebulday/aws';
import { Injectable, PipeTransform } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';

import { MaxFileSizeExceededException, MimeTypeIsNotAllowedException } from '../../core/exceptions';

interface FileUploadValidationPipeOptions {
  allowedMimeTypes?: string[];
  maxFileSize?: number;
}

@Injectable()
export class FilesUploadValidationPipe implements PipeTransform {
  private readonly allowedMimeTypes: string[];
  private readonly filesUploadValidationPipeErrorContext = 'File upload validation pipe';
  private readonly maxFileSize: number;

  constructor(options?: FileUploadValidationPipeOptions) {
    this.allowedMimeTypes = options?.allowedMimeTypes;
    this.maxFileSize = options?.maxFileSize;
  }

  private async validateFileLength(values: FileUpload[]): Promise<void> {
    if (!this.maxFileSize) {
      return;
    }

    const readStreams = values.map((_) => _.createReadStream());
    const buffers = await Promise.all(readStreams.map(async (readStream) => convertReadStreamToBuffer(readStream)));

    const buffersSummaryByteLength = buffers.reduce((accumulator, buffer) => accumulator + buffer.byteLength, 0);

    if (buffersSummaryByteLength > this.maxFileSize) {
      throw new MaxFileSizeExceededException(this.filesUploadValidationPipeErrorContext);
    }
  }

  private validateMimeType(values: FileUpload[]): void {
    if (!this.allowedMimeTypes) {
      return;
    }

    const mimetypes = values.reduce((accumulator, value) => {
      const isMimetypeExistInAccumulator = accumulator.some((accumulatorMimetype) => value.mimetype === accumulatorMimetype);

      if (isMimetypeExistInAccumulator) {
        return accumulator;
      }

      accumulator.push(value.mimetype);

      return accumulator;
    }, []);

    const isMimetypesNotAllowed = mimetypes.some((mimetype) => {
      return this.allowedMimeTypes.every((allowedMimetype) => mimetype !== allowedMimetype);
    });

    if (isMimetypesNotAllowed) {
      throw new MimeTypeIsNotAllowedException(this.filesUploadValidationPipeErrorContext);
    }
  }

  public async transform(values: FileUpload[]) {
    if (!values) {
      return values;
    }

    this.validateMimeType(values);

    await this.validateFileLength(values);

    return values;
  }
}
