import {
  faVolumeHigh,
  faVolumeLow,
  faVolumeOff,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FC} from 'react'

interface VolumeIconsProps {
  beforeValue: number
}


export const VolumeIcon: FC<VolumeIconsProps> = ({beforeValue}) => {
  return (
    <div className="volume-icon-box">
        {beforeValue >= 75 && (
          <FontAwesomeIcon icon={faVolumeHigh} color={"#FFF"} />
        )}
        {beforeValue < 75 && beforeValue > 25 && (
          <FontAwesomeIcon icon={faVolumeLow} color={"#FFF"} />
        )}
        {beforeValue < 25 && beforeValue > 0 && (
          <FontAwesomeIcon icon={faVolumeOff} color={"#FFF"} />
        )}
        {beforeValue <= 0 && (
          <FontAwesomeIcon icon={faVolumeXmark} color={"#FFF"} />
        )}
      </div>
  )
}
