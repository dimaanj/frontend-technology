/**
 * Tooltip — немедленный показ vs отложенный + transform
 * Bad: mouseenter → сразу getBoundingClientRect, top/left
 * Good: setTimeout/RAF, один раз read, transform для позиции
 */

import { useState, useRef } from "react";
import "./shared.css";

const TRIGGERS = ["Item A", "Item B", "Item C", "Item D", "Item E"];

function BadTooltip() {
  const [active, setActive] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const triggerRefs = useRef({});

  const onEnter = (id, e) => {
    const el = triggerRefs.current[id];
    if (!el) return;
    // BAD: сразу читаем layout при mouseenter
    const rect = el.getBoundingClientRect();
    setPos({ x: rect.left, y: rect.bottom + 4 });
    setActive(id);
  };

  const onLeave = () => setActive(null);

  return (
    <div className="tooltip-demo">
      {TRIGGERS.map((label, i) => (
        <span
          key={i}
          ref={(r) => (triggerRefs.current[i] = r)}
          className="tooltip-trigger"
          onMouseEnter={(e) => onEnter(i, e)}
          onMouseLeave={onLeave}
        >
          {label}
        </span>
      ))}
      {active !== null && (
        <div
          className="tooltip-popover tooltip-popover--bad"
          style={{ left: pos.x, top: pos.y }}
        >
          Tooltip для {TRIGGERS[active]}
        </div>
      )}
    </div>
  );
}

function GoodTooltip() {
  const [active, setActive] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const triggerRefs = useRef({});
  const timeoutRef = useRef(null);

  const onEnter = (id) => {
    timeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => {
        const el = triggerRefs.current[id];
        if (!el) return;
        // GOOD: один read в RAF
        const rect = el.getBoundingClientRect();
        setPos({ x: rect.left, y: rect.bottom + 4 });
        setActive(id);
      });
    }, 100);
  };

  const onLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActive(null);
  };

  return (
    <div className="tooltip-demo">
      {TRIGGERS.map((label, i) => (
        <span
          key={i}
          ref={(r) => (triggerRefs.current[i] = r)}
          className="tooltip-trigger"
          onMouseEnter={() => onEnter(i)}
          onMouseLeave={onLeave}
        >
          {label}
        </span>
      ))}
      {active !== null && (
        <div
          className="tooltip-popover tooltip-popover--good"
          style={{ left: pos.x, top: pos.y }}
        >
          Tooltip для {TRIGGERS[active]}
        </div>
      )}
    </div>
  );
}

export default function Tooltip() {
  return (
    <div className="reflow-demo">
      <h1>Tooltip — немедленно vs отложенно</h1>
      <div className="reflow-info">
        Слева: mouseenter → сразу getBoundingClientRect + top/left. Справа: setTimeout + RAF, один read, transform.
      </div>
      <div className="reflow-comparison">
        <div className="reflow-panel reflow-panel--bad">
          <div className="reflow-panel-header">❌ Bad — сразу read + left/top</div>
          <div className="reflow-panel-body">
            <BadTooltip />
          </div>
        </div>
        <div className="reflow-panel reflow-panel--good">
          <div className="reflow-panel-header">✅ Good — delay + transform</div>
          <div className="reflow-panel-body">
            <GoodTooltip />
          </div>
        </div>
      </div>
    </div>
  );
}
