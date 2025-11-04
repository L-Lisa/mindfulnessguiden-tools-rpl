import { Share, PlusSquare, Chrome, MoreVertical } from "lucide-react";

export function InstallInstructions() {
  return (
    <div className="space-y-6 text-foreground">
      {/* iOS Safari Instructions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">För iOS - Safari:</h3>
        <ol className="space-y-3 text-base">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              1
            </span>
            <div className="flex-1">
              <p className="mb-2">Öppna "Dela-menyn" genom att trycka på delningsikonen</p>
              <div className="flex items-center gap-2 p-3 bg-background rounded-md">
                <Share className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Dela-ikon</span>
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              2
            </span>
            <div className="flex-1">
              <p className="mb-2">Välj "Lägg till på hemskärmen" från listan</p>
              <div className="flex items-center gap-2 p-3 bg-background rounded-md">
                <PlusSquare className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Lägg till på hemskärmen</span>
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              3
            </span>
            <div className="flex-1">
              <p>Välj "Lägg till" på nästa skärm för att bekräfta</p>
            </div>
          </li>
        </ol>
      </div>

      {/* Android Chrome Instructions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">För Android - Chrome:</h3>
        <ol className="space-y-3 text-base">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              1
            </span>
            <div className="flex-1">
              <p className="mb-2">Tryck på menyknappen (tre punkter)</p>
              <div className="flex items-center gap-2 p-3 bg-background rounded-md">
                <MoreVertical className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Meny</span>
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              2
            </span>
            <div className="flex-1">
              <p className="mb-2">Välj "Lägg till på startskärmen"</p>
              <div className="flex items-center gap-2 p-3 bg-background rounded-md">
                <Chrome className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Lägg till på startskärmen</span>
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              3
            </span>
            <div className="flex-1">
              <p>Bekräfta genom att trycka "Lägg till"</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
