import type { TeamOption } from "./Types";

//Karting
import  blue  from "../assets/Karting/blue.png";
import  red  from "../assets/Karting/red.png";
import  white  from "../assets/Karting/white.png";
import  purple  from "../assets/Karting/purple.png";
import  yellow  from "../assets/Karting/yellow.png";
import  green  from "../assets/Karting/green.png";
import orange from "../assets/Karting/orange.png";
import cyan from "../assets/Karting/cyan.png";
import black from "../assets/Karting/black.png";
import silver from "../assets/Karting/silver.png";
import maroon from "../assets/Karting/maroon.png";
import teal from "../assets/Karting/teal.png";

//F4
import argenti from '../assets/F4/argenti.png'
import art from '../assets/F4/art.png'
import cdr from '../assets/F4/cdr.png'
import dams from '../assets/F4/dams.png'
import fortec from '../assets/F4/fortec.png'
import hitech from '../assets/F4/hitech.png'
import invicta from '../assets/F4/invicta.png'
import phm from '../assets/F4/phm.png'
import prema from '../assets/F4/prema.png'
import raceGp from '../assets/F4/r-ace.png'
import rodin from '../assets/F4/rodin.png'
import usracing from '../assets/F4/usracing.png'
import van from '../assets/F4/var.png'
import virtuosi from '../assets/F4/virtuosi.png'
import xcel from '../assets/F4/xcel.png'
import penske from '../assets/F4/penske.png'
import rahal from '../assets/F4/rahal.png'
import andretti from '../assets/F4/andretti.png'
import ganassi from '../assets/F4/ganassi.png'

//F1
import mercedes from '../assets/F1/mercedes.png'
import ferrari from '../assets/F1/ferrari.png'
import astonmartin from '../assets/F1/astonmartin2.png'
import redbull from '../assets/F1/redbull3.png'
import williams from '../assets/F1/williams.png'
import mclaren  from '../assets/F1/mclaren.png'
import sauber from '../assets/F1/sauber.png'
import alpine from '../assets/F1/alpine.png'
import haas from '../assets/F1/haas.png'
import cadillac from '../assets/F1/cadillac.png'

export const kartingTeams: TeamOption[] = [
    { name: "Janke Kart Team", category: "KARTING ARGENTINO", color: "red", logoUrl: red },
    { name: "Zaffaroni Racing Team", category: "KARTING ARGENTINO", color: "green", logoUrl:green },
    { name: "LGuimard Racing", category: "KARTING ARGENTINO", color: "white", logoUrl:white },
    { name: "CRG Argentina", category: "KARTING ARGENTINO", color: "purple", logoUrl:purple },
    { name: "Prokart Competición", category: "KARTING ARGENTINO", color: "blue", logoUrl: blue },
    { name: "BirelArt Argentina", category: "KARTING ARGENTINO", color: "yellow", logoUrl: yellow },

    { name: "Tony Kart Racing Team", category: "KARTING EUROPEO", color: "orange", logoUrl: orange },
    { name: "Parolin Motorsport", category: "KARTING EUROPEO", color: "cyan", logoUrl: cyan },
    { name: "Kosmic Racing Department", category: "KARTING EUROPEO", color: "black", logoUrl: black },
    { name: "Sodikart Europe", category: "KARTING EUROPEO", color: "navy", logoUrl: blue },
    { name: "Exprit Racing Team", category: "KARTING EUROPEO", color: "silver", logoUrl: silver },
    { name: "Energy Corse", category: "KARTING EUROPEO", color: "lime", logoUrl: purple },
    { name: "Ricciardo Kart Italia", category: "KARTING EUROPEO", color: "maroon", logoUrl: maroon },
    { name: "FA Kart Iberia", category: "KARTING EUROPEO", color: "teal", logoUrl: teal },
]

export const f4Teams: TeamOption[] = [
    // Italian F4 2026
    { name: "Prema Racing", category: "FORMULA 4 ITALIA", color: "red", logoUrl: prema },
    { name: "Van Amersfoort Racing", category: "FORMULA 4 ITALIA", color: "yellow", logoUrl: van },
    { name: "PHM Racing", category: "FORMULA 4 ITALIA", color: "purple", logoUrl: phm },
    { name: "US Racing", category: "FORMULA 4 ITALIA", color: "blue", logoUrl: usracing },
    { name: "R-ace GP", category: "FORMULA 4 ITALIA", color: "orange", logoUrl: raceGp },

    // British F4 2026
    { name: "JHR Developments", category: "FORMULA 4 INGLESA", color: "black", logoUrl: 'https://fiaformula4.com/wp-content/uploads/2021/10/JHR.png' },
    { name: "Hitech", category: "FORMULA 4 INGLESA", color: "black", logoUrl: hitech },
    { name: "Argenti Motorsport", category: "FORMULA 4 INGLESA", color: "green", logoUrl: argenti },
    { name: "Virtuosi Racing", category: "FORMULA 4 INGLESA", color: "blue", logoUrl: virtuosi },
    { name: "Fortec Motorsport", category: "FORMULA 4 INGLESA", color: "red", logoUrl: fortec },
    { name: "Chris Dittmann Racing", category: "FORMULA 4 INGLESA", color: "gray", logoUrl: cdr },
    { name: "Rodin Motorsport", category: "FORMULA 4 INGLESA", color: "black", logoUrl: rodin },
    { name: "Xcel Motorsport", category: "FORMULA 4 INGLESA", color: "orange", logoUrl: xcel },
]

export const f3Teams: TeamOption[] = [
    { name: "Campos Racing", category: "FORMULA 3", color: "green", logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5LLdpXOP7D07jU0X4rmld36IrQ5y7nZrtx_RP6g02bc9ubLj0QJvnxWZp&s=10' },
    { name: "Trident", category: "FORMULA 3", color: "red", logoUrl: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Trident_Motorsport_logo.png' },
    { name: "MP Motorsport", category: "FORMULA 3", color: "orange", logoUrl: 'https://r2.thesportsdb.com/images/media/team/badge/whufbo1713350111.png' },
    { name: "ART Grand Prix", category: "FORMULA 3", color: "blue", logoUrl: art },
    { name: "Van Amersfoort Racing", category: "FORMULA 3", color: "yellow", logoUrl: van },
    { name: "PHM Racing", category: "FORMULA 3", color: "purple", logoUrl: phm },
    { name: "Rodin Motorsport", category: "FORMULA 3", color: "black", logoUrl: rodin },
    { name: "Prema Racing", category: "FORMULA 3", color: "red", logoUrl: prema },
    { name: "Hitech", category: "FORMULA 3", color: "black", logoUrl: hitech },
    { name: "AIX Racing", category: "FORMULA 3", color: "gray", logoUrl: 'https://laba7.com/wp-content/uploads/2025/03/aix-racing-alt-pos1-1.webp' },
]

export const f2Teams: TeamOption[] = [
    { name: "Invicta Racing", category: "FORMULA 2", color: "black", logoUrl: invicta },
    { name: "Hitech", category: "FORMULA 2", color: "black", logoUrl: hitech },
    { name: "Campos Racing", category: "FORMULA 2", color: "green", logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5LLdpXOP7D07jU0X4rmld36IrQ5y7nZrtx_RP6g02bc9ubLj0QJvnxWZp&s=10' },
    { name: "DAMS Lucas Oil", category: "FORMULA 2", color: "blue", logoUrl: dams },
    { name: "MP Motorsport", category: "FORMULA 2", color: "orange", logoUrl: 'https://r2.thesportsdb.com/images/media/team/badge/whufbo1713350111.png' },
    { name: "Prema Racing", category: "FORMULA 2", color: "red", logoUrl: prema },
    { name: "Rodin Motorsport", category: "FORMULA 2", color: "black", logoUrl: rodin },
    { name: "ART Grand Prix", category: "FORMULA 2", color: "blue", logoUrl: art },
    { name: "AIX Racing", category: "FORMULA 2", color: "gray", logoUrl: 'https://laba7.com/wp-content/uploads/2025/03/aix-racing-alt-pos1-1.webp' },
    { name: "Van Amersfoort Racing", category: "FORMULA 2", color: "yellow", logoUrl: van },
    { name: "Trident", category: "FORMULA 2", color: "red", logoUrl: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Trident_Motorsport_logo.png' },
]

export const f1Teams: TeamOption[] = [
    // Actuales (temporada 2026)
    { name: "Red Bull Racing", category: "FORMULA 1", color: "blue", logoUrl: redbull },
    { name: "Ferrari", category: "FORMULA 1", color: "red", logoUrl: ferrari },
    { name: "Mercedes", category: "FORMULA 1", color: "teal", logoUrl: mercedes },
    { name: "McLaren", category: "FORMULA 1", color: "orange", logoUrl: mclaren },
    { name: "Aston Martin", category: "FORMULA 1", color: "green", logoUrl: astonmartin },
    { name: "Alpine", category: "FORMULA 1", color: "blue", logoUrl: alpine },
    { name: "Williams", category: "FORMULA 1", color: "blue", logoUrl: williams },
    { name: "Racing Bulls", category: "FORMULA 1", color: "navy", logoUrl: 'https://cdn.racingnews365.com/production/Teams/Racing-Bulls/f1_2026_rbu_logo.png?v=1770038338&width=225&height=225&format=png' },
    { name: "Sauber", category: "FORMULA 1", color: "green", logoUrl: sauber },
    { name: "Haas", category: "FORMULA 1", color: "gray", logoUrl: haas },
    { name: "Cadillac", category: "FORMULA 1", color: "black", logoUrl: cadillac },
]

export const indycarTeams: TeamOption[] = [
    { name: "Team Penske", category: "INDYCAR", color: "yellow", logoUrl: penske },
    { name: "Chip Ganassi Racing", category: "INDYCAR", color: "red", logoUrl: ganassi },
    { name: "Andretti Global", category: "INDYCAR", color: "green", logoUrl: andretti },
    { name: "Arrow McLaren", category: "INDYCAR", color: "orange", logoUrl: mclaren },
    { name: "Rahal Letterman Lanigan", category: "INDYCAR", color: "black", logoUrl: rahal },
]


export const NATIONALITIES = [
  // SUDAMERICA
  { name: 'Argentina', flag: '🇦🇷', region: 'SUDAMERICA', code: 'ar' },
  { name: 'Brasil', flag: '🇧🇷', region: 'SUDAMERICA', code: 'br' },
  { name: 'Colombia', flag: '🇨🇴', region: 'SUDAMERICA', code: 'co' },
  { name: 'Uruguay', flag: '🇺🇾', region: 'SUDAMERICA', code: 'uy' },
  { name: 'Chile', flag: '🇨🇱', region: 'SUDAMERICA', code: 'cl' },
  { name: 'Perú', flag: '🇵🇪', region: 'SUDAMERICA', code: 'pe' },
  { name: 'Venezuela', flag: '🇻🇪', region: 'SUDAMERICA', code: 've' },
  { name: 'Ecuador', flag: '🇪🇨', region: 'SUDAMERICA', code: 'ec' },
  { name: 'Paraguay', flag: '🇵🇾', region: 'SUDAMERICA', code: 'py' },
  { name: 'Bolivia', flag: '🇧🇴', region: 'SUDAMERICA', code: 'bo' },
  { name: 'Guyana', flag: '🇬🇾', region: 'SUDAMERICA', code: 'gy' },
  { name: 'Surinam', flag: '🇸🇷', region: 'SUDAMERICA', code: 'sr' },

  // NORTEAMERICA
  { name: 'México', flag: '🇲🇽', region: 'NORTEAMERICA', code: 'mx' },
  { name: 'Estados Unidos', flag: '🇺🇸', region: 'NORTEAMERICA', code: 'us' },
  { name: 'Canadá', flag: '🇨🇦', region: 'NORTEAMERICA', code: 'ca' },
  { name: 'Costa Rica', flag: '🇨🇷', region: 'NORTEAMERICA', code: 'cr' },
  { name: 'Panamá', flag: '🇵🇦', region: 'NORTEAMERICA', code: 'pa' },
  { name: 'Guatemala', flag: '🇬🇹', region: 'NORTEAMERICA', code: 'gt' },
  { name: 'Honduras', flag: '🇭🇳', region: 'NORTEAMERICA', code: 'hn' },
  { name: 'El Salvador', flag: '🇸🇻', region: 'NORTEAMERICA', code: 'sv' },
  { name: 'Nicaragua', flag: '🇳🇮', region: 'NORTEAMERICA', code: 'ni' },
  { name: 'Cuba', flag: '🇨🇺', region: 'NORTEAMERICA', code: 'cu' },
  { name: 'República Dominicana', flag: '🇩🇴', region: 'NORTEAMERICA', code: 'do' },
  { name: 'Puerto Rico', flag: '🇵🇷', region: 'NORTEAMERICA', code: 'pr' },
  { name: 'Jamaica', flag: '🇯🇲', region: 'NORTEAMERICA', code: 'jm' },
  { name: 'Trinidad y Tobago', flag: '🇹🇹', region: 'NORTEAMERICA', code: 'tt' },
  { name: 'Bahamas', flag: '🇧🇸', region: 'NORTEAMERICA', code: 'bs' },

  // EUROPA
  { name: 'España', flag: '🇪🇸', region: 'EUROPA', code: 'es' },
  { name: 'Reino Unido', flag: '🇬🇧', region: 'EUROPA', code: 'gb' },
  { name: 'Alemania', flag: '🇩🇪', region: 'EUROPA', code: 'de' },
  { name: 'Francia', flag: '🇫🇷', region: 'EUROPA', code: 'fr' },
  { name: 'Italia', flag: '🇮🇹', region: 'EUROPA', code: 'it' },
  { name: 'Países Bajos', flag: '🇳🇱', region: 'EUROPA', code: 'nl' },
  { name: 'Mónaco', flag: '🇲🇨', region: 'EUROPA', code: 'mc' },
  { name: 'Finlandia', flag: '🇫🇮', region: 'EUROPA', code: 'fi' },
  { name: 'Bélgica', flag: '🇧🇪', region: 'EUROPA', code: 'be' },
  { name: 'Austria', flag: '🇦🇹', region: 'EUROPA', code: 'at' },
  { name: 'Suiza', flag: '🇨🇭', region: 'EUROPA', code: 'ch' },
  { name: 'Portugal', flag: '🇵🇹', region: 'EUROPA', code: 'pt' },
  { name: 'Suecia', flag: '🇸🇪', region: 'EUROPA', code: 'se' },
  { name: 'Noruega', flag: '🇳🇴', region: 'EUROPA', code: 'no' },
  { name: 'Dinamarca', flag: '🇩🇰', region: 'EUROPA', code: 'dk' },
  { name: 'Polonia', flag: '🇵🇱', region: 'EUROPA', code: 'pl' },
  { name: 'República Checa', flag: '🇨🇿', region: 'EUROPA', code: 'cz' },
  { name: 'Hungría', flag: '🇭🇺', region: 'EUROPA', code: 'hu' },
  { name: 'Irlanda', flag: '🇮🇪', region: 'EUROPA', code: 'ie' },
  { name: 'Rusia', flag: '🇷🇺', region: 'EUROPA', code: 'ru' },
  { name: 'Grecia', flag: '🇬🇷', region: 'EUROPA', code: 'gr' },
  { name: 'Rumania', flag: '🇷🇴', region: 'EUROPA', code: 'ro' },
  { name: 'Bulgaria', flag: '🇧🇬', region: 'EUROPA', code: 'bg' },
  { name: 'Croacia', flag: '🇭🇷', region: 'EUROPA', code: 'hr' },
  { name: 'Serbia', flag: '🇷🇸', region: 'EUROPA', code: 'rs' },
  { name: 'Eslovaquia', flag: '🇸🇰', region: 'EUROPA', code: 'sk' },
  { name: 'Eslovenia', flag: '🇸🇮', region: 'EUROPA', code: 'si' },
  { name: 'Ucrania', flag: '🇺🇦', region: 'EUROPA', code: 'ua' },
  { name: 'Islandia', flag: '🇮🇸', region: 'EUROPA', code: 'is' },
  { name: 'Luxemburgo', flag: '🇱🇺', region: 'EUROPA', code: 'lu' },
  { name: 'Estonia', flag: '🇪🇪', region: 'EUROPA', code: 'ee' },
  { name: 'Letonia', flag: '🇱🇻', region: 'EUROPA', code: 'lv' },
  { name: 'Lituania', flag: '🇱🇹', region: 'EUROPA', code: 'lt' },
  { name: 'Chipre', flag: '🇨🇾', region: 'EUROPA', code: 'cy' },
  { name: 'Malta', flag: '🇲🇹', region: 'EUROPA', code: 'mt' },
  { name: 'Bielorrusia', flag: '🇧🇾', region: 'EUROPA', code: 'by' },

  // ASIA
  { name: 'Japón', flag: '🇯🇵', region: 'ASIA', code: 'jp' },
  { name: 'China', flag: '🇨🇳', region: 'ASIA', code: 'cn' },
  { name: 'Corea del Sur', flag: '🇰🇷', region: 'ASIA', code: 'kr' },
  { name: 'India', flag: '🇮🇳', region: 'ASIA', code: 'in' },
  { name: 'Tailandia', flag: '🇹🇭', region: 'ASIA', code: 'th' },
  { name: 'Malasia', flag: '🇲🇾', region: 'ASIA', code: 'my' },
  { name: 'Indonesia', flag: '🇮🇩', region: 'ASIA', code: 'id' },
  { name: 'Singapur', flag: '🇸🇬', region: 'ASIA', code: 'sg' },
  { name: 'Emiratos Árabes Unidos', flag: '🇦🇪', region: 'ASIA', code: 'ae' },
  { name: 'Arabia Saudita', flag: '🇸🇦', region: 'ASIA', code: 'sa' },
  { name: 'Israel', flag: '🇮🇱', region: 'ASIA', code: 'il' },
  { name: 'Turquía', flag: '🇹🇷', region: 'ASIA', code: 'tr' },
  { name: 'Vietnam', flag: '🇻🇳', region: 'ASIA', code: 'vn' },
  { name: 'Filipinas', flag: '🇵🇭', region: 'ASIA', code: 'ph' },
  { name: 'Pakistán', flag: '🇵🇰', region: 'ASIA', code: 'pk' },
  { name: 'Bangladés', flag: '🇧🇩', region: 'ASIA', code: 'bd' },
  { name: 'Catar', flag: '🇶🇦', region: 'ASIA', code: 'qa' },
  { name: 'Kuwait', flag: '🇰🇼', region: 'ASIA', code: 'kw' },
  { name: 'Baréin', flag: '🇧🇭', region: 'ASIA', code: 'bh' },
  { name: 'Omán', flag: '🇴🇲', region: 'ASIA', code: 'om' },
  { name: 'Jordania', flag: '🇯🇴', region: 'ASIA', code: 'jo' },
  { name: 'Líbano', flag: '🇱🇧', region: 'ASIA', code: 'lb' },
  { name: 'Kazajistán', flag: '🇰🇿', region: 'ASIA', code: 'kz' },
  { name: 'Sri Lanka', flag: '🇱🇰', region: 'ASIA', code: 'lk' },
  { name: 'Mongolia', flag: '🇲🇳', region: 'ASIA', code: 'mn' },

  // OCEANIA
  { name: 'Australia', flag: '🇦🇺', region: 'OCEANIA', code: 'au' },
  { name: 'Nueva Zelanda', flag: '🇳🇿', region: 'OCEANIA', code: 'nz' },
  { name: 'Fiyi', flag: '🇫🇯', region: 'OCEANIA', code: 'fj' },
  { name: 'Papúa Nueva Guinea', flag: '🇵🇬', region: 'OCEANIA', code: 'pg' },

  // AFRICA
  { name: 'Sudáfrica', flag: '🇿🇦', region: 'AFRICA', code: 'za' },
  { name: 'Marruecos', flag: '🇲🇦', region: 'AFRICA', code: 'ma' },
  { name: 'Egipto', flag: '🇪🇬', region: 'AFRICA', code: 'eg' },
  { name: 'Nigeria', flag: '🇳🇬', region: 'AFRICA', code: 'ng' },
  { name: 'Kenia', flag: '🇰🇪', region: 'AFRICA', code: 'ke' },
  { name: 'Ghana', flag: '🇬🇭', region: 'AFRICA', code: 'gh' },
  { name: 'Argelia', flag: '🇩🇿', region: 'AFRICA', code: 'dz' },
  { name: 'Túnez', flag: '🇹🇳', region: 'AFRICA', code: 'tn' },
  { name: 'Etiopía', flag: '🇪🇹', region: 'AFRICA', code: 'et' },
  { name: 'Senegal', flag: '🇸🇳', region: 'AFRICA', code: 'sn' },
  { name: 'Costa de Marfil', flag: '🇨🇮', region: 'AFRICA', code: 'ci' },
  { name: 'Camerún', flag: '🇨🇲', region: 'AFRICA', code: 'cm' },
  { name: 'Uganda', flag: '🇺🇬', region: 'AFRICA', code: 'ug' },
  { name: 'Zimbabue', flag: '🇿🇼', region: 'AFRICA', code: 'zw' },
  { name: 'Angola', flag: '🇦🇴', region: 'AFRICA', code: 'ao' },
  { name: 'Mozambique', flag: '🇲🇿', region: 'AFRICA', code: 'mz' },
  { name: 'Namibia', flag: '🇳🇦', region: 'AFRICA', code: 'na' },
  { name: 'Botsuana', flag: '🇧🇼', region: 'AFRICA', code: 'bw' },
  { name: 'Zambia', flag: '🇿🇲', region: 'AFRICA', code: 'zm' },
  { name: 'Ruanda', flag: '🇷🇼', region: 'AFRICA', code: 'rw' },
];

