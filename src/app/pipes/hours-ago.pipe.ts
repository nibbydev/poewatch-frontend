import {Pipe, PipeTransform} from '@angular/core';
import {DateUtil} from '../shared/utility/date-util';

@Pipe({
  name: 'hoursAgo'
})
export class HoursAgoPipe implements PipeTransform {

  transform(value: string): string {
    const now = DateUtil.roundToHours(new Date()).getTime();
    const val = new Date(value).getTime();
    const res = Math.round((now - val) / 3600000);
    return res + (res === 1 ? ' hour' : ' hours') + ' ago';
  }

}
