/**
 * Modal — JS-центрирование vs CSS
 * Bad: getBoundingClientRect, innerHeight, top/left → reflow
 * Good: position fixed + top/left 50% + transform translate(-50%, -50%)
 */

import { useState, useRef, useEffect } from "react";
import "./shared.css";

function BadModal({ open, onClose, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open || !ref.current) return;
    // BAD: читаем layout при открытии — getBoundingClientRect, innerWidth/Height
    const rect = ref.current.getBoundingClientRect();
    const centerX = (window.innerWidth - rect.width) / 2;
    const centerY = (window.innerHeight - rect.height) / 2;
    ref.current.style.left = `${centerX}px`;
    ref.current.style.top = `${centerY}px`;
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop modal-backdrop--bad" onClick={onClose}>
      <div
        ref={ref}
        className="modal-box modal-box--bad"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}

function GoodModal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      {/* GOOD: CSS centering — без чтения layout */}
      <div
        className="modal-box modal-box--good"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}

export default function Modal() {
  const [badOpen, setBadOpen] = useState(false);
  const [goodOpen, setGoodOpen] = useState(false);

  return (
    <div className="reflow-demo">
      <h1>Modal — JS vs CSS центрирование</h1>
      <div className="reflow-info">
        Слева: getBoundingClientRect + innerHeight, задаём top/left в JS → reflow. Справа: position: fixed + inset + transform — без layout.
      </div>
      <div className="reflow-comparison">
        <div className="reflow-panel reflow-panel--bad">
          <div className="reflow-panel-header">❌ Bad — JS центрирование</div>
          <div className="reflow-panel-body">
            <button className="demo-btn" onClick={() => setBadOpen(true)}>
              Открыть
            </button>
            <BadModal open={badOpen} onClose={() => setBadOpen(false)}>
              <p>Модалка с JS-центрированием</p>
            </BadModal>
          </div>
        </div>
        <div className="reflow-panel reflow-panel--good">
          <div className="reflow-panel-header">✅ Good — CSS центрирование</div>
          <div className="reflow-panel-body">
            <button className="demo-btn" onClick={() => setGoodOpen(true)}>
              Открыть
            </button>
            <GoodModal open={goodOpen} onClose={() => setGoodOpen(false)}>
              <p>Модалка с CSS-центрированием</p>
            </GoodModal>
          </div>
        </div>
      </div>
    </div>
  );
}
