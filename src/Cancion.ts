import { Reproducible } from "./Reproducible";

/**
 * Clase que representa una canción, implementando la interfaz Reproducible para proporcionar sus datos y duración.
 * La clase valida que el título, artista, género y álbum no sean vacíos, y que la duración sea un número positivo.
 * Implementa los métodos data() y duration() de la interfaz Reproducible, devolviendo el título y artista como datos, y la duración en segundos.
 * @implements {Reproducible<string>}
 * @method data Devuelve una cadena con el formato "Título - Artista".
 * @method duration Devuelve la duración de la canción en segundos.
 * @throws {Error} Si el título, artista, género o álbum son vacíos, o si la duración no es un número positivo.
 */

export class Song implements Reproducible<string> {
  private readonly title_: string;
  private readonly artist_: string;
  private readonly genre_: string;
  private readonly album_: string;
  private readonly durationInSeconds_: number;

  constructor(
    title: string,
    artist: string,
    genre: string,
    album: string,
    durationInSeconds: number,
  ) {
    this.title_ = title;
    this.artist_ = artist;
    this.genre_ = genre;
    this.album_ = album;
    this.durationInSeconds_ = durationInSeconds;
  }

  public get title(): string {
    if (this.title_.trim().length === 0) {
      throw new Error("Song title cannot be empty");
    }
    return this.title_;
  }

  public get artist(): string {
    if (this.artist_.trim().length === 0) {
      throw new Error("Song artist cannot be empty");
    }
    return this.artist_;
  }

  public get genre(): string {
    if (this.genre_.trim().length === 0) {
      throw new Error("Song genre cannot be empty");
    }
    return this.genre_;
  }

  public get album(): string {
    if (this.album_.trim().length === 0) {
      throw new Error("Song album cannot be empty");
    }
    return this.album_;
  }

  public data(): string {
    return `${this.title} - ${this.artist}`;
  }

  public duration(): number {
    if (
      !Number.isFinite(this.durationInSeconds_) ||
      this.durationInSeconds_ <= 0
    ) {
      throw new Error("Song duration must be greater than 0 seconds");
    }
    return this.durationInSeconds_;
  }
}
