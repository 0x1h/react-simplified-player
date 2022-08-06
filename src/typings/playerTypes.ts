export interface SongContentType {
  song_name?: string;
  artist?: string;
  song_cover?: string;
  isLoading: boolean;
}

export interface QueueType {
  song_cover?: string;
  song_title?: string;
  id?: string
  song_artist?: string;
  url: string;
}

export interface PlayerProps {
    mainColor: string,

    song?: QueueType,
    defaultVolume?: number,
    showQueue?: boolean,
    onVolumeChange?: (volume: number) => void,
    onAudioPlay?: (currentSong: QueueType) => void
    onAudioPause?: (currentSong: QueueType) => void, 
    onAudioEnded?: (currentSong: QueueType) => void,
    onForward?: (currentSong: QueueType) => void,
    onBack?: (currentSong: QueueType) => void
}