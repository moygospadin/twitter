import crypto from 'crypto';

export class HashService {
  private readonly salt: string;

  constructor() {
    this.salt = crypto.randomBytes(16).toString('hex');
  }

  public async compare(password: string, hashedPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [hashedPasswordSalt, key] = hashedPassword.split(':');

      return crypto.scrypt(password, hashedPasswordSalt, 64, (error, derivedKey) => {
        if (error) {
          reject(error);

          return;
        }

        return resolve(key == derivedKey.toString('hex'));
      });
    });
  }

  public async hash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      return crypto.scrypt(password, this.salt, 64, (error, derivedKey) => {
        if (error) {
          reject(error);

          return;
        }

        return resolve(this.salt + ':' + derivedKey.toString('hex'));
      });
    });
  }
}
