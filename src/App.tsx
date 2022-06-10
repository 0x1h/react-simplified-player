import { useEffect, useRef, useState } from "react";
import SongContent from "./Components/SongContent";
import Player from "./Components/Player";
import { initialConfig, ConfigsTypes, LoopType } from "./typings/initialStates";
import ConfigPanel from "./Components/ConfigPanel";
import "./style/style.css"

export const repeatInitial: LoopType[] = ["none", "repeat", "repeat-song"]

const App = () => {
  const [control, setControl] = useState<ConfigsTypes>(initialConfig)
  const [loop, setLoop] = useState<number>(0)
  const playerRef = useRef<HTMLDivElement>(null)
  const [currentDuration, setCurrentDuration] = useState(40)

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
        <SongContent song_cover={"https://upload.wikimedia.org/wikipedia/en/e/ea/Kesha_-_High_Road.png"} song_name={"Rising Hell"} artist={"Kesha"} />
        <Player 
          {...control}
          setDuration={(time) => setCurrentDuration(time)} 
          toggleButton={(key) => onControlChange(key)} 
          repeat={onChangeLoop} 
          loop={loop} 
          currentDutaion={currentDuration} 
          />
        <ConfigPanel />
      </div>
    </div>
  );
}

export default App;
