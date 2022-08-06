import { FC, useEffect, useRef, useState } from "react";
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
  const { beforeChangeTime, setBeforeChangeTime } = useBeforeChangeTime(
    props.currentDuration,
    pressed
  );

  const onmousemove = (e: DraggableType) => {
    if (!pressed) return;
    if (beforeChangeTime >= 100) return;
    if (!props.isSongLoaded) return;

    const dragged: number = calculatePercentage(e, timelineRef);
    setBeforeChangeTime(dragged);
  };

  const moveUpEvent = (e: MouseEvent) => {
    if (!props.isSongLoaded) return;

    if (
      timelineRef.current &&
      !timelineRef.current.contains(e.target as Node)
    ) {
      const skipTo: number = calculateSkip(
        props.total_length,
        beforeChangeTime
      );
      // props.skipToTime(skipTo);
    }
  };

  const mouseDown = (e: MouseEvent) => {
    if (!props.isSongLoaded) return;
    if (timelineRef.current && timelineRef.current.contains(e.target as Node)) {
      console.log(true);
      
      // setBeforeChangeTime(calculatePercentage(e as any, timelineRef));
      setPressed(true);
      console.log(e.clientX)
      setStartPosition(e.clientX);
    }
  };

  console.log(pressed);

  const mouseMove = (e: MouseEvent) => {
    console.log({
      eClientX:e.clientX,
      startPosition,
      crr: props.currentDuration
    })
    const mustBe = (e.clientX - startPosition) + props.currentDuration;

    console.log("mustBe:", mustBe);
  };

  useEffect(() => {
    window.addEventListener("mouseup", moveUpEvent);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mouseup", moveUpEvent);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

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
