import crypto from 'crypto';

export class UniqueIdGeneratorService {
  public generateIdContaining16Bytes() {
    return crypto.randomBytes(16).toString('hex');
  }

  public async generateIdContaining6Chars(): Promise<string> {
    return new Promise((resolve) => {
      crypto.randomBytes(3, (_, buffer) => {
        const id = parseInt(buffer.toString('hex'), 16).toString().slice(0, 6);

        resolve(id);
      });
    });
  }
}
