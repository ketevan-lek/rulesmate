import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Check, X, AlertCircle, ChevronDown, Gamepad2, MessageSquare, ArrowLeft } from "lucide-react";

const availableGames = [
  "Catan",
  "Ticket to Ride",
  "Monopoly",
  "Scrabble",
  "Chess",
  "Pandemic",
  "Azul",
  "Wingspan",
  "Codenames",
  "7 Wonders",
];

const GameInputMockups = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [focused1, setFocused1] = useState(false);
  const [focused2, setFocused2] = useState(false);
  const [focused3, setFocused3] = useState(false);
  const [focused4, setFocused4] = useState(false);
  const [selected1, setSelected1] = useState<string | null>(null);
  const [selected2, setSelected2] = useState<string | null>(null);
  const [selected3, setSelected3] = useState<string | null>(null);
  const [selected4, setSelected4] = useState<string | null>(null);

  const filterGames = (query: string) => {
    if (!query.trim()) return availableGames.slice(0, 5);
    return availableGames.filter(game => 
      game.toLowerCase().includes(query.toLowerCase())
    );
  };

  const hasNoMatch = (query: string) => {
    if (!query.trim()) return false;
    return !availableGames.some(game => 
      game.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2 mt-8">
          Game Input Validation Mockups
        </h1>
        <p className="text-muted-foreground mb-8">
          4 design options for validating game names against our database
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Option 1: Dropdown Autocomplete */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent-start/20 text-accent-start px-3 py-1 rounded-full text-sm font-medium">
                Option 1
              </span>
              <span className="text-foreground font-semibold">Dropdown Autocomplete</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Classic dropdown list appears as user types. Shows matching games with visual confirmation.
            </p>
            
            <div className="space-y-4">
              {/* Desktop Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Desktop</span>
                <div className="relative max-w-md mx-auto">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={selected1 || input1}
                      onChange={(e) => { setInput1(e.target.value); setSelected1(null); }}
                      onFocus={() => setFocused1(true)}
                      onBlur={() => setTimeout(() => setFocused1(false), 200)}
                      placeholder="Search for a game..."
                      className="w-full bg-card border border-border rounded-xl pl-12 pr-12 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-start/50"
                    />
                    {selected1 && (
                      <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {focused1 && !selected1 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-10"
                      >
                        {hasNoMatch(input1) ? (
                          <div className="p-4 text-center">
                            <AlertCircle className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                            <p className="text-foreground font-medium mb-1">Game not found</p>
                            <p className="text-muted-foreground text-sm mb-3">
                              We don't have "{input1}" yet
                            </p>
                            <button className="text-accent-start text-sm hover:underline flex items-center gap-1 mx-auto">
                              <MessageSquare className="w-4 h-4" />
                              Request this game
                            </button>
                          </div>
                        ) : (
                          <div className="max-h-48 overflow-y-auto">
                            {filterGames(input1).map((game) => (
                              <button
                                key={game}
                                onClick={() => { setSelected1(game); setInput1(game); }}
                                className="w-full px-4 py-3 text-left text-foreground hover:bg-accent-start/10 transition-colors flex items-center gap-3"
                              >
                                <Gamepad2 className="w-4 h-4 text-muted-foreground" />
                                {game}
                              </button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Mobile Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Mobile</span>
                <div className="max-w-[280px] mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search game..."
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
                      readOnly
                    />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="mt-2 bg-card border border-border rounded-lg overflow-hidden text-sm">
                    {availableGames.slice(0, 4).map((game) => (
                      <div key={game} className="px-3 py-2.5 border-b border-border/50 last:border-0 text-foreground">
                        {game}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Option 2: Inline Validation with Chips */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent-start/20 text-accent-start px-3 py-1 rounded-full text-sm font-medium">
                Option 2
              </span>
              <span className="text-foreground font-semibold">Inline Validation + Chips</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Shows popular games as chips below input. Real-time validation indicator inline.
            </p>
            
            <div className="space-y-4">
              {/* Desktop Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Desktop</span>
                <div className="max-w-md mx-auto space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={selected2 || input2}
                      onChange={(e) => { setInput2(e.target.value); setSelected2(null); }}
                      onFocus={() => setFocused2(true)}
                      onBlur={() => setTimeout(() => setFocused2(false), 200)}
                      placeholder="Which game?"
                      className={`w-full bg-card border-2 rounded-xl px-5 py-4 text-foreground text-center placeholder:text-muted-foreground focus:outline-none transition-colors ${
                        selected2 
                          ? "border-green-500/50 bg-green-500/5" 
                          : hasNoMatch(input2) && input2.trim()
                            ? "border-red-500/50 bg-red-500/5"
                            : "border-border focus:border-accent-start/50"
                      }`}
                    />
                    {selected2 && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <Check className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                    {hasNoMatch(input2) && input2.trim() && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Chips */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {(focused2 && !selected2 ? filterGames(input2).slice(0, 6) : availableGames.slice(0, 6)).map((game) => (
                      <motion.button
                        key={game}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setSelected2(game); setInput2(game); }}
                        className="px-3 py-1.5 bg-card border border-border/50 rounded-full text-sm text-foreground hover:border-accent-start/50 hover:bg-accent-start/10 transition-colors"
                      >
                        {game}
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Error state */}
                  <AnimatePresence>
                    {hasNoMatch(input2) && input2.trim() && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-center"
                      >
                        <p className="text-red-400 text-sm mb-1">We don't have this game yet</p>
                        <button className="text-accent-start text-sm hover:underline">
                          Request it via feedback →
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Mobile Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Mobile</span>
                <div className="max-w-[280px] mx-auto space-y-2">
                  <input
                    type="text"
                    placeholder="Which game?"
                    className="w-full bg-card border-2 border-green-500/50 bg-green-500/5 rounded-lg px-4 py-3 text-sm text-foreground text-center"
                    value="Catan"
                    readOnly
                  />
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {["Catan", "Azul", "Chess"].map((game) => (
                      <span key={game} className="px-2.5 py-1 bg-card border border-border/50 rounded-full text-xs text-foreground">
                        {game}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Option 3: Full-Screen Game Picker Modal */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent-start/20 text-accent-start px-3 py-1 rounded-full text-sm font-medium">
                Option 3
              </span>
              <span className="text-foreground font-semibold">Full-Screen Picker (Mobile-First)</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Tapping input opens a full-screen game picker. Great for mobile, adapts to modal on desktop.
            </p>
            
            <div className="space-y-4">
              {/* Desktop Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Desktop (Modal)</span>
                <div className="max-w-md mx-auto">
                  <button
                    onClick={() => setFocused3(true)}
                    className="w-full bg-card border border-border rounded-xl px-5 py-4 text-foreground text-center hover:border-accent-start/50 transition-colors"
                  >
                    {selected3 || <span className="text-muted-foreground">Tap to select a game</span>}
                  </button>
                  
                  <AnimatePresence>
                    {focused3 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setFocused3(false)}
                      >
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                          onClick={(e) => e.stopPropagation()}
                          className="bg-card border border-border rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
                        >
                          <div className="p-4 border-b border-border">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <input
                                type="text"
                                value={input3}
                                onChange={(e) => setInput3(e.target.value)}
                                placeholder="Search games..."
                                className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none"
                                autoFocus
                              />
                            </div>
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            {hasNoMatch(input3) && input3.trim() ? (
                              <div className="p-6 text-center">
                                <AlertCircle className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                                <p className="text-foreground font-medium mb-1">"{input3}" not available</p>
                                <p className="text-muted-foreground text-sm mb-4">
                                  We're always adding new games!
                                </p>
                                <button 
                                  onClick={() => setFocused3(false)}
                                  className="gradient-accent px-4 py-2 rounded-lg text-foreground text-sm font-medium"
                                >
                                  Request this game
                                </button>
                              </div>
                            ) : (
                              filterGames(input3).map((game) => (
                                <button
                                  key={game}
                                  onClick={() => { setSelected3(game); setFocused3(false); }}
                                  className="w-full px-4 py-3 text-left text-foreground hover:bg-accent-start/10 transition-colors flex items-center gap-3 border-b border-border/30 last:border-0"
                                >
                                  <Gamepad2 className="w-5 h-5 text-accent-start" />
                                  <span>{game}</span>
                                </button>
                              ))
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Mobile Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Mobile (Full Screen)</span>
                <div className="max-w-[280px] mx-auto bg-background rounded-lg border border-border overflow-hidden">
                  <div className="p-3 border-b border-border flex items-center gap-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Search games...</span>
                    <button className="ml-auto text-accent-start text-sm">Cancel</button>
                  </div>
                  <div className="text-sm">
                    {availableGames.slice(0, 5).map((game) => (
                      <div key={game} className="px-3 py-2.5 border-b border-border/30 last:border-0 text-foreground flex items-center gap-2">
                        <Gamepad2 className="w-4 h-4 text-accent-start/70" />
                        {game}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Option 4: Combobox with Categories */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent-start/20 text-accent-start px-3 py-1 rounded-full text-sm font-medium">
                Option 4
              </span>
              <span className="text-foreground font-semibold">Combobox with Categories</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Groups games by category/popularity. Shows recent searches and trending games.
            </p>
            
            <div className="space-y-4">
              {/* Desktop Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Desktop</span>
                <div className="relative max-w-md mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={selected4 || input4}
                      onChange={(e) => { setInput4(e.target.value); setSelected4(null); }}
                      onFocus={() => setFocused4(true)}
                      onBlur={() => setTimeout(() => setFocused4(false), 200)}
                      placeholder="Which game are you playing?"
                      className="w-full bg-card border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-start/50"
                    />
                  </div>
                  
                  <AnimatePresence>
                    {focused4 && !selected4 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-10"
                      >
                        {hasNoMatch(input4) && input4.trim() ? (
                          <div className="p-4">
                            <div className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg mb-3">
                              <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5" />
                              <div>
                                <p className="text-foreground text-sm font-medium">Game not in our library</p>
                                <p className="text-muted-foreground text-xs mt-1">
                                  Want us to add "{input4}"? Use the feedback form to let us know!
                                </p>
                              </div>
                            </div>
                            <p className="text-muted-foreground text-xs mb-2">Try one of these instead:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {availableGames.slice(0, 4).map((game) => (
                                <button
                                  key={game}
                                  onClick={() => { setSelected4(game); setInput4(game); }}
                                  className="px-2.5 py-1 bg-background border border-border rounded-md text-xs text-foreground hover:border-accent-start/50"
                                >
                                  {game}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="max-h-64 overflow-y-auto">
                            {!input4.trim() && (
                              <>
                                <div className="px-3 py-2 bg-background/50">
                                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    🔥 Popular
                                  </span>
                                </div>
                                {["Catan", "Ticket to Ride", "Monopoly"].map((game) => (
                                  <button
                                    key={game}
                                    onClick={() => { setSelected4(game); setInput4(game); }}
                                    className="w-full px-4 py-2.5 text-left text-foreground hover:bg-accent-start/10 transition-colors"
                                  >
                                    {game}
                                  </button>
                                ))}
                                <div className="px-3 py-2 bg-background/50 border-t border-border/30">
                                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    🎲 Strategy
                                  </span>
                                </div>
                                {["Azul", "Wingspan", "7 Wonders"].map((game) => (
                                  <button
                                    key={game}
                                    onClick={() => { setSelected4(game); setInput4(game); }}
                                    className="w-full px-4 py-2.5 text-left text-foreground hover:bg-accent-start/10 transition-colors"
                                  >
                                    {game}
                                  </button>
                                ))}
                              </>
                            )}
                            {input4.trim() && filterGames(input4).map((game) => (
                              <button
                                key={game}
                                onClick={() => { setSelected4(game); setInput4(game); }}
                                className="w-full px-4 py-3 text-left text-foreground hover:bg-accent-start/10 transition-colors"
                              >
                                {game}
                              </button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Mobile Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Mobile</span>
                <div className="max-w-[280px] mx-auto">
                  <input
                    type="text"
                    placeholder="Which game?"
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground mb-2"
                    readOnly
                  />
                  <div className="bg-card border border-border rounded-lg overflow-hidden text-sm">
                    <div className="px-3 py-1.5 bg-background/50">
                      <span className="text-[10px] font-medium text-muted-foreground uppercase">🔥 Popular</span>
                    </div>
                    {["Catan", "Ticket to Ride"].map((game) => (
                      <div key={game} className="px-3 py-2 border-b border-border/30 text-foreground">
                        {game}
                      </div>
                    ))}
                    <div className="px-3 py-1.5 bg-background/50">
                      <span className="text-[10px] font-medium text-muted-foreground uppercase">🎲 Strategy</span>
                    </div>
                    <div className="px-3 py-2 text-foreground">Azul</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-12 bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background/50 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Option 1</h3>
              <p className="text-sm text-muted-foreground">Best for: Simple, familiar UX. Users expect dropdown autocomplete.</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Option 2</h3>
              <p className="text-sm text-muted-foreground">Best for: Quick selection with chips. Great for discovery.</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Option 3</h3>
              <p className="text-sm text-muted-foreground">Best for: Mobile-first apps. Full control over selection UX.</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Option 4</h3>
              <p className="text-sm text-muted-foreground">Best for: Large game libraries. Categories aid discovery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInputMockups;
