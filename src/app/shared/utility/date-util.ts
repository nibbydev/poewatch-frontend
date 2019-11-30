export class DateUtil {
  public static incDate(date: Date, amount: number = 1): Date {
    const newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + amount);
    return newDate;
  }

  public static floorDate(date: Date): Date {
    return new Date(date.getTime() - date.getTime() % 86400000);
  }

  public static roundDate(date: Date): Date {
    const floorDate = this.floorDate(date);
    if (date.getTime() % 86400000 < 43200000) {
      return floorDate;
    } else {
      return this.incDate(floorDate);
    }
  }


  public static fillDates(start: string, end: string, inc?: (date: Date) => void, round?: (date: Date) => Date): string[] {
    if (!inc) {
      inc = d => d.setDate(d.getDate() + 1);
    }
    if (!round) {
      round = d => d;
    }

    const output = [];

    let date = round(new Date(start));
    const endDate = round(new Date(end));

    while (date < endDate) {
      output.push(date.toISOString());
      date = new Date(date.getTime());
      inc(date);
    }

    return output;
  }

  public static getNHoursAgo(n: number) {
    const now = new Date();
    now.setHours(now.getHours() - n);
    return now;
  }

  public static roundToHours(date: Date): Date {
    return new Date(Math.round(date.getTime() / 3600000) * 3600000);
  }
}
