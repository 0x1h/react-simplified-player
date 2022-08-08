import {
  faVolumeHigh,
  faVolumeLow,
  faVolumeOff,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {FC} from 'react'

interface VolumeIconsProps {
  beforeValue: number
}


export const VolumeIcon: FC<VolumeIconsProps> = ({beforeValue}) => {
  return (
    <div className="volume-icon-box">
        {beforeValue >= 75 && (
          <FontAwesomeIcon icon={faVolumeHigh as IconProp} color={"#FFF"} />
        )}
        {beforeValue < 75 && beforeValue > 25 && (
          <FontAwesomeIcon icon={faVolumeLow as IconProp} color={"#FFF"} />
        )}
        {beforeValue < 25 && beforeValue > 0 && (
          <FontAwesomeIcon icon={faVolumeOff as IconProp} color={"#FFF"} />
        )}
        {beforeValue <= 0 && (
          <FontAwesomeIcon icon={faVolumeXmark as IconProp} color={"#FFF"} />
        )}
      </div>
  )
}
