import type { ReactNode } from "react";

export interface playerStats {
    name: string,
    number: number,
    ovr: number,
    maxOvr: number,
    age: number,
    talent: number,
    nationality: Nations | null,
    ligue: Category | null,
    team: TeamOption | null,
    trophies: Trophy[],
    races:number,
    wins:number,
    podiums:number,
    points:number,
    dnf:number,
    history: never[]
}

export type PlayerStates =
  | 'None'
  | 'Injury'
  | 'Championship';


export interface TeamOption {
  name: string;
  category: Category;
  color: string;
  logoUrl?: string;
}

export interface Trophy {
  type: string;
  age: number;
  team: TeamOption | null;
}

export type Category = 
    | 'KARTING ARGENTINO'
    | 'KARTING EUROPEO'
    | 'FORMULA 4 INGLESA'
    | 'FORMULA 4 ITALIA'
    | 'FORMULA 3'
    | 'FORMULA 2'
    | 'FORMULA 1'
    | 'INDYCAR'
    | 'WEC_LEMANS'
    | 'TURISMO_CARRETERA' 
    | 'STOCK_CAR_BRASIL';

export type Nations =
    | 'Argentina'
    | 'Brasil'
    | 'México'
    | 'España'
    | 'Colombia'
    | 'Uruguay'
    | 'Chile'
    | 'Perú'
    | 'Reino Unido'
    | 'Alemania'
    | 'Francia'
    | 'Italia'
    | 'Países Bajos'
    | 'Mónaco'
    | 'Australia'
    | 'Japón'
    | 'Estados Unidos'

export const NATION_CODE: Record<Nations, string> = {
  'Argentina': 'ar',
  'Brasil': 'br',
  'México': 'mx',
  'España': 'es',
  'Colombia': 'co',
  'Uruguay': 'uy',
  'Chile': 'cl',
  'Perú': 'pe',
  'Reino Unido': 'gb',
  'Alemania': 'de',
  'Francia': 'fr',
  'Italia': 'it',
  'Países Bajos': 'nl',
  'Mónaco': 'mc',
  'Australia': 'au',
  'Japón': 'jp',
  'Estados Unidos': 'us',
};

export const NATIONS_LIST = Object.keys(NATION_CODE) as Nations[];

export function getFlagUrl(nation: Nations, width: 20 | 40 | 80 = 40): string {
  return `https://flagcdn.com/w${width}/${NATION_CODE[nation]}.png`;
}

export interface RiskOutcomeDisplay {
  label: string;     
  chance: number;    
  tone: 'positive' | 'negative';
  ovrDelta: number;   
  playerState?: PlayerStates;
  failStatePlayerState?: PlayerStates;
  message: string;
}

export interface RiskEvent {
  id: string;
  title: string;
  description: string;
  risky: {
    label: string;
    image: string;
    outcomes: RiskOutcomeDisplay[]; 
  };
  safe: {
    label: string;
    image?: string;
    icon?: ReactNode;
  };
  successChance: number; 
  playerState: PlayerStates;
  failStatePlayerState: PlayerStates;
}

export interface RiskEventResult {
  outcome: 'success' | 'failure' | 'safe';
  message: string;
}