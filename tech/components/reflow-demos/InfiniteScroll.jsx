/**
 * Infinite Scroll — батчинг read/write
 * Bad: read + write вперемешку в scroll → layout thrashing
 * Good: requestAnimationFrame, batch read → batch write
 */

import { useRef, useEffect, useState } from "react";
import "./shared.css";

const ITEM_HEIGHT = 48;
const TOTAL = 200;

function generateItems() {
  return Array.from({ length: TOTAL }, (_, i) => ({ id: i, label: `Item ${i + 1}` }));
}

const items = generateItems();

function BadScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      // BAD: read layout в scroll, потом сразу write — layout thrashing
      const items = el.querySelectorAll(".scroll-item");
      for (let i = 0; i < items.length; i++) {
        void items[i].offsetHeight; // read — форсирует reflow
        items[i].style.background = i % 2 ? "rgba(220,38,38,0.1)" : "transparent"; // write
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  console.log('items', items);

  // BAD: рендерим все 200 элементов — тяжёлый DOM
  return (
    <div className="scroll-view" ref={ref}>
      {items.map((item) => (
        <div key={item.id} className="scroll-item" style={{ height: ITEM_HEIGHT }}>
          {item.label}
        </div>
      ))}
    </div>
  );
}

function GoodScroll() {
  const ref = useRef(null);
  const listRef = useRef(null);
  const [range, setRange] = useState({ start: 0, end: 12 });
  const tickingRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !listRef.current) return;

    const update = () => {
      // GOOD: все read в начале
      const scrollTop = el.scrollTop;
      const clientHeight = el.clientHeight;
      
      const start = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - 2);

      const count = Math.ceil(clientHeight / ITEM_HEIGHT) + 4;
      const end = Math.min(TOTAL, start + count);

      setRange({ start, end });
      listRef.current.style.transform = `translateY(${start * ITEM_HEIGHT}px)`;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        update();
        tickingRef.current = false;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const visible = items.slice(range.start, range.end);

  console.log('visible', visible, 'range', range);

  return (
    <div className="scroll-view" ref={ref}>
      <div className="scroll-spacer" style={{ height: TOTAL * ITEM_HEIGHT }} />
      <div className="scroll-list" ref={listRef}>
        {visible.map((item) => (
          <div key={item.id} className="scroll-item" style={{ height: ITEM_HEIGHT }}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InfiniteScroll() {
  return (
    <div className="reflow-demo">
      <h1>Infinite Scroll — read/write batching</h1>
      <div className="reflow-info">
        Слева: read + write в scroll без RAF → layout thrashing. Справа: requestAnimationFrame, batch read → batch write, transform для offset.
      </div>
      <div className="reflow-comparison">
        <div className="reflow-panel reflow-panel--bad">
          <div className="reflow-panel-header">❌ Bad — reflow на каждый scroll</div>
          <div className="reflow-panel-body">
            <BadScroll />
          </div>
        </div>
        <div className="reflow-panel reflow-panel--good">
          <div className="reflow-panel-header">✅ Good — RAF + transform</div>
          <div className="reflow-panel-body">
            <GoodScroll />
          </div>
        </div>
      </div>
    </div>
  );
}
