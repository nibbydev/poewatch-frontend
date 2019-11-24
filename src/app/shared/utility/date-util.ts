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
}
