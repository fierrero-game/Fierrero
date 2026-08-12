import { getPlayerState } from "../service/GameLoop";
import { getOvrTone } from "../service/ovrTone";
import { TROPHY_IMAGE, TROPHY_LABEL } from "../TrophyAssets";
import { getFlagUrl } from "../service/Types";
import type { TeamOption } from "../service/Types";
import "./SummaryPage.css";


interface SummaryPageProps {
  onRestart: () => void;
}

interface TeamSummary {
  team: TeamOption;
  races: number;
  wins: number;
  podiums: number;
  dnf: number;
  trophyCounts: Map<string, number>;
}

function buildTeamSummaries(history: any[], trophies: any[]): TeamSummary[] {
    const map = new Map<string, TeamSummary>();

    for (const h of history) {
        if (!h.team) continue;
        const key = h.team.name;
        const existing = map.get(key);
        if (existing) {
        existing.races += h.races;
        existing.wins += h.wins;
        existing.podiums += h.podiums ?? 0;
        existing.dnf += h.dnf;
        } else {
        map.set(key, {
            team: h.team,
            races: h.races,
            wins: h.wins,
            podiums: h.podiums ?? 0,
            dnf: h.dnf,
            trophyCounts: new Map(),
        });
        }
    }

    for (const trophy of trophies) {
        if (!trophy.team) {
            console.warn('[SummaryPage] Trofeo sin equipo asociado:', trophy);
            continue;
        }
        const summary = map.get(trophy.team.name);
        if (summary) {
            summary.trophyCounts.set(
                trophy.type,
                (summary.trophyCounts.get(trophy.type) ?? 0) + 1
            );
        } else {
            console.warn(
                `[SummaryPage] No se encontró equipo "${trophy.team.name}" en el mapa. Equipos disponibles:`,
                Array.from(map.keys())
            );
        }
    }

    return Array.from(map.values());
}

export default function SummaryPage({ onRestart }: SummaryPageProps) {
    const player = getPlayerState();
    const ovrTone = getOvrTone(Math.round(player.maxOvr));
    const teamSummaries = buildTeamSummaries(player.history as any[], player.trophies);
    
    
    return (
        <div className="summary-page">
        <div className="summary-layout">
            <div className="summary-driver-card">
            <span className="summary-flag">🏁</span>

            <div className="summary-driver-left">
                <span className="summary-driver-tag">Carrera Finalizada</span>
                <h1 className="summary-driver-name">{player.name || "Piloto"}</h1>
                <div className="summary-driver-badges">
                <span className="summary-driver-number">#{player.number}</span>
                {player.nationality && (
                    <span className="summary-driver-nation">
                        <img src={getFlagUrl(player.nationality)} alt={player.nationality} className="summary-flag-icon" />
                        {player.nationality}
                    </span>
                    )}
                </div>
                <div className="summary-driver-stats">
                <div className="summary-driver-stat">
                    <span className="summary-driver-stat-value">{Math.round(player.races)}</span>
                    <span className="summary-driver-stat-label">Carreras</span>
                </div>
                <div className="summary-driver-stat">
                    <span className="summary-driver-stat-value">{Math.round(player.wins)}</span>
                    <span className="summary-driver-stat-label">Victorias</span>
                </div>
                <div className="summary-driver-stat">
                    <span className="summary-driver-stat-value">{Math.round(player.podiums)}</span>
                    <span className="summary-driver-stat-label">Podios</span>
                </div>
                <div className="summary-driver-stat">
                    <span className="summary-driver-stat-value">{Math.round(player.dnf)}</span>
                    <span className="summary-driver-stat-label">Dnf</span>
                </div>
                </div>
            </div>

            <div className={`summary-ovr-badge summary-ovr-${ovrTone}`}>
                <span className="summary-ovr-label">OVR Máx</span>
                <span className="summary-ovr-value">{Math.round(player.maxOvr)}</span>
            </div>
            </div>

            <div className="summary-teams-grid">
            {teamSummaries.map((s) => (
                <div
                className="summary-team-card"
                key={s.team.name}
                style={{ ['--team-color' as any]: s.team.color }}
                >
                {s.team.logoUrl && (
                    <img src={s.team.logoUrl} alt="" className="summary-team-logo" />
                )}
                <span className="summary-team-name">{s.team.name}</span>

                <div className="summary-team-stats">
                    <div className="summary-team-stat">
                    <span className="summary-team-stat-value">{Math.round(s.races)}</span>
                    <span className="summary-team-stat-label">Carreras</span>
                    </div>
                    <div className="summary-team-stat">
                    <span className="summary-team-stat-value">{Math.round(s.wins)}</span>
                    <span className="summary-team-stat-label">Victorias</span>
                    </div>
                    <div className="summary-team-stat">
                    <span className="summary-team-stat-value">{Math.round(s.podiums)}</span>
                    <span className="summary-team-stat-label">Podios</span>
                    </div>
                </div>

                {s.trophyCounts.size > 0 && (
                    <div className="summary-team-trophies">
                    {Array.from(s.trophyCounts.entries()).map(([type, count]) => {
                        const image = TROPHY_IMAGE[type];
                        if (!image) {
                            console.warn(`[SummaryPage] No hay imagen mapeada para el tipo de trofeo: "${type}"`);
                            return null;
                        }
                        return (
                            <div
                                className="summary-trophy-stack"
                                key={type}
                                title={`${TROPHY_LABEL[type] ?? type} x${count}`}
                            >
                                {Array.from({ length: count }, (_, i) => (
                                    <img
                                        key={`${type}-${i}`}
                                        src={image}
                                        alt={TROPHY_LABEL[type] ?? type}
                                        className="summary-team-trophy-icon"
                                        style={{ zIndex: i }}
                                    />
                                ))}
                            </div>
                        );
                    })}
                    </div>
)}
                </div>
            ))}
            </div>

            <button type="button" className="summary-restart" onClick={onRestart}>
            ↺ Volver a jugar
            </button>
        </div>
        </div>
    );
}