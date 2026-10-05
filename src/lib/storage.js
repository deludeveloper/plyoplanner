// Saves everything in this browser. Google Drive sync comes in phase 2.
const KEY = "plyometric-planner.v1";

export const emptyState = () => ({
  version: 1,
  profile: null,
  startedAt: null,
  levels: { Landing: 1, Springs: 1, Power: 1, Reactive: 1 },
  levelSince: {},
  singleLeg: false,
  hop: null,
  sessions: [],
});

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyState();
    return { ...emptyState(), ...JSON.parse(raw) };
  } catch {
    return emptyState();
  }
}

export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function downloadBackup(state) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `plyometric-planner-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function readBackup(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      try {
        const data = JSON.parse(r.result);
        if (!data || data.version !== 1 || !Array.isArray(data.sessions)) throw new Error("bad");
        resolve({ ...emptyState(), ...data });
      } catch {
        reject(new Error("That file isn't a Plyometric Planner backup."));
      }
    };
    r.onerror = () => reject(new Error("Couldn't read that file."));
    r.readAsText(file);
  });
}
