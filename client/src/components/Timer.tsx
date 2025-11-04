import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { parseDuration, formatTime, playStartChime, playIntervalChime, playEndChime } from "@/lib/audio";

interface TimerProps {
  durationStr: string;
  exerciseId: number;
}

export function Timer({ durationStr, exerciseId }: TimerProps) {
  const totalSeconds = parseDuration(durationStr);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const lastChimeRef = useRef<number>(0);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + 1;
          
          if (next >= totalSeconds) {
            setIsPlaying(false);
            playEndChime();
            return totalSeconds;
          }
          
          const currentMinute = Math.floor(next / 60);
          const lastChimeMinute = lastChimeRef.current;
          
          if (currentMinute > 0 && currentMinute > lastChimeMinute && currentMinute % 1 === 0) {
            playIntervalChime();
            lastChimeRef.current = currentMinute;
          }
          
          return next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, totalSeconds]);

  // Reset timer when exercise changes (user navigates to different card)
  useEffect(() => {
    setIsPlaying(false);
    setElapsedSeconds(0);
    lastChimeRef.current = 0;
    
    // Cleanup any running interval from previous exercise
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [exerciseId]);

  const handlePlayPause = () => {
    if (!isPlaying && elapsedSeconds === 0) {
      playStartChime();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setElapsedSeconds(0);
    lastChimeRef.current = 0;
  };

  const progress = totalSeconds > 0 ? (elapsedSeconds / totalSeconds) * 100 : 0;
  const remainingSeconds = totalSeconds - elapsedSeconds;

  return (
    <div className="w-full max-w-sm bg-card border rounded-xl p-4 space-y-3" data-testid={`timer-${exerciseId}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Guidad timer</div>
        <div className="text-sm font-medium text-foreground">{durationStr}</div>
      </div>

      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-primary transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
          data-testid="timer-progress-bar"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold tabular-nums" data-testid="timer-display">
          {formatTime(remainingSeconds)}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handlePlayPause}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground hover-elevate active-elevate-2 transition-all"
            aria-label={isPlaying ? "Pausa" : "Spela"}
            data-testid="button-timer-play-pause"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>
          
          <button
            onClick={handleReset}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground hover-elevate active-elevate-2 transition-all"
            aria-label="Återställ"
            data-testid="button-timer-reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        Mjuka ljud vid varje minut
      </div>
    </div>
  );
}
