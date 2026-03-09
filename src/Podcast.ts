import { Reproducible } from "./Reproducible";

/**
 * Interfaz que representa los datos de un podcast, incluyendo el nombre del programa y el número de episodio.
 * @interface PodcastData
 * @property {string} programName El nombre del programa del podcast.
 * @property {number} episodeNumber El número de episodio del podcast.
 * @class Podcast
 * Clase que representa un podcast, implementando la interfaz Reproducible para proporcionar sus datos y duración.
 * La clase valida que el nombre del programa, número de episodio, tema, nombre del anfitrión, fecha de inicio y fecha de fin sean válidos.
 * Implementa los métodos data() y duration() de la interfaz Reproducible, devolviendo el nombre del programa y número de episodio como datos, y la duración en segundos.
 * @implements {Reproducible<PodcastData>}
 * @method data Devuelve un objeto con el nombre del programa y número de episodio del podcast.
 * @method duration Devuelve la duración del podcast en segundos calculada a partir de las fechas de inicio y fin.
 * @throws {Error} Si el nombre del programa es vacío, el número de episodio no es un entero positivo, el tema o nombre del anfitrión son vacíos, o si las fechas no son válidas o si la fecha de fin es
 */
export interface PodcastData {
  programName: string;
  episodeNumber: number;
}

export class Podcast implements Reproducible<PodcastData> {
  private readonly programName_: string;
  private readonly episodeNumber_: number;
  private readonly theme_: string;
  private readonly hostName_: string;
  private readonly startDate_: Date;
  private readonly endDate_: Date;

  constructor(
    programName: string,
    episodeNumber: number,
    theme: string,
    hostName: string,
    startDate: Date,
    endDate: Date,
  ) {
    this.programName_ = programName;
    this.episodeNumber_ = episodeNumber;
    this.theme_ = theme;
    this.hostName_ = hostName;
    this.startDate_ = startDate;
    this.endDate_ = endDate;
  }

  public get programName(): string {
    if (this.programName_.trim().length === 0) {
      throw new Error("Podcast program name cannot be empty");
    }
    return this.programName_;
  }

  public get episodeNumber(): number {
    if (!Number.isInteger(this.episodeNumber_) || this.episodeNumber_ <= 0) {
      throw new Error("Podcast episode number must be a positive integer");
    }
    return this.episodeNumber_;
  }

  public get theme(): string {
    if (this.theme_.trim().length === 0) {
      throw new Error("Podcast theme cannot be empty");
    }
    return this.theme_;
  }

  public get hostName(): string {
    if (this.hostName_.trim().length === 0) {
      throw new Error("Podcast host name cannot be empty");
    }
    return this.hostName_;
  }

  public get startDate(): Date {
    if (Number.isNaN(this.startDate_.getTime())) {
      throw new Error("Podcast start date must be a valid Date");
    }
    return this.startDate_;
  }

  public get endDate(): Date {
    if (Number.isNaN(this.endDate_.getTime())) {
      throw new Error("Podcast end date must be a valid Date");
    }
    return this.endDate_;
  }

  public data(): PodcastData {
    return {
      programName: this.programName,
      episodeNumber: this.episodeNumber,
    };
  }

  public duration(): number {
    const diff = this.endDate.getTime() - this.startDate.getTime();
    if (diff < 0) {
      throw new Error(
        "Podcast end date must be greater than or equal to start date",
      );
    }
    return diff / 1000;
  }
}
