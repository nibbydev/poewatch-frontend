import {Component, OnInit} from '@angular/core';
import {StatsService} from '../../services/stats.service';
import {Stat} from '../../shared/api/stat';
import {first} from 'rxjs/operators';
import {ChartExtra, ChartResult, ChartSeries, StatDefinition} from '../../shared/chart-result';
import {DateUtil, DateUtilFunc} from '../../shared/utility/date-util';

@Component({
  selector: 'pw-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent implements OnInit {
  private readonly historySize = 128;
  private readonly statDefinitionGroups = [
    {
      id: 'group_1',
      members: [
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
      ],
      results: []
    },
    {
      id: 'group_2',
      members: [
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
      ],
      results: []
    },
    {
      id: 'group_3',
      members: [
        {
          id: 'COUNT_API_CALLS',
          display: 'API calls',
          description: 'Nr of stash API calls per hour',
          unit: null,
          color: '#ff7474'
        }
      ],
      results: []
    },
    {
      id: 'group_4',
      members: [
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
      ],
      results: []
    },
    {
      id: 'group_5',
      members: [
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
          color: '#ff90b6'
        },
        {
          id: 'TIME_API_TTFB',
          display: 'TTFB',
          description: 'Stash API reply TTFB in milliseconds',
          unit: 'ms',
          color: '#fca1ff'
        }
      ],
      results: []
    }
  ] as {
    id: string,
    members: StatDefinition[],
    results: ChartResult[]
  }[];

  constructor(private statsService: StatsService) {
  }

  ngOnInit() {
    this.statsService.makeRequest().pipe(first()).subscribe(stats => {
      const statGroups = this.groupStats(stats);

      const min = DateUtil.getNHoursAgo(this.historySize).toISOString();
      const max = new Date().toISOString();

      const expected = DateUtil.fillDates(min, max, d => d.setHours(d.getHours() + 1), DateUtilFunc.floorToHours);
      if (expected.length !== this.historySize) {
        throw new Error('Why the fuck isn\'t it equal');
      }

      statGroups.forEach(sg => {
        sg.stats = this.fillNa(sg.stats, expected);
      });

      this.statDefinitionGroups.forEach(sdg => {
        sdg.results = sdg.members.map(member => {
          const matchingStats = statGroups.find(g => g.id === member.id);
          return this.toResult(member, matchingStats.stats);
        });
      });

    });
  }


  private groupStats(stats: Stat[]): StatGrouping[] {
    const output = [] as StatGrouping[];

    for (const definition of this.flattenDefinitions()) {
      const filteredStats = stats.filter(s => s.type === definition.id);

      output.push({
        id: definition.id,
        stats: filteredStats
      });
    }

    return output;
  }

  private fillNa(stats: Stat[], expected: string[]): Stat[] {
    // presume everything is as should be
    if (stats.length === this.historySize) {
      return stats;
    }

    const output = [] as Stat[];

    let statIndex = 0;
    for (const exp of expected) {
      const stat = stats[statIndex];

      if (stat && new Date(stat.time).getTime() === new Date(exp).getTime()) {
        output.push(stat);
        statIndex++;
      } else {
        output.push({
          type: undefined,
          time: exp,
          value: 0
        } as Stat);
      }
    }

    return output;
  }

  private toResult(definition: StatDefinition, stats: Stat[]): ChartResult {
    const convertedSeries = stats.map(s => {
      return {
        name: new Date(s.time).toISOString(),
        value: s.value,
        extra: {
          sequence: undefined,
          color: definition.color
        } as ChartExtra
      } as ChartSeries;
    });

    return {
      name: definition.display,
      series: convertedSeries,
      color: definition.color
    } as ChartResult;
  }

  private flattenDefinitions(): StatDefinition[] {
    return this.statDefinitionGroups
      .map(g => g.members)
      .reduce((acc, val) => acc.concat(val), []);
  }

}

class StatGrouping {
  id: string;
  stats: Stat[];
}
