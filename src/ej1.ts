export type Affiliation = 'República' | 'Imperio' | 'Sith' | 'Independiente';

export interface IdentifiableByName {
  name: string;
}

export interface SearchByName<T> {
  findByName(name: string): T[];
}

export interface SearchByAffiliation<T> {
  findByAffiliation(affiliation: Affiliation): T[];
}

export interface SearchByPowerLevel<T> {
  findByPowerLevel(powerLevel: number): T[];
}

export interface SearchByClass<T> {
  findByClass(className: string): T[];
}

export interface SearchByYear<T> {
  findByYear(year: number): T[];
}

export interface SearchByOriginPlanet<T> {
  findByOriginPlanet(originPlanet: string): T[];
}

export interface CollectionCrud<T> {
  readonly collectionName: string;
  add(item: T): void;
  removeByName(name: string): boolean;
  getAll(): readonly T[];
  count(): number;
}

export interface GalacticRegistry<T>
  extends CollectionCrud<T>,
    SearchByName<T>,
    SearchByAffiliation<T>,
    SearchByPowerLevel<T>,
    SearchByClass<T>,
    SearchByYear<T>,
    SearchByOriginPlanet<T> {}

export abstract class BasicGalacticCollection<T extends IdentifiableByName>
  implements GalacticRegistry<T>
{
  protected readonly items: T[] = [];

  constructor(public readonly collectionName: string) {}

  public add(item: T): void {
    this.items.push(item);
  }

  public removeByName(name: string): boolean {
    const initialSize = this.items.length;
    const normalizedName = this.normalize(name);

    const remainingItems = this.items.filter(
      (item) => this.normalize(item.name) !== normalizedName,
    );

    if (remainingItems.length === initialSize) {
      return false;
    }

    this.items.length = 0;
    this.items.push(...remainingItems);
    return true;
  }

  public getAll(): readonly T[] {
    return [...this.items];
  }

  public count(): number {
    return this.items.length;
  }

  public findByName(name: string): T[] {
    const normalizedName = this.normalize(name);
    return this.items.filter((item) =>
      this.normalize(item.name).includes(normalizedName),
    );
  }

  public findByAffiliation(affiliation: Affiliation): T[] {
    return this.items.filter(
      (item) => this.getAffiliation(item) === affiliation,
    );
  }

  public findByPowerLevel(powerLevel: number): T[] {
    return this.items.filter((item) => this.getPowerLevel(item) === powerLevel);
  }

  public findByClass(className: string): T[] {
    const normalizedClassName = this.normalize(className);
    return this.items.filter(
      (item) => this.normalize(this.getClassName(item)) === normalizedClassName,
    );
  }

  public findByYear(year: number): T[] {
    return this.items.filter((item) => this.getRelevantYear(item) === year);
  }

  public findByOriginPlanet(originPlanet: string): T[] {
    const normalizedOriginPlanet = this.normalize(originPlanet);
    return this.items.filter(
      (item) => this.normalize(this.getOriginPlanet(item)) === normalizedOriginPlanet,
    );
  }

  protected normalize(value: string): string {
    return value.trim().toLowerCase();
  }

  protected abstract getAffiliation(item: T): Affiliation;
  protected abstract getPowerLevel(item: T): number;
  protected abstract getClassName(item: T): string;
  protected abstract getRelevantYear(item: T): number;
  protected abstract getOriginPlanet(item: T): string;
}

export interface JediMaster extends IdentifiableByName {
  affiliation: Affiliation;
  powerLevel: number;
  jediClass: string;
  formationYear: number;
  originPlanet: string;
}

export class JediMasterCollection extends BasicGalacticCollection<JediMaster> {
  constructor() {
    super('JediMasterCollection');
  }

  protected getAffiliation(item: JediMaster): Affiliation {
    return item.affiliation;
  }

  protected getPowerLevel(item: JediMaster): number {
    return item.powerLevel;
  }

  protected getClassName(item: JediMaster): string {
    return item.jediClass;
  }

  protected getRelevantYear(item: JediMaster): number {
    return item.formationYear;
  }

  protected getOriginPlanet(item: JediMaster): string {
    return item.originPlanet;
  }
}

export interface Starship extends IdentifiableByName {
  affiliation: Affiliation;
  powerLevel: number;
  starshipClass: string;
  constructionYear: number;
  originPlanet: string;
}

export class StarshipCollection extends BasicGalacticCollection<Starship> {
  constructor() {
    super('StarshipCollection');
  }

  protected getAffiliation(item: Starship): Affiliation {
    return item.affiliation;
  }

  protected getPowerLevel(item: Starship): number {
    return item.powerLevel;
  }

  protected getClassName(item: Starship): string {
    return item.starshipClass;
  }

  protected getRelevantYear(item: Starship): number {
    return item.constructionYear;
  }

  protected getOriginPlanet(item: Starship): string {
    return item.originPlanet;
  }
}

export interface Holocron extends IdentifiableByName {
  affiliation: Affiliation;
  powerLevel: number;
  holocronClass: string;
  creationYear: number;
  originPlanet: string;
}

export class HolocronCollection extends BasicGalacticCollection<Holocron> {
  constructor() {
    super('HolocronCollection');
  }

  protected getAffiliation(item: Holocron): Affiliation {
    return item.affiliation;
  }

  protected getPowerLevel(item: Holocron): number {
    return item.powerLevel;
  }

  protected getClassName(item: Holocron): string {
    return item.holocronClass;
  }

  protected getRelevantYear(item: Holocron): number {
    return item.creationYear;
  }

  protected getOriginPlanet(item: Holocron): string {
    return item.originPlanet;
  }
}