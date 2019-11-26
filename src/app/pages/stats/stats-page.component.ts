import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../services/stats.service';
import { Stat } from '../../shared/api/stat';
import { first } from 'rxjs/operators';
import { ChartExtra, ChartResult, ChartSeries, StatDefinition } from '../../shared/chart-result';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent implements OnInit {
  private readonly statDescriptions = [
    [
      {
        id: 'COUNT_TOTAL_ITEMS',
        display: 'Total items',
        description: 'Total nr of items listed per hour',
        unit: null,
        color: '#a8f5ff'
      },
      {
        id: 'COUNT_ACCEPTED_ITEMS',
        display: 'Accepted items',
        description: 'Nr of items listed per hour that have been accepted for price calculation',
        unit: null,
        color: '#a5ffe0'
      },
      {
        id: 'COUNT_REPLY_SIZE',
        display: 'API reply size',
        description: 'Stash API reply size in bytes',
        unit: null,
        color: '#a3adff'
      }
    ], [
      {
        id: 'COUNT_TOTAL_STASHES',
        display: 'Total stashes',
        description: 'Total nr of stashes found in the past one hour',
        unit: null,
        color: '#ffab90'
      }, {
        id: 'COUNT_ACTIVE_ACCOUNTS',
        display: 'Active accounts',
        description: 'Nr of accounts that have listed something for sale in the past one hour',
        unit: null,
        color: '#ffca8a'
      }
    ], [
      {
        id: 'COUNT_API_CALLS',
        display: 'API calls',
        description: 'Nr of stash API calls per hour',
        unit: null,
        color: '#ff7474'
      }
    ], [
      {
        id: 'COUNT_API_ERRORS_READ_TIMEOUT',
        display: 'Read timeouts',
        description: 'Nr of read timeouts in the past hour',
        unit: null,
        color: '#9aff93'
      },
      {
        id: 'COUNT_API_ERRORS_CONNECT_TIMEOUT',
        display: 'Connect timeouts',
        description: 'Nr of connection timeouts in the past hour',
        unit: null,
        color: '#9bffb0'
      },
      {
        id: 'COUNT_API_ERRORS_CONNECTION_RESET',
        display: 'Connection resets',
        description: 'Nr of reset connections in the past hour',
        unit: null,
        color: '#7effd1'
      },
      {
        id: 'COUNT_API_ERRORS_4XX',
        display: '400 errors',
        description: 'Nr of HTTP 4xx errors in the past hour',
        unit: null,
        color: '#8bfff8'
      },
      {
        id: 'COUNT_API_ERRORS_5XX',
        display: '500 errors',
        description: 'Nr of HTTP 5xx errors in the past hour',
        unit: null,
        color: '#99e6ff'
      },
      {
        id: 'COUNT_API_ERRORS_DUPLICATE',
        display: 'Duplicate requests',
        description: 'Nr of duplicate requests in the past hour (higher means closer to the peak of the river)',
        unit: null,
        color: '#94b6ff'
      }
    ], [
      {
        id: 'TIME_API_REPLY_DOWNLOAD',
        display: 'API download',
        description: 'Stash API reply download time in milliseconds',
        unit: 'ms',
        color: '#ffd58d'
      },
      {
        id: 'TIME_PARSE_REPLY',
        display: 'API process',
        description: 'Stash API reply processing time in milliseconds',
        unit: 'ms',
        color: '#fca1ff'
      },
      {
        id: 'TIME_API_TTFB',
        display: 'TTFB',
        description: 'Stash API reply TTFB in milliseconds',
        unit: 'ms',
        color: '#ff90b6'
      }
    ]
  ] as StatDefinition[][];

  private chartGroups: ChartGroup[];

  constructor(private statsService: StatsService) {
  }

  ngOnInit() {
    this.statsService.makeRequest().pipe(first()).subscribe(s => {
      console.log(s);
      this.chartGroups = this.formatChartData(s);
      console.log(this.chartGroups);
    });
  }

  private formatChartData(stats: Stat[]): ChartGroup[] {
    const output = [] as ChartGroup[];

    for (const statDescGroup of this.statDescriptions) {
      const resultGroup = [];

      for (const statDesc of statDescGroup) {
        const matches = stats.filter(s => s.type === statDesc.id);
        const result = this.toChartResult(statDesc, matches);
        resultGroup.push(result);
      }

      output.push({
        results: resultGroup,
        definitions: statDescGroup
      } as ChartGroup);
    }

    return output;
  }

  private toChartResult(stat: StatDefinition, matches: Stat[]): ChartResult {
    const result = {
      name: stat.display,
      color: stat.color,
      series: [],
    } as ChartResult;

    for (const match of matches) {
      result.series.push({
        name: new Date(match.time),
        value: match.value,
        extra: {} as ChartExtra
      } as ChartSeries);
    }

    return result;
  }

}

class ChartGroup {
  results: ChartResult[];
  definitions: StatDefinition[];
}

/*
export class StatChartResult extends StatDefinition {
  name: string;
  series: ChartSeries[];
  color: string;
}
*/
