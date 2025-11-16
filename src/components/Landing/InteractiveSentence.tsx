import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const games = ["Catan", "Terraforming Mars", "Azul", "Carcassonne"];

interface InteractiveSentenceProps {
  onSubmit: (intent: string, game: string) => void;
  selectedIntent: string;
  onIntentChange: (intent: string) => void;
}

export const InteractiveSentence = ({ onSubmit, selectedIntent, onIntentChange }: InteractiveSentenceProps) => {
  const [game, setGame] = useState("");
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  // Auto-rotate game names as placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGameIndex((prev) => (prev + 1) % games.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center space-y-8"
    >
      <div className="text-xl md:text-2xl text-foreground/90 flex flex-wrap items-center justify-center gap-2 md:gap-3">
        <span>I want</span>
        <span className="gradient-text font-semibold">
          {selectedIntent}
        </span>
        <span>for</span>
        <AnimatePresence mode="wait">
          <motion.input
            key={games[currentGameIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            type="text"
            value={game}
            onChange={(e) => setGame(e.target.value)}
            placeholder={games[currentGameIndex]}
            className="bg-background/50 border-b-2 border-accent-start/40 focus:border-accent-start px-3 py-1 outline-none gradient-text font-semibold w-[200px] placeholder:text-muted-foreground placeholder:font-normal"
          />
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSubmit(selectedIntent, game || games[currentGameIndex])}
        className="gradient-accent px-8 py-4 rounded-full text-foreground font-semibold text-lg shadow-glow hover:shadow-[0_0_30px_rgba(177,94,255,0.5)] transition-all"
      >
        Let's Go
      </motion.button>
    </motion.div>
  );
};
