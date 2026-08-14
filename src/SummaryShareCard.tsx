import { forwardRef } from "react";
import { getOvrTone } from "./service/ovrTone";
import { TROPHY_IMAGE, TROPHY_LABEL } from "./TrophyAssets";
import { getFlagUrl } from "./service/Types";
import type { TeamOption, Trophy, Nations } from "./service/Types";
import "./SummaryShareCard.css";

interface SummaryShareCardProps {
  name: string;
  number: number;
  nationality: Nations | null;
  maxOvr: number;
  races: number;
  wins: number;
  podiums: number;
  teamsInOrder: TeamOption[]; // trayectoria, en orden cronológico, sin repetir
  trophies: Trophy[]; // todas las de la carrera, sin agrupar por equipo
}

const SummaryShareCard = forwardRef<HTMLDivElement, SummaryShareCardProps>(
  ({ name, number, nationality, maxOvr, races, wins, podiums, teamsInOrder, trophies }, ref) => {
    const ovrTone = getOvrTone(Math.round(maxOvr));

    const trophyCounts = new Map<string, number>();
    for (const t of trophies) {
      trophyCounts.set(t.type, (trophyCounts.get(t.type) ?? 0) + 1);
    }

    return (
      <div className="share-card" ref={ref}>
        <div className="share-card-header">
          <div className={`share-card-ovr share-card-ovr-${ovrTone}`}>
            <span className="share-card-ovr-label">OVR</span>
            <span className="share-card-ovr-value">{Math.round(maxOvr)}</span>
          </div>

          {nationality && (
            <img className="share-card-flag" src={getFlagUrl(nationality)} alt={nationality} />
          )}

          <span className="share-card-pill">#{number}</span>
          <span className="share-card-name">{name}</span>
        </div>

        <div className="share-card-stats">
          <div className="share-card-stat">
            <span className="share-card-stat-label">CARRERAS</span>
            <span className="share-card-stat-value">{Math.round(races)}</span>
          </div>
          <div className="share-card-stat">
            <span className="share-card-stat-label">Victorias</span>
            <span className="share-card-stat-value">{Math.round(wins)}</span>
          </div>
          <div className="share-card-stat">
            <span className="share-card-stat-label">Podios</span>
            <span className="share-card-stat-value">{Math.round(podiums)}</span>
          </div>
        </div>

        {teamsInOrder.length > 0 && (
          <div className="share-card-section">
            <span className="share-card-section-title">Trayectoria</span>
            <div className="share-card-teams">
              {teamsInOrder.map((team, i) => (
                <img
                  key={`${team.name}-${i}`}
                  src={team.logoUrl}
                  alt={team.name}
                  title={team.name}
                  className="share-card-team-logo"
                />
              ))}
            </div>
          </div>
        )}

        {trophyCounts.size > 0 && (
          <div className="share-card-section">
            <span className="share-card-section-title">Títulos</span>
            <div className="share-card-trophies">
              {Array.from(trophyCounts.entries()).map(([type, count]) => {
                const image = TROPHY_IMAGE[type];
                if (!image) return null;
                return (
                  <div className="share-card-trophy" key={type} title={TROPHY_LABEL[type] ?? type}>
                    <img src={image} alt={TROPHY_LABEL[type] ?? type} />
                    {count > 1 && <span className="share-card-trophy-count">x{count}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);

SummaryShareCard.displayName = "SummaryShareCard";

export default SummaryShareCard;