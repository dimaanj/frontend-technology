/**
 * Drag & Drop — left/top vs transform
 * Bad: position left/top каждый mousemove → reflow
 * Good: transform → только composite, без reflow
 */

import { useRef, useState, useCallback } from "react";
import "./shared.css";

const GRID_SIZE = 40;

function BadDrag() {
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const dragRef = useRef(null);

  const onMouseDown = (e) => {
    e.preventDefault();
    dragRef.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  const onMouseMove = useCallback((e) => {
    if (!dragRef.current) return;
    // BAD: left/top — каждый mousemove вызывает reflow
    setPos({
      x: e.clientX - dragRef.current.x,
      y: e.clientY - dragRef.current.y,
    });
  }, []);

  const onMouseUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  return (
    <div
      className="drag-area"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <div
        className="drag-box drag-box--bad"
        onMouseDown={onMouseDown}
        style={{ left: pos.x, top: pos.y }}
      >
        <span className="drag-handle">⋮⋮</span>
        left/top
      </div>
    </div>
  );
}

function GoodDrag() {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const dragRef = useRef(null);

  const onMouseDown = (e) => {
    e.preventDefault();
    dragRef.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  const onMouseMove = useCallback((e) => {
    if (!dragRef.current) return;
    // GOOD: transform — только composite, без reflow
    setPos({
      x: e.clientX - dragRef.current.x,
      y: e.clientY - dragRef.current.y,
    });
  }, []);

  const onMouseUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  return (
    <div
      className="drag-area"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <div
        ref={ref}
        className="drag-box drag-box--good"
        onMouseDown={onMouseDown}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      >
        <span className="drag-handle">⋮⋮</span>
        transform
      </div>
    </div>
  );
}

export default function DragDrop() {
  return (
    <div className="reflow-demo">
      <h1>Drag & Drop — left/top vs transform</h1>
      <div className="reflow-info">
        Слева: position left/top — каждый mousemove вызывает reflow. Справа: transform — только composite layer, без reflow. Перетащи за ручку (⋮⋮).
      </div>
      <div className="reflow-comparison">
        <div className="reflow-panel reflow-panel--bad">
          <div className="reflow-panel-header">❌ Bad — left/top</div>
          <div className="reflow-panel-body">
            <BadDrag />
          </div>
        </div>
        <div className="reflow-panel reflow-panel--good">
          <div className="reflow-panel-header">✅ Good — transform</div>
          <div className="reflow-panel-body">
            <GoodDrag />
          </div>
        </div>
      </div>
    </div>
  );
}
