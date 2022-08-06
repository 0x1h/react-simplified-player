import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeHigh,
  faVolumeLow,
  faVolumeOff,
  faVolumeXmark,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FC, useEffect, useRef, useState } from "react";
import { calculatePercentage } from "../../utils/calculatePercentage";
import { VolumeIcon } from "./VolumeIcon";
import { DraggableType } from "./PlayerDragger";

export interface VolumeProps {
  volume: number;
  setVolume: (volume: number) => void;
  openQueue: () => void;
  color: string;
  showQueue: boolean;
}

const Volume: FC<VolumeProps> = ({
  volume,
  setVolume,
  openQueue,
  color,
  showQueue,
}) => {
  const volumeRef = useRef<HTMLDivElement>(null);
  const [pressed, setPressed] = useState<boolean>(false);
  const [beforeValue, setBeforeValue] = useState<number>(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setBeforeValue(volume * 100);
  }, []);

  const onmousemove = (e: DraggableType) => {
    if (!pressed) return;
    if (beforeValue >= 100 || beforeValue <= 0) return;

    const dragged: number = calculatePercentage(e, volumeRef);
    setBeforeValue(dragged);
    setVolume(beforeValue);
  };

  const moveUpEvent = (e: MouseEvent) => {
    if (!pressed) return;

    setPressed(false);
    setPressed(false);
    setVolume(beforeValue);
  };

  useEffect(() => {
    window.addEventListener("mouseup", moveUpEvent);

    return () => {
      window.removeEventListener("mouseup", moveUpEvent);
    };
  });

  return (
    <div className="volume">
      {showQueue && (
        <div className="volume-icon-box pointer" onClick={openQueue}>
          <FontAwesomeIcon icon={faLayerGroup} color={"#FFF"} />
        </div>
      )}
      <VolumeIcon beforeValue={beforeValue}/>
      <div
        className="volume-wrapper"
        ref={volumeRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseDown={(e) => {
          setBeforeValue(calculatePercentage(e, volumeRef));
          setPressed(true);
        }}
        onMouseMove={onmousemove}
      >
        <div
          className="current-volume"
          style={{
            width: `${beforeValue}%`,
            backgroundColor: isHovering ? `${color}` : "#FFF",
          }}
        />
      </div>
    </div>
  );
};

export default Volume;
