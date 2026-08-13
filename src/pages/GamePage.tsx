import { useEffect, useState } from "react";
import Stats from "../Stats";
import History from "../History";
import Decisions from "../Decisions";
import { chooseTeam, getOptionsTeam, getPlayerState, applyOvrDelta, setSeasonYears, wasPlayerFired } from "../service/GameLoop";
import type { TeamOption, playerStats, Trophy, RiskEvent, RiskEventResult } from "../service/Types";
import type { GameMode } from "./PresentationPage";
import TrophyOverlay from "../TrophyOverlay"; 
import FiredModal from "../FiredModal";
import { TROPHY_IMAGE, TROPHY_LABEL } from "../TrophyAssets";
import { rollRiskEventTrigger, resolveRiskyChoice, resolveSafeChoice } from "../service/events";
import RiskDecision from "../RiskDecision";

import "./GamePage.css";
const RETIREMENT_AGE = 38;

function seasonYearsFromMode(mode: GameMode): number {
  return mode === "intenso" ? 1 : 2;
}

function buildTrophyItems(trophies: Trophy[]): { image: string; count: number }[] {
  const countByType = new Map<string, number>();
  for (const trophy of trophies) {
    countByType.set(trophy.type, (countByType.get(trophy.type) ?? 0) + 1);
  }
  return Array.from(countByType, ([type, count]) => ({
    image: TROPHY_IMAGE[type],
    count,
    alt: TROPHY_LABEL[type],
    
  }));
}

function buildHistoryRows(player: playerStats, seasonYears: number) {
  const rows: any[] = player.history.map((h:playerStats, i) => {
    
    const trophiesWonThisPeriod = player.trophies.filter((t) => t.age === h.age);
    return {
      id: `h-${i}`,
      age: h.age,
      logo: h.team?.logoUrl,
      title: h.team?.name ?? "—",
      ovr: h.ovr,
      stats: { Races: h.races, Wins: h.wins, Dnf: h.dnf },
      badges: trophiesWonThisPeriod.map((t, j) => (
        <img key={j} src={TROPHY_IMAGE[t.type]} alt="Trofeo" className="history-trophy-badge" />
      )),
    };
  });

  if (player.age < RETIREMENT_AGE) {
    rows.push({ id: "pending", age: player.age, variant: "pending", title: "Eligiendo Equipo..." });
  }

  for (let age = player.age + seasonYears; age <= RETIREMENT_AGE; age += seasonYears) {
    rows.push({ id: `ph-${age}`, age, variant: "placeholder" });
  }

  return rows;
}

// Decide, para una edad/estado dado, si esta vuelta toca evento de riesgo o mercado de pases
function rollNextEvent(age: number): RiskEvent | null {
  if (age >= RETIREMENT_AGE) return null;
  return rollRiskEventTrigger();
}

interface GamePageProps {
  mode: GameMode;
  onCareerEnd: () => void;
}

export default function GamePage({ mode, onCareerEnd }: GamePageProps) {
  const seasonYears = seasonYearsFromMode(mode);

  useEffect(() => {
    setSeasonYears(seasonYears);
  }, [seasonYears]);

  const [player, setPlayer] = useState(getPlayerState());
  const [options, setOptions] = useState<TeamOption[]>(getOptionsTeam() ?? []);
  const [celebration, setCelebration] = useState<Trophy[] | null>(null);
  const [firedNotice, setFiredNotice] = useState(false);
  const [riskEvent, setRiskEvent] = useState<RiskEvent | null>(() => rollNextEvent(player.age));
  const [riskResult, setRiskResult] = useState<RiskEventResult | null>(null);

  const isRetired = player.age >= RETIREMENT_AGE;

  function advanceAfterSeason(wonTrophies: Trophy[]) {
      const updated = getPlayerState();
      setPlayer(updated);

      const retired = updated.age >= RETIREMENT_AGE;
      const nextOptions = retired ? [] : getOptionsTeam() ?? [];
      setOptions(nextOptions);

      const nextRiskEvent = rollNextEvent(updated.age);
      setRiskEvent(nextRiskEvent);
      setRiskResult(null);

      if (!retired && !nextRiskEvent && wasPlayerFired()) setFiredNotice(true);
      if (wonTrophies.length > 0) setCelebration(wonTrophies);
  }

  function handleSelect(team: TeamOption) {
    const wonTrophies = chooseTeam(team);
    advanceAfterSeason(wonTrophies);
  }

  function handleRiskyChoice() {
    if (!riskEvent) return;
    const result = resolveRiskyChoice(riskEvent);

    if (result.outcome !== 'safe') {
      const tone = result.outcome === 'success' ? 'positive' : 'negative';
      const outcome = riskEvent.risky.outcomes.find((o) => o.tone === tone);
      if (outcome) applyOvrDelta(outcome.ovrDelta, riskEvent.playerState, riskEvent.failStatePlayerState);
    }

    setRiskResult(result);
  }

  function handleSafeChoice() {
    setRiskResult(resolveSafeChoice());
  }

  function dismissRiskEvent() {
    if (!player.team) {
      setRiskEvent(null);
      setRiskResult(null);
      return;
    }
    const wonTrophies = chooseTeam(player.team);
    setRiskEvent(null);
    setRiskResult(null);
    advanceAfterSeason(wonTrophies);
  }

  return (
    <div className="game-page">
      <div className="game-card">
        <div className="area-left">
          <div className="area-stats">
            <Stats
              ovr={Math.round(player.ovr)}
              nationality={player.nationality}
              name={ player.name ?? ""}
              age={player.age}
              stats={[
                { label: "CARRERAS", value: Math.round(player.races), icon: "🏁" },
                { label: "VICTORIAS", value: Math.round(player.wins), icon: "🏆" },
                { label: "PODIOS", value: Math.round(player.podiums), icon: "🥈" },
                { label: "DNF", value: Math.round(player.dnf), icon: "💥" },
              ]}
              trophies={buildTrophyItems(player.trophies)}
            />
          </div>

          <div className="area-decisions">
            {isRetired ? (
              <div className="retirement-banner">
                <h2>Carrera finalizada</h2>
                <p>Te retiraste a los {player.age} años.</p>
                <button type="button" className="retirement-summary-btn" onClick={onCareerEnd}>
                  Ver Resumen de Carrera
                </button>
              </div>
            ) : riskEvent && player.team ? (
              <RiskDecision
                event={riskEvent}
                result={riskResult}
                onGamble={handleRiskyChoice}
                onSafe={handleSafeChoice}
                onContinue={dismissRiskEvent}
              />
            ) : (
              <Decisions
                title="Mercado de pases"
                description="Llegaron ofertas después de tu último tramo de carrera. Podés aceptar una o quedarte en tu equipo."
                options={options.map((team, i) => {
                  const isCurrent = player.team != null && i === options.length - 1 && team.name === player.team.name;
                  return {
                    id: `${team.category}-${team.name}-${i}`,
                    label: isCurrent ? "Quedarse en" : "Fichar por",
                    title: team.name,
                    logo: team.logoUrl,
                    subLabel: team.category,
                    variant: isCurrent ? "current" : "default",
                    onSelect: () => handleSelect(team),
                  };
                })}
              />
            )}
          </div>
        </div>

        <div className="area-history">
          <History
            columns={[
              { key: "Races", label: "Races", icon: "🏁" },
              { key: "Wins", label: "Wins", icon: "🏆" },
              { key: "Dnf", label: "Dnf", icon: "💥" },
            ]}
            rows={buildHistoryRows(player, seasonYears)}
          />
        </div>
      </div>
      {firedNotice && (
        <FiredModal onDone={() => setFiredNotice(false)} />
      )}
      {!firedNotice && celebration && (
        <TrophyOverlay trophies={celebration} onDone={() => setCelebration(null)} />
      )}
    </div>
  );
}