import { Header, Ring } from "./ui.jsx";
import { Chev } from "./Icons.jsx";
import { coverage, moveUpStatus, SESSIONS_TO_MOVE_UP } from "../lib/plan.js";
import { JOBS, DIRS, LEGS, BY_ID } from "../data/exercises.js";

const LABEL = { Two: "Two feet", One: "One leg", Alternating: "Alternating" };

export default function Progress({ state, onMoveUp }) {
  const now = new Date();
  const cov = coverage(state, now);
  const jobs = state.profile.where === "run" ? JOBS.filter((j) => j !== "Power") : JOBS;
  const recent = [...state.sessions].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5);
  const readyJob = jobs.find((j) => moveUpStatus(j, state, now).ready);

  return (
    <>
      <Header title="Progress" right={<span className="chip">Last 6 weeks</span>}
        subtitle={readyJob ? `${readyJob} is ready to move up` : state.sessions.length ? "Keep going. Each job moves up on its own." : "Log your first session to start tracking."}>
        <div className="rings">
          {jobs.map((j) => {
            const m = moveUpStatus(j, state, now);
            return (
              <button type="button" key={j} className="ringcard" onClick={() => onMoveUp(j)} aria-label={`${j}, level ${m.level}`}>
                <Ring value={m.maxed ? SESSIONS_TO_MOVE_UP : m.count} />
                <span>
                  <span className="t1" style={{ display: "flex", alignItems: "center", gap: 6 }}>{j}<span className="lvl" style={{ fontSize: 11, padding: "1px 6px" }}>L{m.level}</span></span>
                  <span className={`t2 ${m.ready ? "ready" : ""}`} style={{ display: "block" }}>
                    {m.maxed ? "Top level" : m.ready ? "Ready" : `${Math.min(m.count, SESSIONS_TO_MOVE_UP)} of ${SESSIONS_TO_MOVE_UP} sessions`}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Header>
      <main className="content" style={{ paddingBottom: 100 }}>
        <div className="sect">What you've covered</div>
        <div className="card">
          <div className="hm" role="table" aria-label="Coverage by week">
            <span />
            {cov.cols.map((w) => <span key={w} className="h">{w >= 0 ? `W${w + 1}` : ""}</span>)}
            {[["Job", jobs], ["Direction", DIRS], ["Legs", LEGS]].map(([g, list]) => (
              <Group key={g} name={g} list={list} cov={cov} />
            ))}
          </div>
          <div className="legend">
            <span><i style={{ background: "#2C6AA6" }} />Done</span>
            <span><i style={{ background: "#EEF3F7" }} />Not that week</span>
            <span><i style={{ background: "#fff", boxShadow: "inset 0 0 0 2px #E2574C" }} />Due, 4 weeks without</span>
          </div>
        </div>

        <div className="sect">Recent sessions</div>
        {recent.length ? (
          <div className="card">
            {recent.map((s) => (
              <div className="hist" key={s.id}>
                <span>
                  {new Date(s.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })} · {s.type === "run" ? "Before a run" : "Leg day"}
                  <small>{s.done.map((id) => BY_ID[id]?.name).filter(Boolean).join(", ")}</small>
                </span>
                <span className="small">{s.pain === "yes" ? "Pain" : s.landings === "loud" ? "Loud" : "Good"}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="card empty"><div className="t1">No sessions yet</div><p className="t2">Your history shows up here after you save a session on Today.</p></div>
        )}
      </main>
    </>
  );
}

function Group({ name, list, cov }) {
  return (
    <>
      <span className="g">{name}</span>
      {list.map((t) => {
        const isDue = cov.due.includes(t);
        return (
          <Row key={t} label={LABEL[t] || t} cells={cov.rows[t]} due={isDue} />
        );
      })}
    </>
  );
}

function Row({ label, cells, due }) {
  return (
    <>
      <span className={`lbl ${due ? "due" : ""}`}>{label}</span>
      {cells.map((d, i) => (
        <i key={i} className={d ? "d" : due && i === cells.length - 1 ? "u" : ""} />
      ))}
    </>
  );
}
