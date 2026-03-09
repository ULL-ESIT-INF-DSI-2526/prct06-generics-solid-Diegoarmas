import { describe, expect, it } from "vitest";
import { Song } from "../src/Cancion";
import { History } from "../src/History";
import { Podcast } from "../src/Podcast";

describe("History", () => {
  it("permite almacenar Song y Podcast en el mismo historial", () => {
    const history = new History<Song | Podcast>();
    const song = new Song("Song A", "Artist A", "Pop", "Album A", 120);
    
    const podcast = new Podcast(
      "TechTalk",
      3,
      "Tecnología",
      "Ana",
      new Date("2026-03-01T10:00:00.000Z"),
      new Date("2026-03-01T10:30:00.000Z"),
    );

    history.add(song);
    history.add(podcast);

    expect(history.size()).toBe(2);
    expect(history.get(0)).toBe(song);
    expect(history.get(1)).toBe(podcast);
  });

  it("elimina un elemento por índice", () => {
    const history = new History<Song>();
    const song1 = new Song("Song 1", "Artist 1", "Rock", "Album 1", 100);
    const song2 = new Song("Song 2", "Artist 2", "Jazz", "Album 2", 140);

    history.add(song1);
    history.add(song2);
    history.remove(0);

    expect(history.size()).toBe(1);
    expect(history.get(0)).toBe(song2);
  });

  it("filtra elementos y retorna un nuevo History", () => {
    const history = new History<Song>();
    const shortSong = new Song("Short", "Artist", "Pop", "Album", 90);
    const longSong = new Song("Long", "Artist", "Pop", "Album", 210);

    history.add(shortSong);
    history.add(longSong);

    const filtered = history.filter((song) => song.duration() > 120);

    expect(filtered).toBeInstanceOf(History);
    expect(filtered.size()).toBe(1);
    expect(filtered.get(0)).toBe(longSong);
    expect(history.size()).toBe(2);
  });

  it("calcula la duración total sumando todos los elementos", () => {
    const history = new History<Song | Podcast>();
    const song = new Song("Song A", "Artist A", "Pop", "Album A", 120);
    const podcast = new Podcast(
      "TechTalk",
      7,
      "Tecnología",
      "Ana",
      new Date("2026-03-01T10:00:00.000Z"),
      new Date("2026-03-01T10:30:00.000Z"),
    );

    history.add(song);
    history.add(podcast);

    expect(history.duration()).toBe(120 + 1800);
  });

  it("lanza error cuando se usa un índice fuera de rango o no entero", () => {
    const history = new History<Song>();
    const song = new Song("Song", "Artist", "Pop", "Album", 100);
    history.add(song);

    expect(() => history.get(-1)).toThrow("History index out of range");
    expect(() => history.get(2)).toThrow("History index out of range");
    expect(() => history.remove(1.5)).toThrow("History index out of range");
    expect(() => history.remove(1)).toThrow("History index out of range");
  });
});
