import "./PresentationPage.css";

export type GameMode = "normal" | "intenso";

interface PresentationPageProps {
  onSelectMode: (mode: GameMode) => void;
}

export default function PresentationPage({ onSelectMode }: PresentationPageProps) {
  return (
    <div className="presentation-page">
      <a
        href="https://x.com/FierreroGame"
        target="_blank"
        rel="noopener noreferrer"
        className="presentation-social-link"
        aria-label="Seguinos en X"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      <div className="presentation-content">
        <div className="presentation-title-wrap">
          <span className="presentation-eyebrow">Career Mode</span>
          <h1 className="presentation-title">FIERRERO</h1>
        </div>

        <div className="presentation-modes">
          <button
            type="button"
            className="presentation-mode-btn presentation-mode-normal"
            onClick={() => onSelectMode("normal") }
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