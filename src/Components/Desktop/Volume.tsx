import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import React, { FC, useEffect, useRef, useState } from "react";
import { calculatePercentage } from "../../utils/calculatePercentage";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { VolumeIcon } from "./VolumeIcon";

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
  const [startPosition, setStartPosition] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [timelineBound, setTimeLineBound] = useState(0);

  useEffect(() => {
    setBeforeValue(volume * 100);
  }, []);

  const onmousemove = (e: MouseEvent) => {
    if (!pressed) return;
    if (beforeValue >= 100) return;

    const dragged: number = calculatePercentage(
      e as any,
      volumeRef,
      startPosition,
      timelineBound
    );

    setBeforeValue(dragged);
    setVolume(beforeValue);
  };

  const mouseDown = (e: MouseEvent) => {
    if (volumeRef.current && volumeRef.current.contains(e.target as Node)) {
      setStartPosition(e.clientX);
      setBeforeValue(
        calculatePercentage(e as any, volumeRef, startPosition, timelineBound)
      );
      setPressed(true);
    }
  };

  const moveUpEvent = () => {
    if (!pressed) return;

    setVolume(beforeValue);
    setPressed(false);
  };

  useEffect(() => {
    window.addEventListener("mouseup", moveUpEvent);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", onmousemove);

    return () => {
      window.removeEventListener("mouseup", moveUpEvent);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mousemove", onmousemove);
    };
  });

  return (
    <div className="volume-dragger">
      {showQueue && (
        <div className="volume-icon-box pointer" onClick={openQueue}>
          <FontAwesomeIcon icon={faLayerGroup as IconProp} color={"#FFF"} />
        </div>
      )}
      <VolumeIcon beforeValue={beforeValue} />
      <div
        className="volume-wrapper"
        ref={volumeRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseDown={(e) => {
          setStartPosition(e.clientX);
          const { left } = e.currentTarget.getBoundingClientRect();
          setTimeLineBound(e.clientX - left);
        }}
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
