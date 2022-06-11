import React, { FC } from 'react'
import Volume, { VolumeProps } from './Volume'

interface ConfigPanelProps extends VolumeProps {

}

const ConfigPanel: FC<ConfigPanelProps> = ({volume, setVolume}) => {
  return (
    <div className='config-panel'>
      <Volume volume={volume} setVolume={setVolume}/>
    </div>
  )
}

export default ConfigPanel