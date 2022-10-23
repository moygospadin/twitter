import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

@Injectable()
export class TimeService {
  public addDays(date: Date, days: number): Date {
    return new Date(date.setUTCDate(date.getUTCDate() + days));
  }

  public addMilliseconds(date: Date, milliseconds: number): Date {
    return new Date(date.setUTCMilliseconds(milliseconds));
  }

  public isAfter(first: Date, second: Date): boolean {
    return first.getTime() > second.getTime();
  }

  public isBefore(first: Date, second: Date): boolean {
    return first.getTime() < second.getTime();
  }

  public async now() {
    return dayjs.utc().format();
  }
}
