const seedData = [
  'Rick Sanchez',
  'Morty Smith',
  'Summer Smith',
  'Vance Maximus',
  'Tammy Gueterman',
  'Rosa Diaz',
  'Gina Linetti',
  'Ray Holt',
  'Charles Boyle',
  'Madelin Wunch',
  'Terry Jeffords',
  'Adrian Pimento',
  'Jim Lahey',
  'Sam Losco',
  'Phil Collins',
  'George Green',
  'Ted Johnson',
  'Charlie Runkle',
  'Abby Rhoads',
  'Lew Ashby',
  'Mia Lewis',
  'Eddie Nero',
];

class RandomName {
  constructor(private name: string, private occurrences: number = 0) {}

  use() {
    this.occurrences += 1;
  }

  getName(): string {
    return this.name;
  }

  getOccurrences(): number {
    return this.occurrences;
  }
}

class Selector {
  private min: number = 0;

  constructor(private collection: RandomName[]) {}

  generate(): RandomName {
    let results: RandomName[] = [];
    do {
      results = this.collection.filter(x => x.getOccurrences() === this.min);
    } while (results.length === 0 && (this.min += 1));

    const random = results[Math.floor(Math.random() * results.length)];
    random.use();
    return random;
  }
}

export const nameGenerator = new Selector(seedData.map(x => new RandomName(x)));
