import type { RiskEvent, RiskEventResult } from "./Types";
import PlanSaludable from "/src/assets/dieta.jpg";
import PlanAsado from "/src/assets/asado.webp";
import PlanEntrenar from '/src/assets/entrenar.jpg'
import PlanDescansar from '/src/assets/descansar.webp'
import PlanLego from '/src/assets/lego2.jpg'
import PlanTv from '/src/assets/tv.avif'
import LastTurn from '/src/assets/lastturn.webp'
import Podcast from '/src/assets/podcast.jpg'
import Frenar from '/src/assets/frenar.avif'
import Compañeros from '/src/assets/compañeros.avif'

export const FOOD_PLAN_EVENT: RiskEvent = {
  id: 'plan-alimentacion',
  title: 'Plan de alimentación',
  description: 'Un nutricionista propone ajustar tu dieta. Puede mejorar tu rendimiento o salir mal.',
  risky: {
    label: 'Seguir el plan',
    image: PlanSaludable,
    outcomes: [
      { label: '+3 OVR', chance: 60, tone: 'positive', ovrDelta: 3, message: '¡El plan funcionó!' },
      { label: '-2 OVR', chance: 40, tone: 'negative', ovrDelta: -2, message: 'La dieta no te sentó bien y perdiste' },
    ],
  },
  safe: { label: 'Mantener tu dieta', image: PlanAsado },
  successChance: 0.6,
  playerState: 'None',
  failStatePlayerState:'None',
};

export const WORKOUT_EVENT: RiskEvent = {
  id: 'entrenar-a-fondo',
  title: 'Entrenar a Fondo',
  description: 'Queres mejorar tu rendimiento en la pista y tu entrenador te recomienda un nuevo plan de entrenamiento',
  risky: {
    label: 'Entrenar a Fondo',
    image: PlanEntrenar,
    outcomes: [
      { label: '+5 OVR', chance: 65, tone: 'positive', ovrDelta: 3, message: '¡El entrenamiento dio resultado!' },
      { label: 'Lesión', chance: 35, tone: 'negative', ovrDelta: -1, message: 'Te lesionaste entrenando a fondo. Perdés toda la próxima temporada.' },
    ],
  },
  safe: { label: 'Descansar', image: PlanDescansar },
  successChance: 0.65,
  playerState: 'None',
  failStatePlayerState:'Injury',
};

export const LEGO_EVENT: RiskEvent = {
  id: 'lego',
  title: 'Carrera Lego',
  description: 'Te ofrecieron manejar un auto hecho de legos en una carrera de caridad.',
  risky: {
    label: 'Correr',
    image: PlanLego,
    outcomes: [
      { label: 'Más chances de salir campeón', chance: 50, tone: 'positive', ovrDelta: 2, message: '¡Corriste genial! Tu confianza sube de cara al campeonato.' },
      { label: '-3 OVR', chance: 50, tone: 'negative', ovrDelta: -3, message: 'El auto de Lego se rompió en pista y quedaste en ridículo' },
    ],
  },
  safe: { label: 'Quedarte en casa', image: PlanTv },
  successChance: 0.5,
  playerState: 'Championship',
  failStatePlayerState:'None',
};

export const PODCAST_EVENT: RiskEvent = {
  id: 'podcast',
  title: 'Podcast',
  description: 'Fuiste a un podcast y te preguntaron que pensas acerca de tu compañero',
  risky: {
    label: 'Decir lo que pensas y provocar al equipo',
    image: Podcast,
    outcomes: [
      { label: '+5 OVR', chance: 50, tone: 'positive', ovrDelta: 5, message: 'La gente te banco y se puso de tu lado' },
      { label: '-5 OVR', chance: 50, tone: 'negative', ovrDelta: -5, message: 'El equipo se ofendio y te dejaron de lado' },
    ],
  },
  safe: { label: 'No decir nada y quedar bien con el equipo', image: Compañeros},
  successChance: 0.5,
  playerState: 'None',
  failStatePlayerState:'None'
};

export const LASTTURN_EVENT: RiskEvent = {
  id: 'last turn',
  title: 'Ultima Curva',
  description: 'Estas en la curva mano a mano con un rival',
  risky: {
    label: 'Pisar a fondo',
    image: LastTurn,
    outcomes: [
      { label: 'Ganas el Campeonato', chance: 30, tone: 'positive', ovrDelta: 3, message: 'Lograste llegar primero a la meta' },
      { label: 'Chocas y terminas herido', chance: 70, tone: 'negative', ovrDelta: -1, message: 'Te estrellaste y terminaste con heridas graves' },
    ],
  },
  safe: { label: 'Soltar el acelerador', image: Frenar },
  successChance: 0.3,
  playerState: 'Championship',
  failStatePlayerState:'Injury',
};


const RISK_EVENTS: RiskEvent[] = [FOOD_PLAN_EVENT, WORKOUT_EVENT, LEGO_EVENT, PODCAST_EVENT, LASTTURN_EVENT];

export function rollRiskEventTrigger(triggerChance = 0.25): RiskEvent | null {
  if (Math.random() < triggerChance) {
    return RISK_EVENTS[Math.floor(Math.random() * RISK_EVENTS.length)];
  }
  return null;
}

export function resolveRiskyChoice(event: RiskEvent): RiskEventResult {
  const success = Math.random() < event.successChance;
  const tone = success ? 'positive' : 'negative';
  const outcome = event.risky.outcomes.find((o) => o.tone === tone);

  return {
    outcome: success ? 'success' : 'failure',
    message: outcome?.message ?? (success ? '¡Salió bien!' : 'No salió como esperabas.'),
  };
}

export function resolveSafeChoice(): RiskEventResult {
  return { outcome: 'safe', message: 'Decidiste no arriesgarte y mantener tu rutina.' };
}