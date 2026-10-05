# Plyometric Planner

A simple, evidence-based plyometric routine builder for runners who also lift.

Answer a few questions and get a short routine for before your runs, your leg days, or both. Each slot has three interchangeable exercises that rotate weekly. Log a session in a few taps, see what you've covered on a week-by-week chart, and get told when each part of your training is ready to move up.

## What's in it

- **Four jobs:** Landing, Springs, Power and Reactive, with 59 exercises tagged by level, direction and legs.
- **Routine:** before-a-run and leg-day sessions with weekly rotation. Picks lean toward anything you haven't done in 4 weeks.
- **Today:** tick what you did, a quick check-in on landings and pain, and save.
- **Progress:** coverage chart over 6 weeks, plus each job's progress toward moving up.
- **Move up check:** 6 sessions at your level, everything covered, no pain, and your own check on landing quality. Optional hop test unlocks the hardest single-leg drills.
- **Learn:** plain-language explanations, the full library, how it works, and sources.
- **Saving:** on this device for now, with backup download and restore. Google Drive sync is the next phase.

## Run it locally

```bash
npm install
npm run dev
```

## Publish on GitHub Pages

1. Push this folder to a GitHub repo named `plyoplanner`, on a branch called `main`.
2. In the repo, open **Settings**, then **Pages**, and under **Build and deployment** set **Source** to **GitHub Actions**.
3. Every push to `main` builds and publishes the site. The address appears under Settings, then Pages, usually `https://<your-username>.github.io/plyoplanner/`.

## Project layout

- `src/data/exercises.js`: the exercise library. Add or edit exercises here.
- `src/data/content.js`: Learn tab text and sources.
- `src/lib/plan.js`: routine building, rotation, due items, coverage and move-up rules.
- `src/lib/storage.js`: saving, backup and restore.
- `src/components/`: one file per screen.
- `src/styles.css`: the Sky design.

## Notes

- Exercise photos are placeholders. Demo buttons open YouTube.
- General guidance, not medical advice.
