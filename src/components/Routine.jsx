import { useMemo, useState } from "react";
import { Header, Seg, Banner, ExerciseSheet } from "./ui.jsx";
import { buildSession, dueTags } from "../lib/plan.js";
import { tagLabel } from "../data/exercises.js";

export default function Routine({ state, type, setType, onSettings }) {
  const now = new Date();
  const plan = useMemo(() => buildSession(type, state, now), [type, state]); // eslint-disable-line
  const due = dueTags(state, now);
  const [open, setOpen] = useState(null);
  const steered = plan.find((s) => s.reason);

  return (
    <>
      <Header title="Routine" right={<button type="button" className="back" onClick={onSettings}>Settings</button>}>
        {state.profile.where === "both" && (
          <Seg value={type} onChange={setType} label="Session type" options={[["run", "Before a run"], ["leg", "Leg day"]]} />
        )}
      </Header>
      <main className="content" style={{ paddingBottom: 100 }}>
        <div className="sect">This week's picks are filled in. They rotate weekly.</div>
        <div className="card">
          {plan.map((s) => (
            <div className="slot" key={s.job}>
              <div className="lab"><b>{s.job}</b><span className="lvl">Level {s.level}</span></div>
              <div className="swaps">
                {s.options.map((o) => (
                  <button key={o.id} type="button" className={o.id === s.pick.id ? "on" : ""} onClick={() => setOpen(o)}>{o.name}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {steered && (
          <Banner tone="warn" title={`${tagLabel(steered.reason)} is due.`}>
            You haven't done that in 4 weeks, so this week's {steered.job.toLowerCase()} pick covers it.
          </Banner>
        )}
        {!steered && due.length > 0 && (
          <Banner tone="info" title="Something is due">Check Progress to see what you haven't covered in 4 weeks.</Banner>
        )}
        <p className="small" style={{ margin: "14px 4px 0" }}>
          Tap any exercise to see how to do it. Each slot's three options do the same job at your level, so any of them is a good pick.
        </p>
      </main>
      {open && <ExerciseSheet ex={open} onClose={() => setOpen(null)} />}
    </>
  );
}
