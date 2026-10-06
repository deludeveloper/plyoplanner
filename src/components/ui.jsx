import { useEffect, useRef } from "react";
import { Back, IconPlay } from "./Icons.jsx";
import { demoUrl, doseText } from "../data/exercises.js";

export function Seg({ options, value, onChange, light = false, label }) {
  return (
    <div className={light ? "segc" : "seg"} role="group" aria-label={label}>
      {options.map(([v, text]) => (
        <button key={v} type="button" aria-pressed={value === v} onClick={() => onChange(v)}>{text}</button>
      ))}
    </div>
  );
}

export function Header({ title, subtitle, left, right, children }) {
  return (
    <header className="top">
      <div className="navrow"><span>{left}</span><span>{right}</span></div>
      <h1 className="title">{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {children}
    </header>
  );
}

export function BackButton({ onClick, label = "Back" }) {
  return <button type="button" className="back" onClick={onClick}><Back />{label}</button>;
}

export function Thumb() {
  return <span className="thumb" aria-hidden="true"><i /><i /></span>;
}

export function Banner({ tone = "warn", title, children }) {
  return (
    <div className={`banner ${tone}`} role="status">
      <span className="dot" />
      <span>{title && <b>{title}</b>}{children}</span>
    </div>
  );
}

export function Sheet({ onClose, children, label }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  // Pull down to close: drag from the handle, or anywhere once the sheet is scrolled to the top.
  const ref = useRef(null);
  const drag = useRef(null);
  const start = (e) => {
    const el = ref.current;
    if (!el || el.scrollTop > 0) return;
    drag.current = { y: e.touches[0].clientY, dy: 0 };
    el.style.transition = "none";
  };
  const move = (e) => {
    const d = drag.current;
    if (!d) return;
    d.dy = Math.max(0, e.touches[0].clientY - d.y);
    ref.current.style.transform = `translateY(${d.dy}px)`;
  };
  const end = () => {
    const d = drag.current;
    drag.current = null;
    const el = ref.current;
    if (!d || !el) return;
    el.style.transition = "transform .2s ease-out";
    if (d.dy > 90) {
      el.style.transform = "translateY(100%)";
      setTimeout(onClose, 180);
    } else {
      el.style.transform = "";
    }
  };
  return (
    <div className="scrim" onClick={onClose}>
      <div className="sheet" ref={ref} role="dialog" aria-modal="true" aria-label={label} onClick={(e) => e.stopPropagation()}
        onTouchStart={start} onTouchMove={move} onTouchEnd={end} onTouchCancel={end}>
        <button type="button" className="grab" aria-label="Close" onClick={onClose} />
        {children}
      </div>
    </div>
  );
}

export function ExerciseSheet({ ex, onClose, footer }) {
  return (
    <Sheet onClose={onClose} label={ex.name}>
      <h3>{ex.name}</h3>
      <div className="tags" style={{ marginTop: 6 }}>
        <span>{ex.job}</span><span>Level {ex.level}</span>
        <span className={ex.dir === "Rotate" ? "rot" : ""}>{ex.dir}</span>
        <span>{ex.legs === "Two" ? "Two feet" : ex.legs === "One" ? "One leg" : "Alternating"}</span>
        {ex.equip && <span>{ex.equip}</span>}
      </div>
      <div className="card pad" style={{ marginTop: 14 }}>
        <div className="t1">How to do it</div>
        <p className="t2" style={{ fontSize: 15, marginTop: 4 }}>{ex.cue}</p>
        <div className="t1" style={{ marginTop: 12 }}>Dose</div>
        <p className="t2" style={{ fontSize: 15, marginTop: 4 }}>{doseText(ex)}. Rest 1 to 2 minutes between sets.</p>
      </div>
      <a className="btn sec mt" href={demoUrl(ex)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", gap: 8 }}>
        <IconPlay /> Watch a demo
      </a>
      {footer}
    </Sheet>
  );
}

export function Ring({ value, max = 6, size = 48 }) {
  const r = size / 2 - 5;
  const c = 2 * Math.PI * r;
  const p = Math.min(1, value / max);
  return (
    <svg viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E3EEF8" strokeWidth="7" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#2C6AA6" strokeWidth="7" strokeLinecap="round"
        strokeDasharray={`${c * p} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
    </svg>
  );
}
