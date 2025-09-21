import { useState, useEffect } from "react";

/**
 * Custom hook to handle common game logic for both game modes
 * Manages countdown, game timer, and state reset
 */
export const useGameLogic = (duration) => {
  const [gamePhase, setGamePhase] = useState("countdown"); // "countdown", "playing", "finished"
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(duration);

  // Countdown effect (3, 2, 1...)
  useEffect(() => {
    if (gamePhase === "countdown" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gamePhase === "countdown" && countdown === 0) {
      setGamePhase("playing");
      setTimeLeft(duration);
    }
  }, [gamePhase, countdown, duration]);

  // Game timer effect
  useEffect(() => {
    if (gamePhase === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gamePhase === "playing" && timeLeft === 0) {
      setGamePhase("finished");
    }
  }, [gamePhase, timeLeft]);

  /**
   * Resets the game state to the initial countdown phase.
   */
  const resetGame = () => {
    setGamePhase("countdown");
    setCountdown(3);
    setTimeLeft(duration);
  };

  return {
    gamePhase,
    countdown,
    timeLeft,
    resetGame,
    setGamePhase,
  };
};
