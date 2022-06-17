import { FC, useEffect, useRef, useState } from "react";
import { formatSeconds } from "../../utils/formatSeconds";
import { calculatePercentage } from "../../utils/calculatePercentage";
import { calculateSkip } from "../../utils/calculateSkip";

interface TimelineProps {
  currentDuration: number;
  setDuration: (time: number) => void;
  isSongLoaded: boolean;
  current: number;
  total_length: number;
  skipToTime: (to: number) => void;
  color: string
}

export type DraggableType = React.MouseEvent<HTMLElement>;

const PlayerDragger: FC<TimelineProps> = (props) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [beforeChangeTime, setBeforeChangeTime] = useState(
    props.currentDuration
  );
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (pressed) return;

    setBeforeChangeTime(props.currentDuration);
  }, [props.currentDuration]);

  const onmousemove = (e: DraggableType) => {
    if (!pressed) return;
    if (beforeChangeTime >= 100) return;
    if (!props.isSongLoaded) return;

    const dragged: number = calculatePercentage(e, timelineRef);
    setBeforeChangeTime(dragged);
  };

  const moveUpEvent = () => {
    if (pressed) {
      setPressed(false);
      setPressed(false);
      props.setDuration(beforeChangeTime);
    }
  };

  useEffect(() => {
    window.addEventListener("mouseup", moveUpEvent);

    return () => {
      window.removeEventListener("mouseup", moveUpEvent);
    };
  });

  return (
    <div className="player-dragger" draggable={false}>
      <p className="current-time timelapse" draggable={false}>
        {pressed
          ? formatSeconds(calculateSkip(props.total_length, beforeChangeTime))
          : formatSeconds(props.current)}
      </p>
      <div
        className={props.isSongLoaded ? "timeline-wrapper" : "timeline-wrapper forbidden"}
        ref={timelineRef}
        onPointerDown={(e) => {
          if (!props.isSongLoaded) return;

          setBeforeChangeTime(calculatePercentage(e, timelineRef));
          setPressed(true);
        }}
        onPointerMove={onmousemove}
        onPointerUp={() => {
          if (!props.isSongLoaded) return;

          const skipTo: number = calculateSkip(
            props.total_length,
            beforeChangeTime
          );
          props.skipToTime(skipTo);
        }}
      >
        <div
          className="current-drag"
          style={{
            width: `${beforeChangeTime}%`,
            background: `${props.color}`
          }}
        ></div>
      </div>
      <p
        className="full-time timelapse"
        style={{
          transform: "translateX(10px)",
        }}
        draggable={false}
      >
        {formatSeconds(props.total_length)}
      </p>
      
    </div>
  );
};

export default PlayerDragger;
