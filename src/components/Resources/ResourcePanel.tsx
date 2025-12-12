import { FileText, Video } from "lucide-react";
import { PDFViewer } from "./PDFViewer";
import { VideoCard } from "./VideoCard";

interface ResourcePanelProps {
  game: string;
}

export const ResourcePanel = ({ game }: ResourcePanelProps) => {
  return (
    <aside className="h-full w-full bg-bga-surface overflow-y-auto">
      <div className="sticky top-0 bg-bga-surface border-b border-border/50 p-4 hidden md:block">
        <h2 className="text-lg font-semibold text-foreground">Resources</h2>
      </div>
      <div className="p-4 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground/80">
            <FileText className="w-5 h-5" />
            <h3 className="font-semibold">Rulebook</h3>
          </div>
          <PDFViewer game={game} />
        </div>
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
