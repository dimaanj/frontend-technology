/**
 * Sticky Table — read в scroll vs RAF + кэш
 * Bad: scroll → read offsetTop/offsetHeight каждого row → reflow
 * Good: RAF, читаем только scrollTop, CSS position: sticky
 */

import { useRef, useEffect } from "react";
import "./shared.css";

const ROWS = 30;

function BadStickyTable() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      // BAD: читаем offsetTop/offsetHeight многих элементов при каждом scroll
      const rows = el.querySelectorAll("tbody tr");
      for (let i = 0; i < rows.length; i++) {
        void rows[i].offsetTop;
        void rows[i].offsetHeight;
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="table-scroll" ref={scrollRef}>
      <table className="sticky-table">
        <thead>
          <tr className="sticky-header sticky-header--bad">
            <th>Col 1</th>
            <th>Col 2</th>
            <th>Col 3</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: ROWS }, (_, i) => (
            <tr key={i}>
              <td>Row {i + 1} A</td>
              <td>Row {i + 1} B</td>
              <td>Row {i + 1} C</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GoodStickyTable() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        // GOOD: один read scrollTop, остальное — CSS sticky
        void el.scrollTop;
        ticking = false;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="table-scroll" ref={scrollRef}>
      <table className="sticky-table">
        <thead>
          <tr className="sticky-header sticky-header--good">
            <th>Col 1</th>
            <th>Col 2</th>
            <th>Col 3</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: ROWS }, (_, i) => (
            <tr key={i}>
              <td>Row {i + 1} A</td>
              <td>Row {i + 1} B</td>
              <td>Row {i + 1} C</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function StickyTable() {
  return (
    <div className="reflow-demo">
      <h1>Sticky Table — top vs transform</h1>
      <div className="reflow-info">
        Слева: scroll → read offsetTop, задаём top. Справа: RAF + transform для sticky заголовка.
      </div>
      <div className="reflow-comparison">
        <div className="reflow-panel reflow-panel--bad">
          <div className="reflow-panel-header">❌ Bad — top при scroll</div>
          <div className="reflow-panel-body">
            <BadStickyTable />
          </div>
        </div>
        <div className="reflow-panel reflow-panel--good">
          <div className="reflow-panel-header">✅ Good — RAF + transform</div>
          <div className="reflow-panel-body">
            <GoodStickyTable />
          </div>
        </div>
      </div>
    </div>
  );
}
