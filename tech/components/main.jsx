import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import AccordionApp from './accordion/App.jsx';
import AccordionGridApp from './accordion-grid/App.jsx';

const components = {
  accordion: AccordionApp,
  'accordion-grid': AccordionGridApp,
};

const componentList = Object.keys(components);

function Demo() {
  const getCurrentId = () =>
    (typeof window !== 'undefined' && window.location.hash.slice(1)) || 'accordion';
  const [currentId, setCurrentId] = useState(getCurrentId);

  useEffect(() => {
    const onHashChange = () => setCurrentId(getCurrentId());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const selectComponent = (id) => {
    window.location.hash = id;
    setCurrentId(id);
  };

  const Component = components[currentId] || components.accordion;

  return (
    <div className="demo-layout">
      <aside className="demo-sidebar">
        <h2 className="demo-sidebar-title">Компоненты</h2>
        <nav className="demo-nav">
          {componentList.map((id) => (
            <button
              key={id}
              type="button"
              className={`demo-nav-item ${id === currentId ? 'demo-nav-item--active' : ''}`}
              onClick={() => selectComponent(id)}
            >
              {id}
            </button>
          ))}
        </nav>
      </aside>
      <main className="demo-main">
        <Component />
      </main>
    </div>
  );
}

const root = document.getElementById('root');
createRoot(root).render(<Demo />);
