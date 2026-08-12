import "./Stats.css";
import { getOvrTone } from './service/ovrTone';
import { useAnimatedNumber } from './useAnimatedNumber';
import { getFlagUrl } from './service/Types';
import type { Nations } from './service/Types';

export interface StatItem {
  icon?: React.ReactNode;
  value: string | number;
  label: string;
}

export interface TrophyItem {
  image?: string; 
  alt?: string;
  count?: number;
}

export interface StatsProps {
  ovr: number | string;
  nationality: Nations | null;
  name: string;
  age: number;
  stats: StatItem[]; 
  trophies?: TrophyItem[]; 
}

function StatCounter({ icon, value, label }: StatItem) {
  const numericValue = typeof value === 'number' ? value : Number(value);
  const isNumeric = !Number.isNaN(numericValue);
  const animatedValue = Math.round(useAnimatedNumber(isNumeric ? numericValue : 0));

  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <div className="stat-value">
        {icon && <span className="stat-icon">{icon}</span>}
        <span className="counter">{isNumeric ? animatedValue : value}</span>
      </div>
    </div>
  );
}

export default function Stats({ ovr, nationality, name, age, stats, trophies }: StatsProps) {
  const numericOvr = typeof ovr === 'number' ? ovr : Number(ovr);
  const animatedOvr = Math.round(useAnimatedNumber(numericOvr));
  const ovrTone = getOvrTone(animatedOvr);

  const animatedAge = Math.round(useAnimatedNumber(age));
  
  return (
    <div className="stats">
      <div className="stats-header">
        <div className={`stats-ovr stats-ovr-${ovrTone}`}>
          <span className="stats-ovr-label">OVR</span>
          <span className="stats-ovr-value">{animatedOvr}</span>
        </div>

        <div className="stats-identity">
          <div className="stats-identity-top">
            {nationality && (
              <img className="stats-flag" src={getFlagUrl(nationality)} alt={nationality} />
            )}
            <span className="stats-country-code">{nationality ?? "—"}</span>
          </div>
          <div className="stats-identity-bottom">
            <span className="stats-team-name">{name}</span>
          </div>
        </div>

        <div className="stats-age">
          <span className="stats-age-label">Edad</span>
          <span className="stats-age-value">{animatedAge}</span>
        </div>
      </div>

      <div className="stats-mid">
        {stats.map(({ icon, value, label }, i) => (
          <StatCounter key={i} icon={icon} value={value} label={label} />
        ))}
      </div>
      {trophies && trophies.length > 0 && (
        <div className="stats-trophies">
          {trophies.map((trophy, i) => (
            <div className="trophy" key={i} title={trophy.alt ?? ""}>
              {trophy.image ? (
                <img className="trophy-image" src={trophy.image} alt={trophy.alt ?? ""} />
              ) : (
                <div className="trophy-placeholder" />
              )}
              {trophy.count !== undefined && trophy.count > 1 && (
                <span className="trophy-count">x{trophy.count}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}