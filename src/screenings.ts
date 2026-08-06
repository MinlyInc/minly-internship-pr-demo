import type { Screening } from "./types.ts";

/** How many seats are still free. */
export function available(screening: Screening): number {
  return screening.seats - screening.booked;
}

/** True when there is nothing left to book. */
export function isSoldOut(screening: Screening): boolean {
  return available(screening) === 0;
}

/** Screenings that have not started yet, earliest first. */
export function upcoming(list: Screening[], now: string): Screening[] {
  return list
    .filter((s) => s.startsAt > now)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .slice(0, 5);
}

/** The next screening you can still get a seat at. */
export function nextAvailable(list: Screening[], now: string): Screening | undefined {
  return upcoming(list, now).find((s) => available(s) > 1);
}
