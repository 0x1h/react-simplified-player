import { useEffect, useRef, useState } from "react";
import SongContent from "./Components/SongContent";
import Player from "./Components/Player";
import { initialConfig, ConfigsTypes, LoopType } from "./typings/initialStates";
import ConfigPanel from "./Components/ConfigPanel";
import "./style/style.css"
import "./style/loader.css"

export const repeatInitial: LoopType[] = ["none", "repeat", "repeat-song"]

const App = () => {
  const [control, setControl] = useState<ConfigsTypes>(initialConfig)
  const [loop, setLoop] = useState<number>(0)
  const playerRef = useRef<HTMLDivElement>(null)
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
  const [currentSong, setCurrentSong] = useState(new Audio())


  const onTimeUpdate = () => {
    setTimeLapse((prev) => {
      return {
        ...prev,
        current: currentSong.currentTime
      }
    })
  }

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
        full_length: currentSong.duration
      }
    })

  }

  useEffect(() => {
    currentSong.addEventListener("timeupdate", onTimeUpdate)  
    currentSong.addEventListener("ended", onTimeEnd)
    currentSong.addEventListener("loadedmetadata", onLoadAudio)
    return () => {
      currentSong.removeEventListener("timeupdate", onTimeUpdate)  
      currentSong.removeEventListener("ended", onTimeEnd)
      currentSong.removeEventListener("loadedmetadata", onLoadAudio)

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

    setCurrentSong(audio) 
    currentSong.load()
  }, [])

  useEffect(() => {
    if(control.playing) currentSong.play();
    if(!control.playing) currentSong.pause();
  }, [control])

    

  useEffect(() => {
    const audio = new Audio(songData[0].url)
    audio.volume = volume

    setCurrentSong(audio) 
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
          setDuration={(time) => setCurrentDuration(time)}
          toggleButton={(key) => onControlChange(key)}
          repeat={onChangeLoop}
          loop={loop}
          currentDutaion={currentDuration}
          total_length={timeLapse.full_length}
          current={timeLapse.current}
        />
        <ConfigPanel volume={volume} setVolume={(volume) => setVolume(() => {
          if(volume <= 0) return 0
          if(volume >= 1) return 1

          return volume
        })} />
      </div>
    </div>
  );
}

export default App;
