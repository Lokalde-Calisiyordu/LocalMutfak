import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api.js';
import Avatar from './Avatar.jsx';

const APPS = [
  { path: '/explore', label: 'Keşfet', icon: 'fa-solid fa-earth-americas' },
  { path: '/projects/new', label: 'Yeni Tarif', icon: 'fa-solid fa-mortar-pestle' },
  { path: '/my-projects', label: 'Mutfağım', icon: 'fa-solid fa-utensils' },
  { path: '/messages', label: 'Mesajlar', icon: 'fa-solid fa-bell-concierge' },
];

export default function Shell({ children, wide }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  function go(path) {
    setProfileOpen(false);
    navigate(path);
  }

  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // Kullanıcı hangi sayfada olursa olsun okunmamış mesajları hafifçe yoklar.
  useEffect(() => {
    let cancelled = false;
    function poll() {
      api.get('/messages/conversations').then((res) => {
        if (cancelled) return;
        const total = (res.data.conversations || []).reduce((sum, c) => sum + (c.unread || 0), 0);
        setUnread(total);
      }).catch(() => {});
    }
    poll();
    const t = setInterval(poll, 20000);
    return () => { cancelled = true; clearInterval(t); };
  }, []);

  return (
    <div className="desktop">
      <div className="hud-topbar">
        <div className="hud-brand" onClick={() => go('/explore')}>
          <i className="fa-solid fa-kitchen-set" /><span>LocalMutfak</span>
        </div>
        <div className="hud-profile-wrap" ref={menuRef}>
          <div className="hud-profile" onClick={(e) => { e.stopPropagation(); setProfileOpen((v) => !v); }}>
            <Avatar username={user?.username} size={38} />
            {unread > 0 && <span className="hud-ping" />}
          </div>
          {profileOpen && (
            <div className="hud-profile-menu">
              <div className="hud-profile-item" onClick={() => go(`/u/${user?.username}`)}>
                <i className="fa-solid fa-id-card icon-inline" />{user?.username}
              </div>
              <div className="hud-profile-sep" />
              <div className="hud-profile-item" onClick={() => { setProfileOpen(false); logout(); navigate('/login'); }}>
                <i className="fa-solid fa-right-from-bracket icon-inline" />Oturumu Kapat
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={'desktop-content' + (wide ? ' wide' : '')}>{children}</div>

      <nav className="hud-dock">
        {APPS.map((a) => (
          <div
            key={a.path}
            className={'hud-dock-item' + (location.pathname === a.path ? ' active' : '')}
            onClick={() => go(a.path)}
          >
            <div className="hud-dock-icon">
              <i className={a.icon} />
              {a.path === '/messages' && unread > 0 && (
                <span className="hud-dock-badge">{unread > 99 ? '99+' : unread}</span>
              )}
            </div>
            <span className="hud-dock-label">{a.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
