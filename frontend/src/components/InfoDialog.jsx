export default function InfoDialog({ title = 'Hakkında', onClose, children }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="dialog98" onClick={(e) => e.stopPropagation()}>
        <div className="game-panel">
          <div className="game-panel-header">
            <div className="game-panel-badge"><i className="fa-solid fa-circle-info" /></div>
            <div className="game-panel-heading">
              <div className="game-panel-title">{title}</div>
            </div>
            <div className="game-panel-actions">
              <button type="button" className="game-icon-btn danger" onClick={onClose}>
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
          </div>
          <div className="game-panel-body">
            {children}
            <div className="btn98-row" style={{ marginTop: 14 }}>
              <button type="button" className="btn98 primary" onClick={onClose}>Tamam</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
