interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <div className="fixed right-3 z-10" style={{ bottom: 'max(0.75rem, calc(env(safe-area-inset-bottom) + 0.75rem))' }}>
      <div className="px-3 py-1.5 bg-foreground/10 backdrop-blur-sm rounded-full">
        <p className="text-sm font-medium text-foreground" data-testid="text-progress">
          {current}/{total}
        </p>
      </div>
    </div>
  );
}
