import { Component, Input, OnInit } from '@angular/core';
import { League } from '../../../shared/api/league';

@Component({
  selector: 'app-leagues-element',
  templateUrl: './leagues-element.component.html',
  styleUrls: ['./leagues-element.component.css']
})
export class LeaguesElementComponent implements OnInit {
  @Input() league: League;

  constructor() {
  }

  ngOnInit() {
  }

  public progressPercentage(l: League): number {
    const now = new Date().getTime();
    const startTime = new Date(l.start).getTime();
    const endTime = new Date(l.end).getTime();
    return Math.round(startTime < now ? (now - startTime) / (endTime - startTime) * 100 : 0);
  }

  public calcTime(timeStamp: string): TimeElem[] {
    if (!timeStamp) {
      return null;
    }

    const time = new Date(timeStamp).getTime();
    const now = new Date().getTime();
    const msDiff = Math.abs(time - now);

    const s = 1000;
    const m = s * 60;
    const h = m * 60;
    const d = h * 24;

    const output = [
      {
        val: Math.floor(msDiff / d),
        class: 'subtext-0',
        id: 'd'
      },
      {
        val: Math.floor((msDiff % d) / h),
        class: 'subtext-0',
        id: 'h'
      },
      {
        val: Math.floor((msDiff % h) / m),
        class: 'subtext-0',
        id: 'm'
      },
      {
        val: Math.floor((msDiff % m) / s),
        class: 'subtext-0',
        id: 's'
      },
    ] as TimeElem[];

    if (!output[0].val) {
      output[0].class = 'subtext-1';
    } else if (output[0].val === 1) {
      output[0].class = 'custom-text-orange';
    }

    if (!output[0].val) {
      if (!output[0].val) {
        output[1].class = 'subtext-1';
      } else if (output[0].val === 1) {
        output[1].class = 'custom-text-orange';
      } else {
        output[1].class = 'custom-text-red';
      }
    }

    if (!output[0].val && !output[1].val) {
      if (output[2].val === 0) {
        output[2].class = 'subtext-1';
      } else if (output[2].val === 1) {
        output[2].class = 'custom-text-orange';
      } else {
        output[2].class = 'custom-text-red';
      }
    }

    if (!output[0].val && !output[1].val && !output[2].val) {
      if (output[3].val === 0) {
        output[3].class = 'subtext-1';
      } else if (output[3].val === 1) {
        output[3].class = 'custom-text-orange';
      } else {
        output[3].class = 'custom-text-red';
      }
    }

    return output;
  }
}

class TimeElem {
  val: number;
  class: string;
  id: string;
}
