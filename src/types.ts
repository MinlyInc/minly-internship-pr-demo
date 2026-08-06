/** One showing of one film, at one time. */
export type Screening = {
  id: number;
  film: string;
  /** ISO timestamp, e.g. "2026-08-09T19:30:00Z" */
  startsAt: string;
  seats: number;
  booked: number;
};
