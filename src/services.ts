export class Month {
  monthIndex: number;

  fullYear: number;

  workingDays: number;

  constructor(monthIndex: number, fullYear: number, workingDays: number = 21) {
    this.monthIndex = monthIndex;
    this.fullYear = fullYear;
    this.workingDays = workingDays;
  }

  toString(): string {
    const longMonth = new Date(this.fullYear, this.monthIndex).toLocaleString(
      'default',
      { month: 'long' }
    );
    return `${longMonth} ${this.fullYear}`;
  }
}

const scrappedData = [
  [8, 23, 21],
  [9, 23, 22],
  [10, 23, 21],
  [11, 23, 18],
  [0, 24, 20],
  [1, 24, 21],
  [2, 24, 21],
  [3, 24, 22],
  [4, 24, 20],
  [5, 24, 19],
  [6, 24, 23],
  [7, 24, 21],
  [8, 24, 21],
  [9, 24, 23],
  [10, 24, 21],
  [11, 24, 20],
];

export const monthsData = scrappedData.map(
  x => new Month(x[0], 2000 + x[1], x[2])
);
