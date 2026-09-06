import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MENU_ICONS = {
  'Dosya': 'fa-solid fa-utensils',
  'Görünüm': 'fa-solid fa-eye',
  'Yardım': 'fa-solid fa-circle-question',
};

export default function Window({ icon, title, menu, statusLeft, statusRight, children, width }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [maximized, setMaximized] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpenMenu(null);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  function handleBack() {
    navigate(-1);
  }
  function handleMaximize() {
    setMaximized((m) => !m);
  }
  function handleClose() {
    navigate('/explore');
  }

  return (
    <div
      className={'game-panel' + (maximized ? ' maximized' : '')}
      style={!maximized && width ? { width, maxWidth: '96vw' } : undefined}
    >
      <div className="game-panel-header">
        {icon && <div className="game-panel-badge">{icon}</div>}
        <div className="game-panel-heading">
          <div className="game-panel-title">{title}</div>
          {(statusLeft || statusRight) && (
            <div className="game-panel-substatus">
              {statusLeft && <span className="chip">{statusLeft}</span>}
              {statusRight && <span className="chip chip-accent">{statusRight}</span>}
            </div>
          )}
        </div>

        <div className="game-panel-actions" ref={ref}>
          {menu && menu.map((m) => (
            <div className="menubar-item" key={m.label}>
              <button
                type="button"
                className={'game-icon-btn' + (openMenu === m.label ? ' active' : '')}
                title={m.label}
                onClick={() => setOpenMenu(openMenu === m.label ? null : m.label)}
              >
                <i className={MENU_ICONS[m.label] || 'fa-solid fa-ellipsis'} />
              </button>
              {openMenu === m.label && (
                <div className="menu-dropdown">
                  {m.items.map((it, i) => it.sep ? (
                    <div className="menu-dropdown-sep" key={`sep-${i}`} />
                  ) : (
                    <div
                      key={it.label}
                      className={'menu-dropdown-item' + (it.disabled ? ' disabled' : '')}
                      onClick={() => { if (it.disabled) return; setOpenMenu(null); it.onClick?.(); }}
                    >
                      {it.icon && <i className={it.icon} />}
                      <span>{it.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button type="button" className="game-icon-btn" title="Geri" onClick={handleBack}>
            <i className="fa-solid fa-arrow-left" />
          </button>
          <button type="button" className="game-icon-btn" title={maximized ? 'Küçült' : 'Genişlet'} onClick={handleMaximize}>
            <i className={maximized ? 'fa-solid fa-compress' : 'fa-solid fa-expand'} />
          </button>
          <button type="button" className="game-icon-btn danger" title="Kapat" onClick={handleClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      </div>

      <div className="game-panel-body">{children}</div>
    </div>
  );
}
