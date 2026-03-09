import { describe, expect, it } from "vitest";
import { Podcast } from "../src/Podcast";

describe("Podcast", () => {
  it("expone correctamente sus datos y duración en un caso válido", () => {
    const podcast = new Podcast(
      "TechTalk",
      12,
      "Tecnología",
      "Ana",
      new Date("2026-03-01T10:00:00.000Z"),
      new Date("2026-03-01T10:45:00.000Z"),
    );

    expect(podcast.programName).toBe("TechTalk");
    expect(podcast.episodeNumber).toBe(12);
    expect(podcast.theme).toBe("Tecnología");
    expect(podcast.hostName).toBe("Ana");
    expect(podcast.data()).toEqual({
      programName: "TechTalk",
      episodeNumber: 12,
    });
    expect(podcast.duration()).toBe(2700);
  });

  it("lanza error cuando programName, theme u hostName son vacíos", () => {
    const podcastWithEmptyProgram = new Podcast(
      "   ",
      1,
      "Tecnología",
      "Ana",
      new Date("2026-03-01T10:00:00.000Z"),
      new Date("2026-03-01T10:30:00.000Z"),
    );
    const podcastWithEmptyTheme = new Podcast(
      "TechTalk",
      1,
      "",
      "Ana",
      new Date("2026-03-01T10:00:00.000Z"),
      new Date("2026-03-01T10:30:00.000Z"),
    );
    const podcastWithEmptyHost = new Podcast(
      "TechTalk",
      1,
      "Tecnología",
      "   ",
      new Date("2026-03-01T10:00:00.000Z"),
      new Date("2026-03-01T10:30:00.000Z"),
    );

    expect(() => podcastWithEmptyProgram.programName).toThrow(
      "Podcast program name cannot be empty",
    );
    expect(() => podcastWithEmptyTheme.theme).toThrow(
      "Podcast theme cannot be empty",
    );
    expect(() => podcastWithEmptyHost.hostName).toThrow(
      "Podcast host name cannot be empty",
    );
  });

  it("lanza error cuando episodeNumber no es entero positivo", () => {
    const podcastWithZeroEpisode = new Podcast(
      "TechTalk",
      0,
      "Tecnología",
      "Ana",
      new Date("2026-03-01T10:00:00.000Z"),
      new Date("2026-03-01T10:30:00.000Z"),
    );
    const podcastWithDecimalEpisode = new Podcast(
      "TechTalk",
      2.5,
      "Tecnología",
      "Ana",
      new Date("2026-03-01T10:00:00.000Z"),
      new Date("2026-03-01T10:30:00.000Z"),
    );

    expect(() => podcastWithZeroEpisode.episodeNumber).toThrow(
      "Podcast episode number must be a positive integer",
    );
    expect(() => podcastWithDecimalEpisode.episodeNumber).toThrow(
      "Podcast episode number must be a positive integer",
    );
  });

  it("lanza error cuando startDate o endDate no son fechas válidas", () => {
    const invalidDate = new Date("invalid-date");

    const podcastWithInvalidStart = new Podcast(
      "TechTalk",
      1,
      "Tecnología",
      "Ana",
      invalidDate,
      new Date("2026-03-01T10:30:00.000Z"),
    );

    const podcastWithInvalidEnd = new Podcast(
      "TechTalk",
      1,
      "Tecnología",
      "Ana",
      new Date("2026-03-01T10:00:00.000Z"),
      invalidDate,
    );

    expect(() => podcastWithInvalidStart.startDate).toThrow(
      "Podcast start date must be a valid Date",
    );
    expect(() => podcastWithInvalidEnd.endDate).toThrow(
      "Podcast end date must be a valid Date",
    );
  });

  it("lanza error cuando la fecha de fin es anterior a la de inicio", () => {
    const podcast = new Podcast(
      "TechTalk",
      1,
      "Tecnología",
      "Ana",
      new Date("2026-03-01T11:00:00.000Z"),
      new Date("2026-03-01T10:00:00.000Z"),
    );

    expect(() => podcast.duration()).toThrow(
      "Podcast end date must be greater than or equal to start date",
    );
  });
});
