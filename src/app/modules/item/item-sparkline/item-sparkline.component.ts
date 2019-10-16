import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-sparkline',
  templateUrl: './item-sparkline.component.html',
  styleUrls: ['./item-sparkline.component.css']
})
export class ItemSparklineComponent implements OnInit {
  @Input() history: number[];
  @Input() private options = {
    width: 60,
    height: 30,
    yPad: 2,
    radius: 0.2
  };

  constructor() {
  }

  ngOnInit() {
  }

  private genPath(): string {
    const elements = this.formatSparkData();
    const path = this.buildPath(elements);
    return this.roundPathCorners(path);
  }

  /**
   * Convert an item's this.history of prices to a list of percentage differences
   */
  private formatSparkData(): number[] {
    // If there is no this.history (eg old getLeagues)
    if (!this.history) {
      return null;
    }

    // Count the number of elements that are not null
    let count = 0;
    for (let i = 0; i < 7; i++) {
      if (this.history[i] !== null) {
        count++;
      }
    }

    // Can't display a sparkline with 1 value
    if (count < 2) {
      return null;
    }

    // Find first price from the left that is not null
    let lastPrice = null;
    for (let i = 0; i < 7; i++) {
      if (this.history[i] !== null) {
        lastPrice = this.history[i];
        break;
      }
    }

    // Calculate each value's change %-relation to current price
    const elements = [];
    for (let i = 0; i < 7; i++) {
      if (this.history[i] > 0) {
        elements[i] = Math.round((1 - (lastPrice / this.history[i])) * 100);
      } else {
        elements[i] = null;
      }
    }

    return elements;
  }

  /**
   * Build a SVG path based on given list of elements
   */
  private buildPath(elements: number[]): string {
    if (!elements) {
      return '';
    }

    let pointBuilder = 'M ';

    // Find step sizes in pixels
    const stepX = this.options.width / 6;
    const stepY = (this.options.height - this.options.yPad * 2) / 100;

    const min = Math.min(...elements);
    const max = Math.max(...elements);

    for (let i = 0; i < 7; i++) {
      const x = Math.floor(i * stepX);
      let y = this.options.height - Math.floor((elements[i] - min) / (max - min) * 100 * stepY) - this.options.yPad;

      if (isNaN(y)) {
        y = 5;
      }

      pointBuilder += x + ' ' + y + ' L ';
    }

    // Remove trailing character and return
    return pointBuilder.substring(0, pointBuilder.length - 2);
  }

  /**
   * Round an SVG path
   */
  private roundPathCorners(pathString: string): string {
    if (!this.options.radius) {
      return pathString;
    }

    function moveTowardsFractional(movingPoint, targetPoint, fraction) {
      return {
        x: parseFloat(movingPoint.x + (targetPoint.x - movingPoint.x) * fraction).toFixed(3),
        y: parseFloat(movingPoint.y + (targetPoint.y - movingPoint.y) * fraction).toFixed(3)
      };
    }

    // Adjusts the ending position of a command
    function adjustCommand(cmd, newPoint) {
      if (cmd.length > 2) {
        cmd[cmd.length - 2] = newPoint.x;
        cmd[cmd.length - 1] = newPoint.y;
      }
    }

    // Gives an {x, y} object for a command's ending position
    function pointForCommand(cmd) {
      return {
        x: parseFloat(cmd[cmd.length - 2]),
        y: parseFloat(cmd[cmd.length - 1]),
      };
    }

    // Split apart the path, handing concatenated letters and numbers
    const pathParts = pathString
      .split(/[,\s]/)
      .reduce((parts, part) => {
        const match = part.match('([a-zA-Z])(.+)');
        if (match) {
          parts.push(match[1]);
          parts.push(match[2]);
        } else {
          parts.push(part);
        }

        return parts;
      }, []);

    // Group the commands with their arguments for easier handling
    const commands = pathParts.reduce((commands2, part) => {
      if (parseFloat(part) === part && commands2.length) {
        commands2[commands2.length - 1].push(part);
      } else {
        commands2.push([part]);
      }

      return commands2;
    }, []);

    // The resulting commands, also grouped
    let resultCommands = [];

    if (commands.length > 1) {
      const startPoint = pointForCommand(commands[0]);

      // Handle the close path case with a "virtual" closing line
      let virtualCloseLine = null;
      if (commands[commands.length - 1][0] === 'Z' && commands[0].length > 2) {
        virtualCloseLine = ['L', startPoint.x, startPoint.y];
        commands[commands.length - 1] = virtualCloseLine;
      }

      // We always use the first command (but it may be mutated)
      resultCommands.push(commands[0]);

      for (let cmdIndex = 1; cmdIndex < commands.length; cmdIndex++) {
        const prevCmd = resultCommands[resultCommands.length - 1];

        const curCmd = commands[cmdIndex];

        // Handle closing case
        const nextCmd = (curCmd === virtualCloseLine)
          ? commands[1]
          : commands[cmdIndex + 1];

        // Nasty logic to decide if this path is a candidite.
        if (nextCmd && prevCmd && (prevCmd.length > 2) && curCmd[0] === 'L' && nextCmd.length > 2 && nextCmd[0] === 'L') {
          // Calc the points we're dealing with
          const prevPoint = pointForCommand(prevCmd);
          const curPoint = pointForCommand(curCmd);
          const nextPoint = pointForCommand(nextCmd);

          // The start and end of the cuve are just our point moved towards the previous and next points, respectivly
          const curveStart = moveTowardsFractional(curPoint, prevCmd.origPoint || prevPoint, this.options.radius);
          const curveEnd = moveTowardsFractional(curPoint, nextCmd.origPoint || nextPoint, this.options.radius);

          // Adjust the current command and add it
          adjustCommand(curCmd, curveStart);
          curCmd.origPoint = curPoint;
          resultCommands.push(curCmd);

          // The curve control points are halfway between the start/end of the curve and
          // the original point
          const startControl = moveTowardsFractional(curveStart, curPoint, .5);
          const endControl = moveTowardsFractional(curPoint, curveEnd, .5);

          // Create the curve
          const curveCmd = ['C', startControl.x, startControl.y, endControl.x, endControl.y, curveEnd.x, curveEnd.y];
          // Save the original point for fractional calculations
          // @ts-ignore
          curveCmd.origPoint = curPoint;
          resultCommands.push(curveCmd);
        } else {
          // Pass through commands that don't qualify
          resultCommands.push(curCmd);
        }
      }

      // Fix up the starting point and restore the close path if the path was orignally closed
      if (virtualCloseLine) {
        const newStartPoint = pointForCommand(resultCommands[resultCommands.length - 1]);
        resultCommands.push(['Z']);
        adjustCommand(resultCommands[0], newStartPoint);
      }
    } else {
      resultCommands = commands;
    }

    return resultCommands.reduce((str, c) => {
      return str + c.join(' ') + ' ';
    }, '');
  }
}
