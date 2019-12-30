import { Component, OnInit } from '@angular/core';
import { DateUtil } from '../../utility/date-util';

@Component({
  selector: 'pw-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {

  public readonly difficulties = ['uber', 'merciless', 'cruel', 'normal'];
  public images = [] as Image[];
  public readonly now = new Date();
  public readonly yesterday = DateUtil.incDate(this.now, -1);
  private readonly urlTemplate = 'https://www.poelab.com/wp-content/labfiles/{{yyyy}}-{{mm}}-{{dd}}_{{difficulty}}.jpg';

  constructor() {
  }

  ngOnInit(): void {
    this.peek(this.now);
  }

  public error(event: Event, image: Image): void {
    // first attempt
    if (image.date === this.now) {
      this.peek(this.yesterday);
      return;
    }

    if (image.date === this.yesterday) {
      this.images = [];
    }
  }

  public load(event: Event, image: Image): void {
    image.isLoaded = {};

    if (image.isPeek) {
      this.loadRest(image.date);
    }
  }

  public getDateColorClass(image: Image) {
    return {
      'custom-text-green': image.date === this.now,
      'custom-text-red': image.date !== this.now
    };
  }

  private buildUrl(difficulty: string, date: Date): string {
    const y = date.getFullYear().toString();
    const m = (date.getMonth() + 1 <= 9 ? '0' : '') + (date.getMonth() + 1);
    const d = (date.getDate() <= 9 ? '0' : '') + date.getDate();

    return this.urlTemplate
      .replace(/{{yyyy}}/g, y)
      .replace(/{{mm}}/g, m)
      .replace(/{{dd}}/g, d)
      .replace(/{{difficulty}}/g, difficulty);
  }

  private peek(date: Date): void {
    this.images = [{
      date,
      difficulty: this.difficulties[0],
      devUrl: this.buildUrl(this.difficulties[0], date),
      isPeek: true
    } as Image];
  }

  private loadRest(date: Date): void {
    for (const difficulty of this.difficulties) {
      if (this.images.some(i => i.difficulty === difficulty)) {
        continue;
      }

      this.images.push({
        date,
        difficulty,
        devUrl: this.buildUrl(difficulty, date),
        isPeek: false
      } as Image);
    }
  }

}

class Image {
  date: Date;
  difficulty: string;
  devUrl: string;
  isPeek: boolean;
  isLoaded: object | null;
}
