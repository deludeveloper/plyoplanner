import { EXERCISES, BY_ID, JOBS, DIRS, LEGS } from "../data/exercises.js";

const DAY = 86400000;
export const DUE_DAYS = 28;
export const SESSIONS_TO_MOVE_UP = 6;

export const SLOTS = {
  run: ["Springs", "Reactive", "Landing"],
  leg: ["Landing", "Power", "Reactive"],
};

export const START_LEVELS = {
  new: { Landing: 1, Springs: 1, Power: 1, Reactive: 1 },
  months: { Landing: 2, Springs: 2, Power: 1, Reactive: 1 },
  year: { Landing: 2, Springs: 2, Power: 2, Reactive: 2 },
};

export const tagsOf = (e) => [e.job, e.dir, e.legs];

const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

export function weekIndex(state, now = new Date()) {
  if (!state.startedAt) return 0;
  return Math.max(0, Math.floor((startOfDay(now) - startOfDay(state.startedAt)) / (7 * DAY)));
}

function hasEquip(e, state) {
  return !e.equip || (state.profile?.equip || []).includes(e.equip);
}

// Single-leg work at level 3 waits for the hop test.
function allowed(e, state) {
  if (!hasEquip(e, state)) return false;
  if (e.level === 3 && e.legs === "One" && !state.singleLeg) return false;
  return true;
}

export function candidates(job, level, state) {
  for (let l = level; l >= 1; l--) {
    const list = EXERCISES.filter((e) => e.job === job && e.level === l && allowed(e, state));
    if (list.length) return list;
  }
  return [];
}

// Three options that spread across directions and leg types.
export function optionsFor(job, level, state) {
  const pool = candidates(job, level, state);
  const picked = [];
  const seenDir = new Set();
  const seenLegs = new Set();
  const score = (e) => (seenDir.has(e.dir) ? 0 : 2) + (seenLegs.has(e.legs) ? 0 : 1);
  while (picked.length < 3 && picked.length < pool.length) {
    const rest = pool.filter((e) => !picked.includes(e));
    rest.sort((a, b) => score(b) - score(a));
    const next = rest[0];
    picked.push(next);
    seenDir.add(next.dir);
    seenLegs.add(next.legs);
  }
  return picked;
}

export function lastDoneByTag(state) {
  const last = {};
  for (const s of state.sessions) {
    for (const id of s.done) {
      const e = BY_ID[id];
      if (!e) continue;
      for (const t of tagsOf(e)) {
        if (!last[t] || s.date > last[t]) last[t] = s.date;
      }
    }
  }
  return last;
}

// A tag is due when it hasn't been done for 4 weeks. Only tags the person can do count.
export function dueTags(state, now = new Date()) {
  if (!state.sessions.length) return [];
  const first = state.sessions.reduce((m, s) => (s.date < m ? s.date : m), state.sessions[0].date);
  const last = lastDoneByTag(state);
  const possible = new Set();
  for (const e of EXERCISES) if (allowed(e, state) && e.level <= Math.max(...Object.values(state.levels))) tagsOf(e).forEach((t) => possible.add(t));
  const due = [];
  for (const t of [...JOBS, ...DIRS, ...LEGS]) {
    if (!possible.has(t)) continue;
    if (t === "Power" && state.profile?.where === "run") continue;
    const ref = last[t] || first;
    if ((now - new Date(ref)) / DAY >= DUE_DAYS) due.push(t);
  }
  return due;
}

export function buildSession(type, state, now = new Date(), overrides = {}) {
  const week = weekIndex(state, now);
  const due = dueTags(state, now);
  const used = new Set();
  const steered = new Set();
  return SLOTS[type].map((job, i) => {
    const level = state.levels[job];
    const options = optionsFor(job, level, state);
    if (!options.length) return null;
    let pick = options[(week + i) % options.length];
    let reason = null;
    const open = due.filter((t) => !steered.has(t));
    const covering = options.find((o) => !used.has(o.id) && (open.includes(o.dir) || open.includes(o.legs)));
    if (covering) {
      pick = covering;
      reason = open.includes(covering.dir) ? covering.dir : covering.legs;
      steered.add(reason);
    }
    if (overrides[job] && options.some((o) => o.id === overrides[job])) {
      pick = BY_ID[overrides[job]];
      reason = null;
    }
    used.add(pick.id);
    return { job, level: options[0].level, options, pick, reason };
  }).filter(Boolean);
}

export function sessionsAtLevel(job, state) {
  const since = state.levelSince[job] || state.startedAt || "";
  return state.sessions.filter((s) => s.date >= since && s.done.some((id) => BY_ID[id]?.job === job));
}

export function moveUpStatus(job, state, now = new Date()) {
  const at = sessionsAtLevel(job, state);
  const level = state.levels[job];
  const due = dueTags(state, now);
  return {
    level,
    count: at.length,
    maxed: level >= 3,
    enoughSessions: at.length >= SESSIONS_TO_MOVE_UP,
    covered: due.length === 0,
    noPain: !at.some((s) => s.pain === "yes"),
    ready: level < 3 && at.length >= SESSIONS_TO_MOVE_UP,
  };
}

// Coverage grid: last 6 weeks, columns oldest to newest.
export function coverage(state, now = new Date(), weeks = 6) {
  const cur = weekIndex(state, now);
  const cols = [];
  for (let w = cur - weeks + 1; w <= cur; w++) cols.push(w);
  const rows = {};
  for (const t of [...JOBS, ...DIRS, ...LEGS]) rows[t] = cols.map(() => false);
  for (const s of state.sessions) {
    const w = weekIndex(state, new Date(s.date));
    const ci = cols.indexOf(w);
    if (ci < 0) continue;
    for (const id of s.done) {
      const e = BY_ID[id];
      if (e) tagsOf(e).forEach((t) => (rows[t][ci] = true));
    }
  }
  return { cols, rows, due: dueTags(state, now) };
}

export function weekSessions(state, now = new Date()) {
  const w = weekIndex(state, now);
  return state.sessions.filter((s) => weekIndex(state, new Date(s.date)) === w);
}

// Gentle guidance based on the last couple of check-ins.
export function guidance(state) {
  const recent = [...state.sessions].sort((a, b) => (a.date < b.date ? 1 : -1));
  const last = recent[0];
  if (!last) return null;
  if (last.pain === "yes") {
    return { tone: "warn", title: "Take a few days off jumping", text: "You logged pain last time. Rest from plyometrics, and if it changes how you walk or run, get it checked before you start again." };
  }
  if (recent.length >= 2 && recent[0].landings === "loud" && recent[1].landings === "loud") {
    return { tone: "warn", title: "Stay at this level for now", text: "Your last two sessions had loud landings. Slow down, aim for quiet, soft landings, and drop a set if you need to." };
  }
  if (last.pain === "little") {
    return { tone: "info", title: "Go easy today", text: "You noted a little pain last time. Keep the same level, and stop if it comes back." };
  }
  return null;
}

export const hopRatio = (l, r) => (l > 0 && r > 0 ? Math.min(l, r) / Math.max(l, r) : 0);
