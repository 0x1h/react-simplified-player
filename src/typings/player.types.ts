import { ConfigsTypes } from "./initialStates";

export interface PlayerProps {
  toggleButton: (key: keyof ConfigsTypes) => void;
  repeat: () => void;
  setDuration: (time: number) => void;
  skipToTime: (to: number) => void;
  backSong: () => void;
  forwardSong: () => void;
  playing: boolean;
  shuffle: boolean;
  loop: number;
  currentDutaion: number;
  current: number;
  total_length: number;
  song_uri: string;
  isSongLoaded: boolean;
  color: string
}