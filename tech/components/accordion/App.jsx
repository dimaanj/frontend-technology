/**
 * Accordion (Яндекс, Тинькофф, Авито)
 *
 * Создайте компонент аккордеона с возможностью раскрытия/скрытия секций.
 *
 * Требования:
 * - Несколько секций (минимум 3)
 * - Клик по заголовку раскрывает/скрывает содержимое
 * - Плавная анимация при открытии/закрытии
 * - Только одна секция может быть открыта одновременно
 * - Визуальная индикация открытой секции (стрелка/иконка)
 * - Возможность закрыть текущую открытую секцию
 *
 * Критерии приёмки:
 * - Клик по заголовку переключает состояние секции
 * - При открытии новой секции предыдущая автоматически закрывается
 * - Анимация работает плавно
 * - Иконка стрелки поворачивается при открытии/закрытии
 * - Адаптивный дизайн
 */

import { useMemo, useRef, useState } from "react";
import clsx from "clsx";
import "./styles.css";

const accordionData = [
  {
    id: 1,
    title: "What is Hack Frontend?",
    content:
      "Hack Frontend is a comprehensive platform for preparing for frontend developer interviews. We provide 200+ articles, coding problems, interactive quizzes, and flashcards covering JavaScript, React, TypeScript, HTML, CSS, and more.",
  },
  {
    id: 2,
    title: "Is Hack Frontend free?",
    content:
      "Yes! Hack Frontend is completely free. You get access to all articles, coding problems, quizzes, and flashcards without any cost.",
  },
  {
    id: 3,
    title: "What makes Hack Frontend different?",
    content:
      "Hack Frontend combines theory and practice in one place. We have real interview questions from top tech companies, an interactive IDE for solving problems, quizzes for testing knowledge, and flashcards for memorization.",
  },
  {
    id: 4,
    title: "Do I need to register?",
    content:
      "Registration is optional for reading articles. However, to solve problems, track your progress, and save your solutions, you need to create a free account.",
  },
  {
    id: 5,
    title: "Can I practice coding online?",
    content:
      "Yes! Hack Frontend includes a full-featured online IDE. You can write code, run it, and get instant feedback with automatic testing.",
  },
];

export default function App() {
  const [openId, setOpenId] = useState(null);
  const [announcement, setAnnouncement] = useState("Accordion is ready");
  const buttonRefs = useRef([]);

  const itemIds = useMemo(() => accordionData.map((item) => item.id), []);

  const toggleAccordion = (id) => {
    if (openId === id) {
      setOpenId(null);
      setAnnouncement(
        `${accordionData.find((item) => item.id === id)?.title ?? "Section"} collapsed`,
      );
    } else {
      setOpenId(id);
      setAnnouncement(
        `${accordionData.find((item) => item.id === id)?.title ?? "Section"} expanded`,
      );
    }
  };

  const onHeaderKeyDown = (event, index) => {
    const maxIndex = accordionData.length - 1;
    let nextIndex = index;

    switch (event.key) {
      case "ArrowDown":
        nextIndex = index === maxIndex ? 0 : index + 1;
        break;
      case "ArrowUp":
        nextIndex = index === 0 ? maxIndex : index - 1;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = maxIndex;
        break;
      default:
        return;
    }

    event.preventDefault();
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="app">
      <h1>Accordion Component</h1>

      <div className="info-box">
        <p>Click on any question to expand or collapse the answer</p>
      </div>

      <section className="accordion-section" aria-labelledby="accordion-title">
        <h2 id="accordion-title" className="visually-hidden">
          Frequently asked questions
        </h2>
        <div className="accordion" role="presentation">
          {accordionData.map((item, index) => {
            const buttonId = `accordion-header-${item.id}`;
            const panelId = `accordion-panel-${item.id}`;
            const isOpen = openId === item.id;
            const accordionClasses = clsx("accordion-item", {
              open: isOpen,
            });

            return (
              <div key={item.id} className={accordionClasses}>
                <h3 className="accordion-heading">
                  <button
                    id={buttonId}
                    ref={(element) => {
                      buttonRefs.current[index] = element;
                    }}
                    type="button"
                    className="accordion-header"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleAccordion(item.id)}
                    onKeyDown={(event) => onHeaderKeyDown(event, index)}
                  >
                    <span>{item.title}</span>
                    <span className="accordion-icon" aria-hidden="true">
                      ▼
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  className="accordion-content"
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                >
                  <div className="accordion-content-inner">
                    <p>{item.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <p className="visually-hidden" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </div>
  );
}
