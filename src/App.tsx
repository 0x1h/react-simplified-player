import { useEffect, useRef, useState } from "react";
import SongContent from "./Components/Desktop/SongContent";
import Player from "./Components/Desktop/Player";
import { initialConfig, ConfigsTypes, LoopType } from "./typings/initialStates";
import ConfigPanel from "./Components/Desktop/ConfigPanel";
import { loopSong } from "./utils/loopSong";
import { loadSongAndPlay } from "./utils/loadSongAndPlay";
import { QueueType } from "./typings/playerTypes";
import MobilePlayer from "./Components/Mobile/MobilePlayer";
import "./style/style.css";
import "./style/loader.css";
import "./style/mobile-style.css";

export const repeatInitial: LoopType[] = ["none", "repeat", "repeat-song"];

const ReactSimplifiedPlayer = () => {
  const [control, setControl] = useState<ConfigsTypes>(initialConfig);
  const [loop, setLoop] = useState<number>(0);
  const playerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [volume, setVolume] = useState<number>(0.5);
  const [windowWidth, setWindowWith] = useState(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popUp, setPopUp] = useState(false)
  const [songData, setSongData] = useState<QueueType[]>([
    {
      song_cover:
        "https://i.scdn.co/image/ab67616d0000b273861f0d79ff28c0206bb34474",
      song_title: "Die Young ",
      song_artist: "Ke$ha",
      url: "https://cdns-preview-f.dzcdn.net/stream/c-ff22ec58ad90bb8192c694acd3bd9c6f-4.mp3",
    },
    {
      song_cover:
        "https://upload.wikimedia.org/wikipedia/en/f/f8/Kesha_-_Rainbow_%28Official_Album_Cover%29.png",
      song_title: "Praying",
      song_artist: "Kesha",
      url: "https://cdns-preview-4.dzcdn.net/stream/c-43f197ffaae18e3b1d91f067fbd30bf7-6.mp3",
    },
    {
      song_cover: "",
      song_title: "",
      song_artist: "",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  ]);
  const [timeLapse, setTimeLapse] = useState({
    current: 0,
    full_length: 0,
  });
  

  const onEndedAudio = () => {
    if (repeatInitial[loop] === "none") return;

    if (repeatInitial[loop] === "repeat") {
      setCurrentIndex((prev) => loopSong(prev, songData));
      return loadSongAndPlay(audioRef);
    }

    if (repeatInitial[loop] === "repeat-song") {
      audioRef.current!.currentTime = 0;
      setControl((prev) => {
        return {
          ...prev,
          playing: true,
        };
      });
    }
  };

  const onTimeUpdate = () => {
    const current = audioRef.current!.currentTime;
    const duration = audioRef.current!.duration;

    const percentage = ((current / duration) * 100).toFixed(1);
    setCurrentDuration(Number(percentage));

    setTimeLapse((prev) => {
      return {
        ...prev,
        current: audioRef.current!.currentTime,
      };
    });
  };

  useEffect(() => {
    setControl((prev) => {
      return {
        ...prev,
        playing: false,
      };
    });
    loadSongAndPlay(audioRef);
    setControl((prev) => {
      return {
        ...prev,
        playing: true,
      };
    });
  }, [currentIndex]);

  const onTimeEnd = () => {
    setControl((prev) => {
      return {
        ...prev,
        playing: false,
      };
    });
  };

  const onLoadAudio = () => {
    setIsLoading(true);
    setTimeLapse((prev) => {
      return {
        ...prev,
        full_length: audioRef.current!.duration,
      };
    });
    setIsLoading(false);
  };

  const onWindowResize = () => {
    setWindowWith(window.innerWidth);
  };
  

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", onTimeUpdate);
    audioRef.current?.addEventListener("ended", onTimeEnd);
    audioRef.current?.addEventListener("canplaythrough", onLoadAudio);
    audioRef.current?.addEventListener("ended", onEndedAudio, false);
    window.addEventListener("resize", onWindowResize);
    return () => {
      audioRef.current?.removeEventListener("timeupdate", onTimeUpdate);
      audioRef.current?.removeEventListener("ended", onTimeEnd);
      audioRef.current?.removeEventListener("canplaythrough", onLoadAudio);
      audioRef.current?.removeEventListener("ended", onEndedAudio, false);
      window.removeEventListener("resize", onWindowResize);
    };
  });

  useEffect(() => {
    if (songData.length === 0) return;

    const audio = new Audio(songData[currentIndex].url);
    const duration = audio.duration;

    setTimeLapse((prev) => {
      return {
        ...prev,
        full_length: duration,
      };
    });

    audio.volume = volume;
    audioRef.current!.load();
    setControl((prev) => {
      return {
        ...prev,
        playing: false,
      };
    });
  }, []);

  useEffect(() => {
    if (control.playing) audioRef.current!.play();
    if (!control.playing) audioRef.current!.pause();
  }, [control]);

  useEffect(() => {
    audioRef.current!.volume = volume;
  }, [volume]);

  const onChangeLoop = () => {
    const maxNum: number = repeatInitial.length - 1;
    const setNextNumber: number = loop === maxNum ? 0 : loop + 1;

    setLoop(setNextNumber);
  };

  const backToSong = () => {
    setCurrentIndex((prev) => {
      const lastSongIndex: number = songData.length - 1;

      if (prev - 1 <= -1) return lastSongIndex;
      return prev - 1;
    });
  };

  const forwardSong = () => {
    setCurrentIndex((prev) => {
      if (prev + 1 === songData.length) return 0;
      return prev + 1;
    });
  };

  const setDuration = (time: number) => {
    setCurrentDuration(time);
    setControl((prev) => {
      return {
        ...prev,
        playing: true,
      };
    });
  };

  const onControlChange = (key: keyof ConfigsTypes) => {
    const opositeValue: boolean = !control[key];

    setControl((prev) => {
      return {
        ...prev,
        [key]: opositeValue,
      };
    });
  };

  const onContextMenu = (e: MouseEvent) => {
    // e.preventDefault()
  };

  useEffect(() => {
    playerRef.current?.addEventListener("contextmenu", onContextMenu);
    return () => {
      playerRef.current?.removeEventListener("contextmenu", onContextMenu);
    };
  });

  return (
    <>
      <div className="container" ref={playerRef}>
        <SongContent
        openPlayer={() => setPopUp(true)}
          windowWidth={windowWidth}
          song_cover={
            songData[currentIndex]?.song_cover == null
              ? ""
              : songData[currentIndex].song_cover
          }
          song_name={
            songData[currentIndex]?.song_title == null
              ? ""
              : songData[currentIndex].song_title?.trim()
          }
          artist={
            songData[currentIndex]?.song_artist?.trim() == null
              ? ""
              : songData[currentIndex].song_artist?.trim()
          }
          isLoading={isLoading}
        />
        <Player
          {...control}
          isSongLoaded={songData.length !== 0 ?? false}
          backSong={backToSong}
          forwardSong={forwardSong}
          ref={audioRef}
          song_uri={songData[currentIndex]?.url}
          setDuration={(time) => setDuration(time)}
          toggleButton={(key) => onControlChange(key)}
          repeat={onChangeLoop}
          skipToTime={(to) => {
            audioRef.current!.currentTime = to;
            setCurrentDuration(to);
          }}
          loop={loop}
          currentDutaion={currentDuration}
          total_length={timeLapse.full_length}
          current={timeLapse.current}
        />
        <ConfigPanel
          volume={volume}
          setVolume={(volumee) =>
            setVolume(() => {
              if (volumee * 0.01 <= 0) return 0;
              if (volumee * 0.01 >= 1) return 1;

              return volumee * 0.01;
            })
          }
        />
        <div className="small-time-lapse">
          <div
            className="small-current-time"
            style={{
              width: `${currentDuration}%`,
            }}
          />
        </div>
      </div>
      {
        windowWidth <= 768 &&
        <MobilePlayer
        {...control}
        onPopUp={() => setPopUp(false)}
        isSongLoaded={songData.length !== 0 ?? false}
          backSong={backToSong}
          forwardSong={forwardSong}
          popUp={popUp}
          ref={audioRef}
          song_uri={songData[currentIndex]?.url}
          setDuration={(time) => setDuration(time)}
          toggleButton={(key) => onControlChange(key)}
          repeat={onChangeLoop}
          skipToTime={(to) => {
            audioRef.current!.currentTime = to;
            setCurrentDuration(to);
          }}
          loop={loop}
          currentDutaion={currentDuration}
          total_length={timeLapse.full_length}
          current={timeLapse.current}
        src={
          songData[currentIndex]?.song_cover === undefined
            ? ""
            : (songData[currentIndex]?.song_cover as string)
        }
        song_name={
          songData[currentIndex]?.song_title === undefined
            ? ""
            : songData[currentIndex].song_title?.trim()
        }
        song_artist={
          songData[currentIndex]?.song_artist?.trim() === undefined
            ? ""
            : songData[currentIndex].song_artist?.trim()
        }
      />
      }
    </>
  );
};

export default ReactSimplifiedPlayer;
