/**
 * Reflow demos — сравнение Bad vs Good
 * Каждый пример показывает разницу между подходом с лишними reflow и оптимизированным.
 */

import { useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
import DragDrop from "./DragDrop";
import Carousel from "./Carousel";
import Modal from "./Modal";
import Tooltip from "./Tooltip";
import StickyTable from "./StickyTable";
import "./shared.css";

const DEMOS = [
  { id: "infinite-scroll", label: "Infinite Scroll", Component: InfiniteScroll },
  { id: "drag-drop", label: "Drag & Drop", Component: DragDrop },
  { id: "carousel", label: "Carousel", Component: Carousel },
  { id: "modal", label: "Modal", Component: Modal },
  { id: "tooltip", label: "Tooltip", Component: Tooltip },
  { id: "sticky-table", label: "Sticky Table", Component: StickyTable },
];

export default function ReflowDemosApp() {
  const [active, setActive] = useState("infinite-scroll");
  const Demo = DEMOS.find((d) => d.id === active)?.Component || InfiniteScroll;

  return (
    <div className="reflow-demos-app">
      <div className="reflow-demos-nav">
        {DEMOS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`reflow-demos-nav-btn ${active === id ? "active" : ""}`}
            onClick={() => setActive(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="reflow-demos-content">
        <Demo />
      </div>
    </div>
  );
}
