import { useMemo, useState } from "react";
import { Header, Seg, Thumb, Banner, ExerciseSheet } from "./ui.jsx";
import { buildSession, guidance, weekIndex, weekSessions } from "../lib/plan.js";
import { doseText, tagLabel } from "../data/exercises.js";

const sameDay = (a, b) => new Date(a).toDateString() === new Date(b).toDateString();

export default function Today({ state, onLog, type, setType }) {
  const now = new Date();
  const [overrides, setOverrides] = useState({});
  const plan = useMemo(() => buildSession(type, state, now, overrides), [type, state, overrides]); // eslint-disable-line
  const [ticks, setTicks] = useState({});
  const [landings, setLandings] = useState(null);
  const [pain, setPain] = useState(null);
  const [open, setOpen] = useState(null);
  const [again, setAgain] = useState(false);

  const where = state.profile.where;
  const week = weekIndex(state, now) + 1;
  const thisWeek = weekSessions(state, now).length;
  const loggedToday = state.sessions.find((s) => s.type === type && sameDay(s.date, now));
  const tip = guidance(state);
  const doneCount = plan.filter((s) => ticks[s.pick.id]).length;
  const canSave = doneCount > 0 && landings && pain;

  const save = () => {
    onLog({
      id: Date.now().toString(36),
      date: new Date().toISOString(),
      type,
      done: plan.filter((s) => ticks[s.pick.id]).map((s) => s.pick.id),
      landings, pain,
    });
    setTicks({}); setLandings(null); setPain(null); setOverrides({}); setAgain(false);
  };

  const switchType = (t) => { setType(t); setTicks({}); setOverrides({}); setAgain(false); };

  return (
    <>
      <Header title="Today" left={<span className="chip">Week {week}</span>}
        right={<span className="chip">{thisWeek} of {state.profile.freq} this week</span>}>
        {where === "both" && (
          <Seg value={type} onChange={switchType} label="Session type" options={[["run", "Before a run"], ["leg", "Leg day"]]} />
        )}
      </Header>

      {loggedToday && !again ? (
        <main className="content">
          <div className="card done-hero">
            <div className="big" aria-hidden="true" />
            <div className="t1" style={{ fontSize: 19 }}>Logged. Nice work.</div>
            <p className="t2" style={{ fontSize: 15 }}>
              {thisWeek >= state.profile.freq ? "That's your sessions for this week." : `${state.profile.freq - thisWeek} more this week when you're ready.`}
            </p>
          </div>
          <p className="small center mt">Leave at least 48 hours before your next plyo session.</p>
          <div className="center mt"><button type="button" className="linkbtn" onClick={() => setAgain(true)}>Log another session</button></div>
        </main>
      ) : (
        <>
          <main className="content with-dock">
            {tip && <Banner tone={tip.tone} title={tip.title}>{tip.text}</Banner>}
            <div className="sect">{type === "run" ? "About 10 minutes, before you head out" : "About 12 minutes, before you lift"}</div>
            <div className="card">
              {plan.map((s) => (
                <div className="row" key={s.job}>
                  <button type="button" className="rowbtn" onClick={() => setOpen(s)}>
                    <Thumb />
                    <span className="txt">
                      <span className="nm" style={{ display: "block" }}>{s.pick.name}</span>
                      <span className="meta" style={{ display: "block" }}>
                        <span className="dose">{doseText(s.pick)}</span>{s.job}
                        {s.reason && <span className="why">{tagLabel(s.reason)} is due</span>}
                      </span>
                    </span>
                  </button>
                  <button type="button" className="check" aria-pressed={!!ticks[s.pick.id]} aria-label={`Done: ${s.pick.name}`}
                    onClick={() => setTicks((t) => ({ ...t, [s.pick.id]: !t[s.pick.id] }))} />
                </div>
              ))}
            </div>
            <p className="small" style={{ margin: "8px 4px 0" }}>Tap an exercise for how to do it, a demo, or to swap it.</p>

            <div className="sect">Quick check-in</div>
            <div className="card">
              <div className="ci"><b>Landings</b><Seg light value={landings} onChange={setLandings} label="Landings"
                options={[["quiet", "Quiet"], ["okay", "Okay"], ["loud", "Loud"]]} /></div>
              <div className="ci"><b>Any pain</b><Seg light value={pain} onChange={setPain} label="Pain"
                options={[["none", "None"], ["little", "A little"], ["yes", "Yes"]]} /></div>
            </div>
          </main>
          <div className="dock">
            <button type="button" className="btn" disabled={!canSave} onClick={save}>
              {doneCount === 0 ? "Tick what you did" : !landings || !pain ? "Answer the check-in" : `Save session (${doneCount} of ${plan.length})`}
            </button>
          </div>
        </>
      )}

      {open && (
        <ExerciseSheet ex={open.pick} onClose={() => setOpen(null)} footer={
          open.options.length > 1 && (
            <>
              <div className="sect">Swap for today</div>
              <div className="swaps">
                {open.options.map((o) => (
                  <button key={o.id} type="button" className={o.id === open.pick.id ? "on" : ""}
                    onClick={() => { setOverrides((x) => ({ ...x, [open.job]: o.id })); setOpen(null); }}>{o.name}</button>
                ))}
              </div>
            </>
          )
        } />
      )}
    </>
  );
}
