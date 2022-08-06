import React, { FC } from 'react'
import Volume, { VolumeProps } from "./Volume"

const ConfigPanel: FC<VolumeProps> = ({volume, setVolume, openQueue, color, showQueue}) => {
  return (
    <div className='config-panel'>
      <Volume volume={volume} setVolume={setVolume} openQueue={openQueue} color={color} showQueue={showQueue}/>
    </div>
  )
}

export default ConfigPanel