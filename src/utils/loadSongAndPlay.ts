export const loadSongAndPlay = (audioRef: any) => {
    audioRef.current?.pause()
    audioRef.current?.load()
    audioRef.current?.play()
  }