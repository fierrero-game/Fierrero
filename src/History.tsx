import type { CSSProperties, ReactNode } from 'react';
import { getOvrTone, type OvrTone } from './service/ovrTone';
import './History.css'

export interface HistoryColumn {
  key: string;
  label: string;
  icon?: ReactNode;
}

export interface HistoryRowData {
  id: string | number;
  age: ReactNode;
  variant?: 'default' | 'pending' | 'placeholder' | 'special';
  connector?: ReactNode; 
  logo?: string;
  title?: ReactNode;
  badges?: ReactNode[]; 
  ovr?: number | string;
  ovrTone?: OvrTone;
  stats?: Partial<Record<string, ReactNode>>;
  content?: ReactNode; 
}

interface HistoryProps {
  columns: HistoryColumn[];
  rows: HistoryRowData[];
  title?: ReactNode;
}

export default function History({ columns, rows}: HistoryProps) {
  const tableStyle = { '--stat-cols': columns.length } as CSSProperties;

  return (
    <div className="history">

      <div className="history-table" style={tableStyle}>
        <div className="history-row history-header">
          <span className="history-cell history-cell-age">Edad</span>
          <span className="history-cell history-cell-club">Equipo</span>
          <span className="history-cell history-cell-ovr">OVR</span>
          {columns.map((col) => (
            <span className="history-cell history-cell-stat" key={col.key}>
              {col.label}
            </span>
          ))}
        </div>

        <div className="history-body">
          {rows.map((row) => {
            if (row.content) {
              return (
                <div className="history-row" key={row.id}>
                  {row.content}
                </div>
              );
            }

            if (row.variant === 'placeholder') {
              return (
                <div className="history-row history-row-placeholder" key={row.id}>
                  <span className="history-cell history-cell-age">{row.age}</span>
                </div>
              );
            }

            const tone = row.ovrTone ?? getOvrTone(row.ovr);
            const rowClass = [
              'history-row',
              row.variant === 'pending' && 'history-row-pending',
              row.variant === 'special' && 'history-row-special',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div className={rowClass} key={row.id}>
                <span className="history-cell history-cell-age">{row.age}</span>

                <span className="history-cell history-cell-club">
                  {row.connector && <span className="history-connector">{row.connector}</span>}
                  {(row.logo ) && (
                    <span className="history-logo">
                      {<img src={row.logo} alt="" />}
                    </span>
                  )}
                  <span className="history-club-name">{row.title}</span>
                  {row.badges?.map((badge, i) => (
                    <span className="history-badge" key={i}>
                      {badge}
                    </span>
                  ))}
                </span>

                <span className="history-cell history-cell-ovr">
                  {row.ovr !== undefined && (
                    <span className={`history-ovr history-ovr-${tone}`}>{row.ovr}</span>
                  )}
                </span>

                {columns.map((col) => (
                  <span className="history-cell history-cell-stat" key={col.key}>
                    {row.stats?.[col.key] !== undefined && (
                      <>
                        {col.icon && <span className="history-stat-icon">{col.icon}</span>}
                        <span className="counter">{row.stats[col.key]}</span>
                      </>
                    )}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}