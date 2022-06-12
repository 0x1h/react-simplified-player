import { useEffect, useRef, useState } from "react";
import SongContent from "./Components/SongContent";
import Player from "./Components/Player";
import { initialConfig, ConfigsTypes, LoopType } from "./typings/initialStates";
import ConfigPanel from "./Components/ConfigPanel";
import "./style/style.css"
import "./style/loader.css"
import { calculateSkip } from "./utils/calculateSkip";

export const repeatInitial: LoopType[] = ["none", "repeat", "repeat-song"]

const App = () => {
  const [control, setControl] = useState<ConfigsTypes>(initialConfig)
  const [loop, setLoop] = useState<number>(0)
  const playerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentDuration, setCurrentDuration] = useState(0)
  const [volume, setVolume] = useState<number>(0.5)
  const [songData, setSongData] = useState([{
    url: "https://cdns-preview-f.dzcdn.net/stream/c-ff22ec58ad90bb8192c694acd3bd9c6f-4.mp3"
  }])
  const [timeLapse, setTimeLapse] = useState({
    current: 0,
    full_length: 0
  })


  const onTimeUpdate = () => {

    const current = audioRef.current!.currentTime
    const duration = audioRef.current!.duration

    const percentage = ((current / duration) * 100).toFixed(1)
    setCurrentDuration(Number(percentage))
    
    setTimeLapse((prev) => {
      return {
        ...prev,
        current: audioRef.current!.currentTime
      }
    })
  }

  // useEffect(() => {
  //   calculateSkip(timeLapse.full_length, )
  // }, [currentDuration])
  

  const onTimeEnd = () => {
    setControl((prev) => {
      return {
        ...prev,
        playing: false
      }
    })
  }

  const onLoadAudio = () => {
    setTimeLapse((prev) => {
      return {
        ...prev,
        full_length: audioRef.current!.duration
      }
    })

  }

  useEffect(() => {
    audioRef.current!.addEventListener("timeupdate", onTimeUpdate)  
    audioRef.current!.addEventListener("ended", onTimeEnd)
    audioRef.current!.addEventListener("loadedmetadata", onLoadAudio)
    return () => {
      audioRef.current!.removeEventListener("timeupdate", onTimeUpdate)  
      audioRef.current!.removeEventListener("ended", onTimeEnd)
      audioRef.current!.removeEventListener("loadedmetadata", onLoadAudio)

    }
  })
  

  useEffect(() => {
    const audio = new Audio(songData[0].url)
    const duration = audio.duration

    setTimeLapse((prev) => {
      return {
        ...prev,
        full_length: duration
      }
    })

    audio.volume = volume
    audioRef.current!.load()
  }, [])

  useEffect(() => {
    if(control.playing) audioRef.current!.play();
    if(!control.playing) audioRef.current!.pause();
  }, [control])

    

  useEffect(() => {
    audioRef.current!.volume = volume 
    console.log(volume);
    
  }, [volume])

  const onChangeLoop = () => {
    const maxNum: number = repeatInitial.length - 1
    const setNextNumber: number = loop === maxNum ? 0 : loop + 1

    setLoop(setNextNumber)
  }


  const onControlChange = (key: keyof ConfigsTypes) => {
    const opositeValue: boolean = !control[key]

    setControl(prev => {
      return {
        ...prev,
        [key]: opositeValue
      }
    })
  }

  const onContextMenu = (e: MouseEvent) => {
    // e.preventDefault()
  }

  useEffect(() => {
    playerRef.current?.addEventListener("contextmenu", onContextMenu)
    return () => {
      playerRef.current?.removeEventListener("contextmenu", onContextMenu)
    }
  })

  return (
    <div className="App" ref={playerRef}>
      <div className="container">
        <SongContent
          song_cover={"https://upload.wikimedia.org/wikipedia/en/e/ea/Kesha_-_High_Road.png"}
          song_name={"Rising Hell"}
          artist={"Kesha"}
          isLoading={isLoading}
        />
        <Player
          {...control}
          ref={audioRef}
          src={songData[0].url}
          setDuration={(time) => setCurrentDuration(time)}
          toggleButton={(key) => onControlChange(key)}
          repeat={onChangeLoop}
          skipToTime={(to) => {
            audioRef.current!.currentTime = to
            setCurrentDuration(to)
          }}
          loop={loop}
          currentDutaion={currentDuration}
          total_length={timeLapse.full_length}
          current={timeLapse.current}
        />
        <ConfigPanel volume={volume} setVolume={(volumee) => setVolume(() => {
          
          if(volumee * 0.01 <= 0) return 0
          if(volumee * 0.01 >= 1) return 1

          return volumee * 0.01
        })} />
      </div>
    </div>
  );
}

export default App;
