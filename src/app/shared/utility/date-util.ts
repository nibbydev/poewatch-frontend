export const DateUtilConst = {
  msInDay: 86400000,
  msInHour: 3600000
};

export class DateUtil {

  public static incDate(date: Date, amount: number = 1): Date {
    const newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + amount);
    return newDate;
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

}

export const DateUtilFunc = {
  roundToHours(date: Date): Date {
    return new Date(Math.round(date.getTime() / DateUtilConst.msInHour) * DateUtilConst.msInHour);
  },
  floorToHours(date: Date): Date {
    return new Date(Math.floor(date.getTime() / DateUtilConst.msInHour) * DateUtilConst.msInHour);
  },
  roundToDays(date: Date): Date {
    return new Date(Math.round(date.getTime() / DateUtilConst.msInDay) * DateUtilConst.msInDay);
  },
  floorToDays(date: Date): Date {
    return new Date(Math.floor(date.getTime() / DateUtilConst.msInDay) * DateUtilConst.msInDay);
  }
};
