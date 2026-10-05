import { useState } from "react";
import { Header, BackButton, Banner } from "./ui.jsx";
import { moveUpStatus, hopRatio, SESSIONS_TO_MOVE_UP, sessionsAtLevel } from "../lib/plan.js";

export default function MoveUp({ job, state, onBack, onConfirm, onHop }) {
  const m = moveUpStatus(job, state);
  const [quiet, setQuiet] = useState(false);
  const [speed, setSpeed] = useState(false);
  const [left, setLeft] = useState(state.hop?.left || "");
  const [right, setRight] = useState(state.hop?.right || "");
  const ratio = hopRatio(Number(left), Number(right));
  const auto = m.enoughSessions && m.covered && m.noPain;
  const can = !m.maxed && auto && quiet && speed;
  const at = sessionsAtLevel(job, state).length;

  return (
    <>
      <Header title={m.maxed ? `${job}: top level` : `Move up ${job}?`}
        subtitle={m.maxed ? "You're at Level 3, the highest level." : `Level ${m.level} to Level ${m.level + 1}`}
        left={<BackButton onClick={onBack} label="Progress" />}
        right={m.ready ? <span className="chip coral">Ready</span> : <span className="chip">{Math.min(at, SESSIONS_TO_MOVE_UP)} of {SESSIONS_TO_MOVE_UP}</span>} />
      <main className="content with-dock">
        {!m.maxed && (
          <>
            <div className="sect">From your log</div>
            <div className="card">
              <div className="tg"><span className={`auto ${m.enoughSessions ? "" : "no"}`} /><span className="tx">{SESSIONS_TO_MOVE_UP} sessions at Level {m.level}<small>{at} so far</small></span></div>
              <div className="tg"><span className={`auto ${m.covered ? "" : "no"}`} /><span className="tx">Every area covered in 4 weeks<small>{m.covered ? "Nothing is due" : "Something is due. See Progress."}</small></span></div>
              <div className="tg"><span className={`auto ${m.noPain ? "" : "no"}`} /><span className="tx">No pain logged at this level</span></div>
            </div>
            <div className="sect">Your call</div>
            <div className="card">
              <button type="button" className="tg" role="switch" aria-checked={quiet} onClick={() => setQuiet(!quiet)}>
                <span className="tx">Landings stay quiet<small>Knees track over your toes</small></span><span className="toggle" data-on={quiet} />
              </button>
              <button type="button" className="tg" role="switch" aria-checked={speed} onClick={() => setSpeed(!speed)}>
                <span className="tx">Reps hold their speed<small>No slowing by the end of a set</small></span><span className="toggle" data-on={speed} />
              </button>
            </div>
          </>
        )}

        <div className="sect">Single-leg unlock{state.singleLeg ? ", done" : ", optional"}</div>
        <div className="card pad">
          <p className="t2" style={{ margin: 0, fontSize: 14 }}>
            Hop as far as you can on one leg, then the other, and measure each. If your shorter hop is at least 90% of your longer one, the hardest single-leg drills unlock. This threshold comes from knee rehab, so treat it as a guide.
          </p>
          <div className="hopgrid">
            <div className="field"><label htmlFor="hl">Left, inches</label><input id="hl" inputMode="decimal" value={left} onChange={(e) => setLeft(e.target.value.replace(/[^\d.]/g, ""))} placeholder="0" /></div>
            <div className="field"><label htmlFor="hr">Right, inches</label><input id="hr" inputMode="decimal" value={right} onChange={(e) => setRight(e.target.value.replace(/[^\d.]/g, ""))} placeholder="0" /></div>
          </div>
          {ratio > 0 && (
            <p className="t2" style={{ margin: "10px 0 0", fontSize: 14 }}>
              <b style={{ color: ratio >= 0.9 ? "#2C6AA6" : "#E2574C" }}>{Math.round(ratio * 100)}%.</b>{" "}
              {ratio >= 0.9 ? "Within 10%. Single-leg drills can unlock." : "More than 10% apart. Keep working both legs evenly and test again later."}
            </p>
          )}
          <button type="button" className="btn sec mt" disabled={!(ratio > 0)} onClick={() => onHop(Number(left), Number(right))}>
            Save hop test
          </button>
        </div>
        {!m.noPain && <Banner tone="warn" title="Pain was logged at this level">Stay here until you've had pain-free sessions.</Banner>}
      </main>
      {!m.maxed && (
        <div className="dock notabs">
          <button type="button" className="btn" disabled={!can} onClick={() => onConfirm(job)}>Move me up</button>
          {!can && <p className="small center" style={{ margin: "8px 0 0" }}>{!auto ? "Not quite yet. Keep logging sessions." : "Turn on both to continue"}</p>}
        </div>
      )}
    </>
  );
}
