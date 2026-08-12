import { useState } from "react";
import type { Nations } from "../service/Types";
import type { GameMode } from "./PresentationPage";
import { initializePlayer } from "../service/GameLoop";
import { getFlagUrl, NATIONS_LIST } from "../service/Types";
import "./StartPage.css";

interface StartPageProps {
  mode: GameMode;
  onStart: () => void;
}

export default function StartPage({ mode, onStart }: StartPageProps) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState(1);
  const [nationality, setNationality] = useState<Nations>('Argentina');
  const [search, setSearch] = useState("");

  const isValid = name.trim().length > 0 && number >= 1 && number <= 99;

  const filteredNations = NATIONS_LIST.filter((n) =>
    n.toLowerCase().includes(search.trim().toLowerCase())
  );

  function handleConfirm() {
    if (!isValid) return;
    initializePlayer(name.trim(), nationality, number, mode === "intenso" ? 1 : 2);
    onStart();
  }

  return (
    <div className="start-page">
      <div className="start-card">
        <h1 className="start-title">Definí tu identidad</h1>

        <div className="start-grid">
          <div className="start-col start-col-identity">
            <span className="start-col-title">Identidad</span>

            <div className="start-jersey">
              <div className="start-jersey-shirt">
                <span className="start-jersey-name">{name.trim() || " "}</span>
                <span className="start-jersey-number">{number || "0"}</span>
              </div>
            </div>

            <label className="start-field">
              <span className="start-label">Nombre del piloto</span>
              <input
                type="text"
                className="start-input"
                placeholder="Ej: Colapinto"
                value={name}
                maxLength={16}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="start-field">
              <span className="start-label">Número</span>
              <input
                type="number"
                className="start-input"
                min={1}
                max={99}
                placeholder='43'
                onChange={(e) => setNumber(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="start-col start-col-nation">
            <span className="start-col-title">Nacionalidad</span>

            <input
              type="text"
              className="start-search"
              placeholder="Buscar país"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="start-nation-list">
              {filteredNations.map((n) => (
                <button
                  type="button"
                  key={n}
                  className={`start-nation-item ${nationality === n ? 'start-nation-item-selected' : ''}`}
                  onClick={() => setNationality(n)}
                >
                    <span className="start-nation-flag"><img src={getFlagUrl(n, 20)} alt={n} className="start-nation-flag-icon" /></span>
                    <span className="start-nation-name">{n}</span>
                    {nationality === n && <span className="start-nation-check">✓</span>}
                </button>
              ))}
              {filteredNations.length === 0 && (
                <p className="start-nation-empty">No se encontró ese país.</p>
              )}
            </div>
          </div>
        </div>

        <div className="start-footer">
          <button type="button" className="start-submit" disabled={!isValid} onClick={handleConfirm}>
            Confirmar identidad
          </button>
        </div>
      </div>
    </div>
  );
}