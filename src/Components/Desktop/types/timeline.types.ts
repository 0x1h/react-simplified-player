export interface TimelineProps {
  currentDuration: number;
  setDuration: (time: number) => void;
  isSongLoaded: boolean;
  current: number;
  total_length: number;
  skipToTime: (to: number) => void;
  color: string
}