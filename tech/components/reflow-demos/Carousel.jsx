/**
 * Carousel — кэширование ширин vs чтение на каждый слайд
 * Bad: offsetWidth при каждом клике → reflow
 * Good: кэш при mount/resize, анимация через transform
 */

import { useRef, useState, useEffect } from "react";
import "./shared.css";

const slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5"];

function BadCarousel() {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    // BAD: читаем offsetWidth при каждом изменении index — reflow
    setOffset(ref.current.offsetWidth * index);
  }, [index]);

  const go = (delta) => {
    setIndex((i) => Math.max(0, Math.min(slides.length - 1, i + delta)));
  };

  return (
    <div className="carousel-wrap">
      <div className="carousel-view" ref={ref}>
        <div
          className="carousel-track carousel-track--bad"
          style={{ left: -offset }}
        >
          {slides.map((s, i) => (
            <div key={i} className="carousel-slide">
              {s}
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-nav">
        <button onClick={() => go(-1)} disabled={index === 0}>←</button>
        <span>{index + 1} / {slides.length}</span>
        <button onClick={() => go(1)} disabled={index === slides.length - 1}>→</button>
      </div>
    </div>
  );
}

function GoodCarousel() {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);

  // GOOD: читаем width только при mount и resize
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setWidth(el.offsetWidth);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = (delta) => {
    setIndex((i) => Math.max(0, Math.min(slides.length - 1, i + delta)));
  };

  // GOOD: transform вместо left
  const offset = width * index;

  return (
    <div className="carousel-wrap">
      <div className="carousel-view" ref={ref}>
        <div
          className="carousel-track carousel-track--good"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="carousel-slide">
              {s}
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-nav">
        <button onClick={() => go(-1)} disabled={index === 0}>←</button>
        <span>{index + 1} / {slides.length}</span>
        <button onClick={() => go(1)} disabled={index === slides.length - 1}>→</button>
      </div>
    </div>
  );
}

export default function Carousel() {
  return (
    <div className="reflow-demo">
      <h1>Carousel — left vs transform + кэш</h1>
      <div className="reflow-info">
        Слева: left + offsetWidth при каждом рендере → reflow. Справа: ResizeObserver кэширует width, transform для сдвига.
      </div>
      <div className="reflow-comparison">
        <div className="reflow-panel reflow-panel--bad">
          <div className="reflow-panel-header">❌ Bad — left, read каждый рендер</div>
          <div className="reflow-panel-body">
            <BadCarousel />
          </div>
        </div>
        <div className="reflow-panel reflow-panel--good">
          <div className="reflow-panel-header">✅ Good — transform, кэш width</div>
          <div className="reflow-panel-body">
            <GoodCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
