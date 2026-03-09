import { describe, expect, it } from "vitest";
import { Song } from "../src/Cancion";

describe("Song", () => {
  it("expone correctamente sus propiedades y datos en un caso válido", () => {
    const song = new Song( "Bohemian Rhapsody", "Queen", "Rock", "A Night at the Opera", 354);

    expect(song.title).toBe("Bohemian Rhapsody");
    expect(song.artist).toBe("Queen");
    expect(song.genre).toBe("Rock");
    expect(song.album).toBe("A Night at the Opera");
    expect(song.data()).toBe("Bohemian Rhapsody - Queen");
    expect(song.duration()).toBe(354);
  });

  it("lanza error cuando título, artista, género o álbum son vacíos", () => {
    const songWithEmptyTitle = new Song("   ", "Queen", "Rock", "A Night", 200);
    const songWithEmptyArtist = new Song("Song", "", "Rock", "A Night", 200);
    const songWithEmptyGenre = new Song("Song", "Queen", "   ", "A Night", 200);
    const songWithEmptyAlbum = new Song("Song", "Queen", "Rock", "", 200);

    expect(() => songWithEmptyTitle.title).toThrow(
      "Song title cannot be empty",
    );
    expect(() => songWithEmptyArtist.artist).toThrow(
      "Song artist cannot be empty",
    );
    expect(() => songWithEmptyGenre.genre).toThrow(
      "Song genre cannot be empty",
    );
    expect(() => songWithEmptyAlbum.album).toThrow(
      "Song album cannot be empty",
    );
  });

  it("lanza error cuando la duración no es válida", () => {
    const songWithZeroDuration = new Song(
      "Song",
      "Queen",
      "Rock",
      "A Night",
      0,
    );
    const songWithNegativeDuration = new Song(
      "Song",
      "Queen",
      "Rock",
      "A Night",
      -10,
    );
    const songWithInvalidDuration = new Song(
      "Song",
      "Queen",
      "Rock",
      "A Night",
      Number.NaN,
    );

    expect(() => songWithZeroDuration.duration()).toThrow(
      "Song duration must be greater than 0 seconds",
    );
    expect(() => songWithNegativeDuration.duration()).toThrow(
      "Song duration must be greater than 0 seconds",
    );
    expect(() => songWithInvalidDuration.duration()).toThrow(
      "Song duration must be greater than 0 seconds",
    );
  });
});
