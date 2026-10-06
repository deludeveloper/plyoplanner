import { useState } from "react";
import { Header, Seg, BackButton } from "./ui.jsx";
import { IconSync, IconChat, IconLock } from "./Icons.jsx";

const EQUIP = [["Box", "Box or step"], ["Hurdles", "Hurdles or cones"], ["Rope", "Jump rope"], ["Stairs", "Stairs"], ["Hill", "A hill"]];

export function SetupForm({ initial, onDone, onCancel, editing = false }) {
  const [p, setP] = useState(initial || { where: "both", freq: 2, exp: "new", equip: [], hurting: false });
  const set = (k, v) => setP((x) => ({ ...x, [k]: v }));
  const toggleEquip = (k) => set("equip", p.equip.includes(k) ? p.equip.filter((x) => x !== k) : [...p.equip, k]);

  return (
    <>
      <Header
        title={editing ? "Your answers" : "Build your routine"}
        subtitle={editing ? "Changes update your routine right away." : "Four quick questions. Change them anytime."}
        left={editing ? <BackButton onClick={onCancel} /> : null}
        right={editing ? null : <span className="chip">Step 1 of 2</span>}
      >
        {!editing && <div className="progressbar"><i className="on" /><i /></div>}
      </Header>
      <main className="content with-dock" style={{ paddingBottom: editing ? 100 : 110 }}>
        <div className="card pad">
          <p className="q">Where will you do plyos?</p>
          <Seg light value={p.where} onChange={(v) => set("where", v)} label="Where"
            options={[["run", "Before runs"], ["leg", "Leg days"], ["both", "Both"]]} />
        </div>
        <div className="card pad">
          <p className="q">How many times a week?</p>
          <Seg light value={p.freq} onChange={(v) => set("freq", v)} label="How often"
            options={[[1, "Once"], [2, "Twice"]]} />
        </div>
        {!editing && (
          <div className="card pad">
            <p className="q">How long have you been jumping?</p>
            <Seg light value={p.exp} onChange={(v) => set("exp", v)} label="Experience"
              options={[["new", "New"], ["months", "Months"], ["year", "A year +"]]} />
          </div>
        )}
        <div className="card pad">
          <p className="q">What do you have?</p>
          <p className="qh">Pick any. Nothing is fine too.</p>
          <div className="pills" style={{ margin: 0 }}>
            {EQUIP.map(([k, t]) => (
              <button key={k} type="button" aria-pressed={p.equip.includes(k)} onClick={() => toggleEquip(k)}>{t}</button>
            ))}
          </div>
        </div>
      </main>
      <div className="dock notabs">
        <button type="button" className="btn" onClick={() => onDone(p)}>{editing ? "Save changes" : "Continue"}</button>
      </div>
    </>
  );
}

export function SaveScreen({ onBack, onStart }) {
  return (
    <>
      <Header title="Keep your log with you" subtitle="How your sessions are saved."
        left={<BackButton onClick={onBack} />} right={<span className="chip">Step 2 of 2</span>}>
        <div className="progressbar"><i className="on" /><i className="on" /></div>
      </Header>
      <main className="content with-dock">
        <div className="card">
          <div className="row"><span className="icon"><IconSync /></span><div><div className="t1">On every device</div><div className="t2">Log on your phone, check it on your laptop.</div></div></div>
          <div className="row"><span className="icon"><IconChat /></span><div><div className="t1">Your assistant can log for you</div><div className="t2">Tell Zo or Claude what you did and it shows up here.</div></div></div>
          <div className="row"><span className="icon"><IconLock /></span><div><div className="t1">Private to you</div><div className="t2">Saved in your own Google Drive. The app can only open the one file it creates.</div></div></div>
        </div>
        <p className="small center mt">Google sign-in is coming soon. For now your log saves on this device, and you'll be able to connect later and keep everything.</p>
      </main>
      <div className="dock notabs">
        <button type="button" className="btn" disabled>Continue with Google, coming soon</button>
        <button type="button" className="btn sec" onClick={onStart}>Start on this device</button>
      </div>
    </>
  );
}
