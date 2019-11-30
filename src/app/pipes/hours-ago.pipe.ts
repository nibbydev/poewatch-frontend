import {Pipe, PipeTransform} from '@angular/core';
import {DateUtilConst, DateUtilFunc} from '../shared/utility/date-util';

@Pipe({
  name: 'hoursAgo'
})
export class HoursAgoPipe implements PipeTransform {

  transform(value: string): string {
    const now = DateUtilFunc.roundToHours(new Date()).getTime();
    const val = new Date(value).getTime();
    const res = Math.round((now - val) / DateUtilConst.msInHour);
    return res + (res === 1 ? ' hour' : ' hours') + ' ago';
  }

}
