import { FC } from 'react'
import Volume, { VolumeProps } from "./Volume"

const ConfigPanel: FC<VolumeProps> = ({volume, setVolume}) => {
  return (
    <div className='config-panel'>
      <Volume volume={volume} setVolume={setVolume}/>
    </div>
  )
}

export default ConfigPanel