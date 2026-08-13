import { useEffect, useState } from "react";
import "./FiredModal.css";

interface FiredModalProps {
  onDone: () => void;
}

export default function FiredModal({ onDone }: FiredModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 20);
    const hideTimer = setTimeout(() => setVisible(false), 2000);
    const doneTimer = setTimeout(onDone, 2400);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`fired-overlay ${visible ? "fired-overlay-visible" : ""}`}>
      <div className="fired-card">
        <div className="fired-icon-ring">
          <svg viewBox="0 0 24 24" className="fired-icon-x" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="fired-label">Te echaron</span>
      </div>
    </div>
  );
}