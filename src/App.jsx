import { useEffect, useState } from "react";
import { load, save, emptyState } from "./lib/storage.js";
import { START_LEVELS, hopRatio } from "./lib/plan.js";
import { SetupForm, SaveScreen } from "./components/Onboarding.jsx";
import Today from "./components/Today.jsx";
import Routine from "./components/Routine.jsx";
import Progress from "./components/Progress.jsx";
import MoveUp from "./components/MoveUp.jsx";
import Learn from "./components/Learn.jsx";
import Settings from "./components/Settings.jsx";
import { IconToday, IconRoutine, IconProgress, IconLearn } from "./components/Icons.jsx";

const TABS = [
  ["today", "Today", IconToday],
  ["routine", "Routine", IconRoutine],
  ["progress", "Progress", IconProgress],
  ["learn", "Learn", IconLearn],
];

export default function App() {
  const [state, setState] = useState(load);
  const [tab, setTab] = useState("today");
  const [view, setView] = useState(null); // overlays: settings, edit, moveup:<job>
  const [draft, setDraft] = useState(null); // setup answers before the save screen
  const [step, setStep] = useState("setup");
  const [type, setType] = useState(() => (load().profile?.where === "leg" ? "leg" : "run"));
  const [toast, setToast] = useState("");

  useEffect(() => { save(state); }, [state]);
  useEffect(() => { window.scrollTo(0, 0); }, [tab, view, step]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const update = (fn) => setState((s) => fn(s));
  const say = (m) => setToast(m);

  // ----- First visit -----
  if (!state.profile) {
    if (step === "save" && draft) {
      return (
        <div className="app">
          <SaveScreen onBack={() => setStep("setup")}
            onStart={() => {
              const now = new Date().toISOString();
              const levels = { ...START_LEVELS[draft.exp] };
              setState({ ...emptyState(), profile: draft, startedAt: now, levels, levelSince: Object.fromEntries(Object.keys(levels).map((j) => [j, now])) });
              setType(draft.where === "leg" ? "leg" : "run");
              setDraft(null);
              setStep("setup");
            }} />
        </div>
      );
    }
    return (
      <div className="app">
        <SetupForm initial={draft} onDone={(p) => { setDraft({ ...p, hurting: false }); setStep("save"); }} />
      </div>
    );
  }

  // ----- Overlay screens -----
  let screen = null;
  let showTabs = true;
  if (view === "settings") {
    screen = (
      <Settings state={state} onBack={() => setView(null)} onEdit={() => setView("edit")}
        onRestore={(data) => setState(data)}
        onReset={() => { setState(emptyState()); setView(null); setTab("today"); setDraft(null); setStep("setup"); }} />
    );
  } else if (view === "edit") {
    showTabs = false;
    screen = (
      <SetupForm editing initial={state.profile} onCancel={() => setView("settings")}
        onDone={(p) => {
          update((s) => ({ ...s, profile: { ...s.profile, ...p, hurting: false } }));
          if (p.where !== "both") setType(p.where === "leg" ? "leg" : "run");
          setView("settings");
          say("Routine updated");
        }} />
    );
  } else if (view?.startsWith("moveup:")) {
    showTabs = false;
    const job = view.split(":")[1];
    screen = (
      <MoveUp job={job} state={state} onBack={() => setView(null)}
        onHop={(l, r) => {
          const ok = hopRatio(l, r) >= 0.9;
          update((s) => ({ ...s, hop: { left: l, right: r, date: new Date().toISOString() }, singleLeg: s.singleLeg || ok }));
          say(ok ? "Single-leg drills unlocked" : "Hop test saved");
        }}
        onConfirm={(j) => {
          update((s) => ({ ...s, levels: { ...s.levels, [j]: Math.min(3, s.levels[j] + 1) }, levelSince: { ...s.levelSince, [j]: new Date().toISOString() } }));
          setView(null);
          say(`${j} moved up a level`);
        }} />
    );
  } else if (tab === "today") {
    screen = <Today state={state} type={type} setType={setType} onLog={(sess) => { update((s) => ({ ...s, sessions: [...s.sessions, sess] })); say("Session saved"); }} />;
  } else if (tab === "routine") {
    screen = <Routine state={state} type={type} setType={setType} onSettings={() => setView("settings")} />;
  } else if (tab === "progress") {
    screen = <Progress state={state} onMoveUp={(j) => setView(`moveup:${j}`)} />;
  } else {
    screen = <Learn />;
  }

  return (
    <div className="app">
      {screen}
      {showTabs && (
        <nav className="tabs" aria-label="Main">
          {TABS.map(([k, label, Icon]) => (
            <button key={k} type="button" className="tab" aria-current={tab === k && !view ? "page" : undefined}
              onClick={() => { setTab(k); setView(null); }}>
              <Icon />{label}
            </button>
          ))}
        </nav>
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
