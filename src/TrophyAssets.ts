import type { Trophy, Category } from "./service/Types";
import MundialF1 from "/src/assets/Trophies/F1Trophy.png";
import MundialF2 from "/src/assets/Trophies/F2Trophy.png";
import MundialF3 from "/src/assets/Trophies/F3Trophy.png";
import MundialF4 from "/src/assets/Trophies/F4BritishTrophy.png";
import MundialIndyCar from "/src/assets/Trophies/indycarTrophy.png";
import MundialKarting from "/src/assets/Trophies/KartingTrophy2.png";
import ConstructorF1 from "/src/assets/Trophies/F1Constructor.png";

export const TROPHY_IMAGE: Record<Trophy['type'], string> = {
  wdc: MundialF1,
  constructor: ConstructorF1,
  f2: MundialF2,
  f3: MundialF3,
  f4: MundialF4,
  karting: MundialKarting,
  indycar: MundialIndyCar,
};

export const TROPHY_LABEL: Record<Trophy['type'], string> = {
  wdc: "Campeón del Mundo",
  constructor: 'Campeón de Constructores',
  f2: "Campeón de F2",
  f3: "Campeón de F3",
  f4: "Campeón de F4",
  karting: "Campeón de Karting",
  indycar: "Campeón de IndyCar",
};

const CATEGORY_TROPHY_TYPE: Partial<Record<Category, Trophy['type']>> = {
  'KARTING ARGENTINO': 'karting',
  'KARTING EUROPEO': 'karting',
  'FORMULA 4 INGLESA': 'f4',
  'FORMULA 4 ITALIA': 'f4',
  'FORMULA 3': 'f3',
  'FORMULA 2': 'f2',
  'FORMULA 1': 'wdc',
  'INDYCAR': 'indycar',
};

export function getTrophyType(category: Category | undefined): Trophy['type'] | null {
  if (!category) return null;
  return CATEGORY_TROPHY_TYPE[category] ?? null;
}