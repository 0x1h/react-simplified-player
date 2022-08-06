import { RefObject } from "react";

export const loadSongAndPlay = (audioRef: RefObject<HTMLAudioElement>) => {
  const playPromise = audioRef.current?.play();

  audioRef.current?.pause()
  audioRef.current?.load()

  var isPlaying =
    audioRef.current!.currentTime > 0 &&
    !audioRef.current!.paused &&
    !audioRef.current?.ended &&
    audioRef.current!.readyState > audioRef.current!.HAVE_CURRENT_DATA;

  if (playPromise !== undefined) {
    playPromise.then((_) => {
      audioRef.current?.load();
      if (!isPlaying) {
        audioRef.current?.play();
      }
    });
  }
};
