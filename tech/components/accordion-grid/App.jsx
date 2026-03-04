/**
 * Accordion — вариант с Grid-анимацией (без max-height)
 *
 * Вместо transition на max-height + padding (Layout Triggers → thrashing, jank)
 * используем grid-template-rows: 0fr → 1fr. Всё ещё Layout, но поведение
 * предсказуемое и визуально плавное; не нужно угадывать max-height.
 *
 * Структура: контейнер с display:grid, вторая строка 0fr/1fr;
 * ячейка контента — min-height:0 + overflow:hidden; внутри — обёртка с паддингом.
 */

import { useState } from "react";
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

  const toggleAccordion = (id) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <div className="app">
      <h1>Accordion (Grid-метод)</h1>

      <div className="info-box info-box--grid">
        <p>
          <strong>Анимация через grid-template-rows: 0fr → 1fr</strong>, без max-height.
          Один Layout trigger вместо двух, предсказуемая длительность анимации.
        </p>
        <p className="info-box__hint">
          Переключите секции и сравните плавность с вариантом на max-height (#accordion).
        </p>
      </div>

      <div className="accordion accordion--grid">
        {accordionData.map((item) => {
          const isOpen = openId === item.id;
          const itemClasses = clsx("accordion-item-grid", { open: isOpen });

          return (
            <div key={item.id} className={itemClasses}>
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(item.id)}
              >
                <span>{item.title}</span>
                <span className="accordion-icon">▼</span>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  <p>{item.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
