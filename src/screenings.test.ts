import { describe, expect, it } from "vitest";
import { available, isSoldOut, upcoming } from "./screenings.ts";
import type { Screening } from "./types.ts";

function screening(overrides: Partial<Screening> = {}): Screening {
  return {
    id: 1,
    film: "Arrival",
    startsAt: "2026-08-09T19:30:00Z",
    seats: 100,
    booked: 40,
    ...overrides,
  };
}

describe("available", () => {
  it("subtracts the bookings from the seats", () => {
    expect(available(screening({ seats: 100, booked: 40 }))).toBe(60);
  });
});

describe("isSoldOut", () => {
  it("is true when every seat is booked", () => {
    expect(isSoldOut(screening({ seats: 50, booked: 50 }))).toBe(true);
  });

  it("is false when seats remain", () => {
    expect(isSoldOut(screening({ seats: 50, booked: 49 }))).toBe(false);
  });
});

describe("upcoming", () => {
  it("drops screenings that have already started", () => {
    const list = [
      screening({ id: 1, startsAt: "2026-08-09T10:00:00Z" }),
      screening({ id: 2, startsAt: "2026-08-09T20:00:00Z" }),
    ];
    expect(upcoming(list, "2026-08-09T12:00:00Z").map((s) => s.id)).toEqual([2]);
  });

  it("returns them earliest first", () => {
    const list = [
      screening({ id: 1, startsAt: "2026-08-09T21:00:00Z" }),
      screening({ id: 2, startsAt: "2026-08-09T18:00:00Z" }),
    ];
    expect(upcoming(list, "2026-08-09T12:00:00Z").map((s) => s.id)).toEqual([2, 1]);
  });
});
