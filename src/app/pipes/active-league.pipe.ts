import {Pipe, PipeTransform} from '@angular/core';
import {League} from '../shared/league';

@Pipe({
  name: 'activeLeague'
})
export class ActiveLeaguePipe implements PipeTransform {

  transform(league: League, args?: any): string {
    return (league.active ? '' : '● ') + (league.display || league.name);
  }

}
