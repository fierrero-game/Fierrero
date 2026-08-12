import { useEffect, useRef, useState } from "react";
import type { RiskEvent, RiskEventResult} from "./service/Types";
import "./RiskDecision.css";

interface RiskDecisionProps {
  event: RiskEvent;
  result: RiskEventResult | null;
  onGamble: () => void;
  onSafe: () => void;
  onContinue: () => void;
}

const ROLL_DURATION_MS = 2000;
const ROLL_INTERVAL_MS = 120;

export default function RiskDecision({ event, result, onGamble, onSafe, onContinue }: RiskDecisionProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [flickerIndex, setFlickerIndex] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleGamble() {
    if (isRolling || result) return;
    setIsRolling(true);

    let i = 0;
    intervalRef.current = window.setInterval(() => {
      setFlickerIndex(i % event.risky.outcomes.length);
      i++;
    }, ROLL_INTERVAL_MS);

    timeoutRef.current = window.setTimeout(() => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      setIsRolling(false);
      onGamble();
    }, ROLL_DURATION_MS);
  }

  // Mientras rolea: parpadea random. Con resultado ya confirmado: se fija en el real.
  const finalOutcomeIndex =
    result && result.outcome !== 'safe'
      ? event.risky.outcomes.findIndex(
          (o) => o.tone === (result.outcome === 'success' ? 'positive' : 'negative')
        )
      : null;

  const activeIndex = finalOutcomeIndex ?? flickerIndex;

  return (
    <div className="risk-decision">
      <h2 className="risk-decision-title">{event.title}</h2>
      <p className="risk-decision-description">
        {result ? result.message : event.description}
      </p>

      <div className="risk-decision-grid">
        <button
          type="button"
          className={`risk-card ${isRolling ? 'risk-card-rolling' : ''} ${
            result?.outcome === 'safe' ? 'risk-card-faded' : ''
          }`}
          onClick={handleGamble}
          disabled={isRolling || !!result}
        >
          <span className="risk-card-label">{event.risky.label}</span>
          <div className="risk-card-image">
            <img src={event.risky.image} alt="" />
          </div>
          <div className="risk-card-outcomes">
            {event.risky.outcomes.map((outcome, i) => {
              const isRolling = activeIndex === i && !result;
              const isWinner = finalOutcomeIndex === i;
              const isLoser = finalOutcomeIndex !== null && finalOutcomeIndex !== i;

              return (
                <span
                  key={i}
                  className={`risk-outcome risk-outcome-${outcome.tone} ${
                    isRolling ? 'risk-outcome-active' : ''
                  } ${isWinner ? 'risk-outcome-won' : ''} ${isLoser ? 'risk-outcome-lost' : ''}`}
                >
                  <span className="risk-outcome-value">{outcome.label}</span>
                  <span className="risk-outcome-chance">{outcome.chance}%</span>
                </span>
              );
            })}
          </div>
        </button>

        <button
          type="button"
          className={`risk-card risk-card-safe ${
            result && result.outcome !== 'safe' ? 'risk-card-faded' : ''
          }`}
          onClick={onSafe}
          disabled={isRolling || !!result}
        >
          <span className="risk-card-label">{event.safe.label}</span>
          {event.safe.image ? (
            <div className="risk-card-image">
              <img src={event.safe.image} alt="" />
            </div>
          ) : (
            <div className="risk-card-image risk-card-image-placeholder">
              {event.safe.icon}
            </div>
          )}
          <div className="risk-card-outcomes">
            <span className="risk-outcome risk-outcome-neutral">
              <span className="risk-outcome-icon">→</span>
              <span className="risk-outcome-value">Sin cambios</span>
            </span>
          </div>
        </button>
      </div>

      {result && (
        <button type="button" className="risk-decision-continue" onClick={onContinue}>
          Continuar
        </button>
      )}
    </div>
  );
}