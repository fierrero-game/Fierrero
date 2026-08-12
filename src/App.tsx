import { useState } from "react";
import PresentationPage, { type GameMode } from "./pages/PresentationPage";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import SummaryPage from "./pages/SummaryPage";

type Screen = 'presentation' | 'start' | 'game' | 'summary';

export default function App() {
  const [screen, setScreen] = useState<Screen>('presentation');
  const [gameKey, setGameKey] = useState(0);
  const [gameMode, setGameMode] = useState<GameMode>('normal');

  if (screen === 'presentation') {
    return (
      <PresentationPage
        onSelectMode={(mode) => {
          setGameMode(mode);
          setScreen('start');
        }}
      />
    );
  }

  if (screen === 'start') {
    return <StartPage mode={gameMode} onStart={() => setScreen('game')} />;
  }

  if (screen === 'summary') {
    return (
      <SummaryPage
        onRestart={() => {
          setGameKey((k) => k + 1);
          setScreen('presentation');
        }}
      />
    );
  }

  return <GamePage key={gameKey} mode={gameMode} onCareerEnd={() => setScreen('summary')} />;
}