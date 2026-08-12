import type { ReactNode } from 'react';
import "./Decisions.css";

export interface DecisionOption {
  id: string | number;
  label: ReactNode; // ej: "Fichar por" / "Quedarse en"
  title: ReactNode; // ej: "Racing"
  logo?: string;
  logoNode?: ReactNode;
  subLabel?: ReactNode; // ej: "Liga Profesional"
  subIcon?: ReactNode;
  variant?: 'default' | 'current'; // 'current' = la opción de quedarse
  onSelect?: () => void;
  disabled?: boolean;
}

interface DecisionsProps {
  title: ReactNode;
  description?: ReactNode;
  options: DecisionOption[];
}

export default function Decisions({ title, description, options }: DecisionsProps) {
  return (
    <div className="decisions">
      <h2 className="decisions-title">{title}</h2>
      {description && <p className="decisions-description">{description}</p>}

      <div className="decisions-grid">
        {options.map((opt) => (
          <button
            type="button"
            key={opt.id}
            className={`decision-card ${opt.variant === 'current' ? 'decision-card-current' : ''}`}
            onClick={opt.onSelect}
            disabled={opt.disabled}
          >
            <span className="decision-label">{opt.label}</span>
            <span className="decision-option-title">{opt.title}</span>

            {(opt.logo || opt.logoNode) && (
              <span className="decision-logo">
                {opt.logoNode ?? <img src={opt.logo} alt="" />}
              </span>
            )}

            {opt.subLabel && (
              <span className="decision-sublabel">
                {opt.subIcon && <span className="decision-subicon">{opt.subIcon}</span>}
                {opt.subLabel}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}