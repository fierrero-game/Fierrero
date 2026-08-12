import "./PresentationPage.css";

export type GameMode = "normal" | "intenso";

interface PresentationPageProps {
  onSelectMode: (mode: GameMode) => void;
}

export default function PresentationPage({ onSelectMode }: PresentationPageProps) {
  return (
    <div className="presentation-page">
      <div className="presentation-content">
        <div className="presentation-title-wrap">
          <span className="presentation-eyebrow">Career Mode</span>
          <h1 className="presentation-title">FIERRERO</h1>
        </div>

        <div className="presentation-modes">
          <button
            type="button"
            className="presentation-mode-btn presentation-mode-normal"
            onClick={() => onSelectMode("normal")}
          >
            <span className="presentation-mode-name">Normal</span>
            <span className="presentation-mode-desc">
              La vida avanza cada 2 temporadas
            </span>
          </button>

          <button
            type="button"
            className="presentation-mode-btn presentation-mode-intenso"
            onClick={() => onSelectMode("intenso")}
          >
            <span className="presentation-mode-name">Intenso</span>
            <span className="presentation-mode-desc">
              La vida avanza cada 1 temporada
            </span>
          </button>
        </div>
        <a
        
          href="https://cafecito.app/fierrerogame"
          target="_blank"
          rel="noopener noreferrer"
          className="presentation-support-link"
        >
          ☕ Apoyá el proyecto
        </a>
      </div>
    </div>
  );
}