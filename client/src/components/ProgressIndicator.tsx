interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 z-10" style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
      <div className="px-4 py-2 bg-foreground/10 backdrop-blur-sm rounded-full">
        <p className="text-sm font-medium text-foreground" data-testid="text-progress">
          Kort {current} av {total}
        </p>
      </div>
    </div>
  );
}
