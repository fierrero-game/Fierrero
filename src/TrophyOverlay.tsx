import { useEffect, useState } from "react";
import "./TrophyOverlay.css";
import type { Trophy } from "./service/Types";
import { TROPHY_IMAGE, TROPHY_LABEL } from "./TrophyAssets";

interface TrophyOverlayProps {
  trophies: Trophy[];
  onDone: () => void;
}

export default function TrophyOverlay({ trophies, onDone }: TrophyOverlayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 20);
    const hideTimer = setTimeout(() => setVisible(false), 2200);
    const doneTimer = setTimeout(onDone, 2600);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`trophy-overlay ${visible ? "trophy-overlay-visible" : ""}`}
      style={{ "--trophy-count": trophies.length } as React.CSSProperties}
    >
      {trophies.map((trophy, i) => (
        <div className="trophy-overlay-card" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
          <img className="trophy-overlay-image" src={TROPHY_IMAGE[trophy.type as Trophy['type']]} alt="" />
          <span className="trophy-overlay-label">{TROPHY_LABEL[trophy.type as Trophy['type']]}</span>
          {trophy.team && <span className="trophy-overlay-team">{trophy.team.name}</span>}
        </div>
      ))}
    </div>
  );
}