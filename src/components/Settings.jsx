import { useRef, useState } from "react";
import { Header, BackButton } from "./ui.jsx";
import { Chev, IconSync, IconDevice } from "./Icons.jsx";
import { downloadBackup, readBackup } from "../lib/storage.js";

export default function Settings({ state, onBack, onEdit, onRestore, onReset }) {
  const file = useRef(null);
  const [msg, setMsg] = useState("");
  const [confirm, setConfirm] = useState(false);

  const restore = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const data = await readBackup(f);
      onRestore(data);
      setMsg("Backup restored.");
    } catch (err) {
      setMsg(err.message);
    }
    e.target.value = "";
  };

  return (
    <>
      <Header title="Settings" left={<BackButton onClick={onBack} label="Routine" />} />
      <main className="content" style={{ paddingBottom: 100 }}>
        <div className="sect">Your routine</div>
        <div className="card">
          <button type="button" className="row" onClick={onEdit}>
            <span className="txt"><span className="t1" style={{ display: "block" }}>Edit your answers</span><span className="t2" style={{ display: "block" }}>Where, how often, equipment</span></span><Chev />
          </button>
        </div>

        <div className="sect">Saving</div>
        <div className="card">
          <div className="row"><span className="icon"><IconDevice /></span><div className="txt"><div className="t1">Saved on this device</div><div className="t2">{state.sessions.length} session{state.sessions.length === 1 ? "" : "s"} logged. Clearing your browser data would erase them.</div></div></div>
          <div className="row"><span className="icon"><IconSync /></span><div className="txt"><div className="t1">Google sync</div><div className="t2">Coming soon. You'll keep everything you've logged when you connect.</div></div></div>
        </div>
        <button type="button" className="btn sec mt" onClick={() => downloadBackup(state)}>Download a backup</button>
        <button type="button" className="btn sec" onClick={() => file.current?.click()}>Restore from a backup</button>
        <input ref={file} type="file" accept="application/json,.json" hidden onChange={restore} />
        {msg && <p className="small center mt" role="status">{msg}</p>}

        <div className="sect">Start over</div>
        {confirm ? (
          <div className="card pad">
            <p className="t1" style={{ margin: 0 }}>Erase everything on this device?</p>
            <p className="t2" style={{ margin: "4px 0 12px" }}>Your answers, levels and log will be deleted. Download a backup first if you might want them.</p>
            <button type="button" className="btn danger" onClick={onReset}>Erase and start over</button>
            <button type="button" className="btn sec" onClick={() => setConfirm(false)}>Cancel</button>
          </div>
        ) : (
          <button type="button" className="btn danger" onClick={() => setConfirm(true)}>Erase everything</button>
        )}
      </main>
    </>
  );
}
