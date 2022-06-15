import { FC } from 'react'
import Volume, { VolumeProps } from "./Volume"

const ConfigPanel: FC<VolumeProps> = ({volume, setVolume, openQueue}) => {
  return (
    <div className='config-panel'>
      <Volume volume={volume} setVolume={setVolume} openQueue={openQueue}/>
    </div>
  )
}

export default ConfigPanel