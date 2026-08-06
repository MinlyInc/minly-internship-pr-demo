# mmdb-screenings

A tiny library for cinema screenings. Three functions and their tests.

```bash
npm install
npm test
```

| Function | What it does |
|---|---|
| `available(screening)` | How many seats are still free |
| `isSoldOut(screening)` | Whether there is anything left to book |
| `upcoming(list, now)` | Screenings that have not started yet, earliest first |
