import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LandingLayout } from "@/components/Landing/LandingLayout";
import { GreetingText } from "@/components/Landing/GreetingText";
import { InteractiveSentence } from "@/components/Landing/InteractiveSentence";
import { ShortcutChips } from "@/components/Landing/ShortcutChips";

const Index = () => {
  const navigate = useNavigate();
  const [selectedIntent, setSelectedIntent] = useState("rules");

  const handleSubmit = (intent: string, game: string) => {
    navigate("/chat", { state: { intent, game } });
  };

  const handleShortcutClick = (intent: string) => {
    setSelectedIntent(intent);
  };

  return (
    <LandingLayout>
      <GreetingText />
      <InteractiveSentence 
        onSubmit={handleSubmit} 
        selectedIntent={selectedIntent}
        setSelectedIntent={setSelectedIntent}
      />
      <ShortcutChips onSelect={handleShortcutClick} />
    </LandingLayout>
  );
};

export default Index;
