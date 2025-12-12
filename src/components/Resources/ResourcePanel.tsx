import { FileText, Video } from "lucide-react";
import { RulebookViewer } from "./RulebookViewer";
import { VideoCard } from "./VideoCard";

interface ResourcePanelProps {
  game: string;
  highlightedSection?: string | null;
  onClearHighlight?: () => void;
}

export const ResourcePanel = ({ game, highlightedSection, onClearHighlight }: ResourcePanelProps) => {
  return (
    <aside className="h-full bg-[hsl(var(--bg-surface))] border-l border-border/50 overflow-y-auto">
      <div className="sticky top-0 bg-[hsl(var(--bg-surface))] border-b border-border/50 p-4 z-10">
        <h2 className="text-lg font-semibold text-foreground">Resources</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* Rulebook Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground/80">
            <FileText className="w-5 h-5" />
            <h3 className="font-semibold">Rulebook</h3>
          </div>
          <RulebookViewer 
            game={game} 
            highlightedSection={highlightedSection}
            onClearHighlight={onClearHighlight}
          />
        </div>

        {/* Video Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground/80">
            <Video className="w-5 h-5" />
            <h3 className="font-semibold">How to Play</h3>
          </div>
          <VideoCard game={game} />
        </div>
      </div>
    </aside>
  );
};
