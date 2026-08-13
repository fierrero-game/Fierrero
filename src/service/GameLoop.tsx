import type {playerStats,Nations, TeamOption, Trophy, PlayerStates } from "./Types";
import { getTrophyType } from "../TrophyAssets";
import { f1Teams, f2Teams,f3Teams,f4Teams,kartingTeams, indycarTeams } from "./Data";

let injuredNextPeriod = false;
let championship = false;
let seasonYears = 1;

let player: playerStats = {
    name: 'piloto',
    number: 0,
    ovr:40,
    maxOvr:40,
    age:9,
    talent: 0.1 +  Math.pow(Math.random(), 3) * 0.9,
    nationality: null,
    ligue: null,
    team: null,
    trophies: [],
    races:0,
    wins:0,
    podiums:0,
    points:0,
    dnf:0,
    history: [],
}

export function initializePlayer(name: string, nationality: Nations, number: number, years: number = 2) {
    player.name = name;
    player.nationality = nationality;
    player.number = number;
    player.ovr = 40;
    player.maxOvr = 40;
    player.age = 9;
    player.talent = 0.2 + Math.pow(Math.random(), 3) * 0.9;
    player.team = null;
    player.trophies = [];
    player.races = 0;
    player.wins = 0;
    player.podiums = 0;
    player.points = 0;
    player.dnf = 0;
    player.history = [];
    injuredNextPeriod = false;
    championship = false;
    seasonYears = years;
}

export function chooseTeam(chosen: TeamOption) {
    const period = computePeriodStats();
    updateTeam(chosen);
    const currentTeam = player.team;

    (player.history as any).push({
        age: player.age,
        team: player.team,
        ovr: Math.round(player.ovr),
        races: Math.round(period.races),
        wins: Math.round(period.wins),
        podiums: Math.round(period.podiums),
        dnf: Math.round(period.dnf),
    });

    player.races += period.races;
    player.wins += period.wins;
    player.podiums += period.podiums;
    player.dnf += period.dnf;
    

    const wonTrophies: Trophy[] = [];
    if (period.wins > period.races / 2 || championship) {
        wonTrophies.push(...rollWorldChampionship(currentTeam, period));
    }

    const isChampion = wonTrophies.length > 0;
    for(let i = 0;i<seasonYears;i++){
       if (getTrophyType(currentTeam?.category) && rollConstructorsTrophy(currentTeam, isChampion, period)) {
            wonTrophies.push({
                type: 'constructor',
                age: player.age,
                team: currentTeam,
            });
        } 
    }
    

    player.trophies.push(...wonTrophies);

    updateAge(seasonYears);
    updateOVR();

    return wonTrophies;
}

function rollWorldChampionship(team: TeamOption | null, period: {wins:number; races:number}): Trophy[] {
    const trophyType = getTrophyType(team?.category);
    if (!trophyType) return [];
    if(period.wins >= (period.races * 0.85) || championship){
        championship = false;
        const count = seasonYears;
        return Array.from({ length: count }, () => ({
            type: trophyType,
            age: player.age,
            team,
        }));
    }
    else if (Math.random() < 0.65) {
        const count = Math.random() < 0.20 ? seasonYears : 1;
        return Array.from({ length: count }, () => ({
            type: trophyType,
            age: player.age,
            team,
        }));
    }
    return [];
}

function rollConstructorsTrophy(team: TeamOption | null, isChampion: boolean, period: {wins:number; races:number}): boolean {
    if(team?.category != 'FORMULA 1') return false;
    if(seasonYears == 2){
        if (isChampion) return Math.random() < 0.52;
        if (period.wins > period.races * 0.5) return Math.random() < 0.15;
        return Math.random() < 0.015;
    }
    
    if (isChampion) return Math.random() < 0.80;
    if (period.wins > period.races * 0.5) return Math.random() < 0.25;
    return Math.random() < 0.03;
}

function getCategoryTeams(): TeamOption[] {
    if (player.ovr < 85 && player.age > 28) return indycarTeams;
    else if (player.ovr < 50) return kartingTeams;
    else if (player.ovr >= 50 && player.ovr < 60) return f4Teams;
    else if (player.ovr >= 60 && player.ovr < 70) return f3Teams;
    else if (player.ovr >= 70 && player.ovr < 85 ) return f2Teams;
    return f1Teams;
}

export function getOptionsTeam(): TeamOption[] {
    const categoryTeams = getCategoryTeams();

    if (!player.team) {
        return pickRandomUnique(categoryTeams, 3);
    }

    const lastPeriod:any = player.history[player.history.length - 1];
    const wasFired =
        lastPeriod !== undefined &&
        (lastPeriod.dnf > lastPeriod.wins ||
        lastPeriod.wins < lastPeriod.races * 0.15 ||
        (player.age > 31 && player.ovr < 55));
  
    if (wasFired) {
        return pickRandomUnique(categoryTeams, 3, player.team);
     }

    const alternatives = pickRandomUnique(categoryTeams, 2, player.team);
    return [...alternatives, player.team]; 
}

function pickRandomUnique(teams: TeamOption[], count: number, exclude?: TeamOption | null): TeamOption[] {
  const pool = exclude ? teams.filter((t) => t.name !== exclude.name) : teams;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function updateTeam(team: TeamOption) {
    player.team = team;
}

function updateAge(years: number) {
    player.age += years;
}

function normalizedSkill(ovr: number): number {
    // asymptotic: se acerca a 1 pero nunca lo alcanza
    return 1 - Math.exp(-ovr / 90);
}

function computePeriodStats() {
    let races = 0;
    if (injuredNextPeriod) {
        injuredNextPeriod = false;
        races = 0;
        return { races, wins: 0, podiums: 0, dnf: 0 };
    }

    if(seasonYears == 2){
        races = 20 + Math.random() * 4 + 20 + Math.random() * 4;
    }else{
        races = 20 + Math.random() * 4
    }
    

    if (championship) {
        return { races, wins: races, podiums: races, dnf: 0 };
    }

    const performance = player.talent * 0.5 + normalizedSkill(player.ovr) * 0.5;

    if (player.talent > 0.75) {
        const dominantChance = (player.talent - 0.75) / 0.25;
        if (Math.random() < dominantChance) {
            const wins = races * (0.5 + Math.random() * 0.5 * performance);
            const podiums = (races - wins) * (0.5 + Math.random() * 0.5);
            const dnf = races * Math.random() * 0.05 * (1 - performance);
            return { races, wins, podiums, dnf };
        }
    }

    const wins = races * (0 + Math.random() * player.talent);
    const podiums = (0 + Math.random() * (races - wins) * 0.5);
    const dnf = races * (0.05 + Math.random() * 0.15);
    return { races, wins, podiums, dnf };
}

function updateOVR(){
    const growthScale = seasonYears / 2; // normal (years=2) => 1, intenso (years=1) => 0.5

    if(player.age < 31){
        if(player.age < 17 && player.ovr < 85){
            player.ovr += (4 + Math.random() * (12 * player.talent * 2)) * growthScale;
        }else if(player.ovr >= 85){
            player.ovr += (1 + Math.random() * 3) * growthScale;
        }else{
            player.ovr += (1 + Math.random() * (8 * player.talent)) * growthScale;
        }
    }
    else{
        const decline = 2 + Math.random() * 10;
        player.ovr -= decline * (1 - player.talent * 0.4) * growthScale;
    }
    
    player.maxOvr = Math.max(player.maxOvr, player.ovr);
}

export function getPlayerState() {
    return {
        ...player,
        trophies: [...player.trophies],
        history: [...player.history],
    };
}

export function applyTrainingBoost() {
    const ovrGain = 5;
    const talentGain = 0.1 + Math.random() * 0.1; // entre 0.1 y 0.2
    player.ovr = Math.min(player.ovr + ovrGain);
    player.talent = Math.min(1, player.talent + talentGain);
}

export function applyInjury() {
    injuredNextPeriod = true;
}

function applyChampionship(){
    championship = true;
}

export function applyOvrDelta(amount: number, state: PlayerStates, failState:PlayerStates) {
    player.ovr = Math.min(Math.max(0, player.ovr + amount));
    if (amount > 0) {
        player.talent = Math.min(1, player.talent + 0.1 + Math.random() * 0.1);
    } 
    
    if(amount < 0){
        if (failState === 'Injury') applyInjury();
    }else if(amount >= 0){
        if (state === 'Championship') applyChampionship();
    }
    
}

export function setSeasonYears(years: number) {
    seasonYears = years;
}

export function getSeasonYears() {
    return seasonYears;
}