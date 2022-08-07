import React, { FC, useEffect, useRef, useState } from "react";
import { formatSeconds } from "../../utils/formatSeconds";
import { TimelineProps } from "./types/timeline.types";
import { calculatePercentage } from "../../utils/calculatePercentage";
import { calculateSkip } from "../../utils/calculateSkip";
import { useBeforeChangeTime } from "./hooks/useBeforeChangeTime";

export type DraggableType = React.MouseEvent<HTMLElement>;

const PlayerDragger: FC<TimelineProps> = (props) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [pressed, setPressed] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [timelineBound, setTimeLineBound] = useState(0);
  const { beforeChangeTime, setBeforeChangeTime } = useBeforeChangeTime(
    props.currentDuration,
    pressed
  );

  const onmousemove = (e: MouseEvent | TouchEvent) => {
    if (!pressed) return;
    if (beforeChangeTime >= 100) return;
    if (!props.isSongLoaded) return;

    const dragged: number = calculatePercentage(
      e as any,
      timelineRef,
      startPosition,
      timelineBound
    );

    setBeforeChangeTime(dragged);
  };

  const moveUpEvent = () => {
    if (!pressed) return;

    const skipTo: number = calculateSkip(props.total_length, beforeChangeTime);
    if(isNaN(skipTo)) return
    
    props.skipToTime(skipTo);
    setPressed(false);
  };

  const mouseDown = (e: MouseEvent) => {
    if (!props.isSongLoaded) return;
    if (timelineRef.current && timelineRef.current.contains(e.target as Node)) {
      setStartPosition(e.clientX);
      setBeforeChangeTime(
        calculatePercentage(e as any, timelineRef, startPosition, timelineBound)
      );
      setPressed(true);
    }
  };
  

  const onTouchDown = (e: TouchEvent) => {
    if (!props.isSongLoaded) return;
    if (timelineRef.current && timelineRef.current.contains(e.target as Node)) {
      setStartPosition(e.touches[0].clientX);
      setBeforeChangeTime(
        calculatePercentage(e as any, timelineRef, startPosition, timelineBound)
      );
      setPressed(true);
    }
  };

  const ontouchmove = (e: TouchEvent) => {
    if (!pressed) return;
    if (beforeChangeTime >= 100) return;
    if (!props.isSongLoaded) return;

    const dragged: number = calculatePercentage(
      e.touches[0] as any,
      timelineRef,
      startPosition,
      timelineBound
    );

    setBeforeChangeTime(dragged);
  };


  useEffect(() => {
    window.addEventListener("mouseup", moveUpEvent);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", onmousemove);

    window.addEventListener("touchend", moveUpEvent);
    window.addEventListener("touchstart", onTouchDown);
    window.addEventListener("touchmove", ontouchmove);

    return () => {
      window.removeEventListener("mouseup", moveUpEvent);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mousemove", onmousemove);

      window.removeEventListener("touchend", moveUpEvent);
      window.removeEventListener("touchstart", onTouchDown);
      window.removeEventListener("touchmove", ontouchmove);
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
        className={
          props.isSongLoaded ? "timeline-wrapper" : "timeline-wrapper forbidden"
        }
        ref={timelineRef}
        onPointerDown={(e) => {
          setStartPosition(e.clientX);
          const { left } = e.currentTarget.getBoundingClientRect();
          setTimeLineBound(e.clientX - left);
        }}
      >
        <div
          className="current-drag"
          style={{
            width: `${beforeChangeTime}%`,
            background: `${props.color}`,
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
