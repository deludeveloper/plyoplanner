import { useState } from "react";
import { Header, Seg, Sheet, ExerciseSheet } from "./ui.jsx";
import { Chev } from "./Icons.jsx";
import { EXERCISES, JOBS } from "../data/exercises.js";
import { JOB_INFO, HOW_IT_WORKS, ABOUT, SOURCES } from "../data/content.js";

const FILTERS = [["all", "All"], ["Side", "Side"], ["Rotate", "Rotate"], ["One", "One leg"], ["none", "No equipment"]];

function Sources({ ids, onOpen }) {
  if (!ids?.length) return null;
  return (
    <p className="srcs">Sources:{ids.map((n) => <button key={n} type="button" onClick={() => onOpen(n)}>[{n}]</button>)}</p>
  );
}

export default function Learn() {
  const [job, setJob] = useState("Landing");
  const [f, setF] = useState("all");
  const [open, setOpen] = useState(null);
  const [src, setSrc] = useState(null);
  const [showLib, setShowLib] = useState(false);
  const count = EXERCISES.filter((e) => e.job === job).length;
  const info = JOB_INFO[job];
  const list = EXERCISES.filter((e) => e.job === job && (
    f === "all" || (f === "One" ? e.legs === "One" : f === "none" ? !e.equip : e.dir === f)
  ));

  return (
    <>
      <Header title="Learn">
        <Seg value={job} onChange={(v) => { setJob(v); setF("all"); }} label="Job" options={JOBS.map((j) => [j, j])} />
      </Header>
      <main className="content" style={{ paddingBottom: 100 }}>
        <div className="card pad prose">
          <div className="t1" style={{ fontSize: 17, marginBottom: 6 }}>{job}</div>
          {info.long.map((p, i) => <p key={i}>{p}</p>)}
          <Sources ids={info.sources} onOpen={setSrc} />
          <button type="button" className="btn sec mt" onClick={() => { setF("all"); setShowLib(true); }}>
            See all {count} {job.toLowerCase()} exercises
          </button>
        </div>

        <div className="sect">How it works</div>
        <div className="card">
          {HOW_IT_WORKS.map((h) => (
            <details className="faq" key={h.q}>
              <summary>{h.q}<Chev /></summary>
              <div className="ans prose"><p>{h.a}</p><Sources ids={h.sources} onOpen={setSrc} /></div>
            </details>
          ))}
        </div>

        <div className="sect">Why I made this</div>
        <div className="card pad prose">{ABOUT.map((p, i) => <p key={i}>{p}</p>)}</div>

        <div className="sect">Sources</div>
        <div className="card">
          {Object.entries(SOURCES).map(([n, s]) => (
            <div className="ref" key={n} id={`src-${n}`}><b>{n}</b><span>{s.cite} <a href={s.url} target="_blank" rel="noopener noreferrer">{s.url}</a></span></div>
          ))}
        </div>
        <p className="small center" style={{ margin: "18px 10px 0" }}>General guidance, not medical advice. It doesn't replace a coach or a clinician.</p>
      </main>

      {showLib && !open && (
        <Sheet onClose={() => setShowLib(false)} label={`${job} exercises`}>
          <h3>{job} exercises</h3>
            <div className="pills">
          {FILTERS.map(([k, t]) => <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(k)}>{t}</button>)}
        </div>
        {list.length ? (
          <div className="card">
            {[1, 2, 3].map((lv) => list.filter((e) => e.level === lv).map((e) => (
              <button type="button" className="row" key={e.id} onClick={() => setOpen(e)}>
                <span className="thumb" aria-hidden="true"><i /><i /></span>
                <span className="txt">
                  <span className="nm" style={{ display: "block", fontSize: 15 }}>{e.name}</span>
                  <span className="tags">
                    <span>Level {e.level}</span>
                    <span className={e.dir === "Rotate" ? "rot" : ""}>{e.dir}</span>
                    {e.legs === "One" && <span>One leg</span>}
                    {e.equip && <span>{e.equip}</span>}
                  </span>
                </span>
                <Chev />
              </button>
            )))}
          </div>
        ) : (
          <div className="card empty"><p className="t2">No {job.toLowerCase()} exercises match that filter.</p></div>
        )}

        </Sheet>
      )}
      {open && <ExerciseSheet ex={open} onClose={() => setOpen(null)} />}
      {src && (
        <Sheet onClose={() => setSrc(null)} label="Source">
          <h3>Source {src}</h3>
          <p className="t2" style={{ fontSize: 15, marginTop: 8 }}>{SOURCES[src].cite}</p>
          <a className="btn sec mt" style={{ textDecoration: "none" }} href={SOURCES[src].url} target="_blank" rel="noopener noreferrer">Open the source</a>
        </Sheet>
      )}
    </>
  );
}
