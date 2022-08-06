import { RefObject } from "react";
import { DraggableType } from "../Components/Desktop/PlayerDragger";

export const calculatePercentage = (
  e: DraggableType,
  element: RefObject<HTMLElement>,
  startPosition: number,
  timelineBound: number
): number => {
  const getWidth = window.getComputedStyle(element.current!);
  const timeLineWidth = Number(
    getWidth.getPropertyValue("width").replace("px", "")
  );

  const fixBounding = timelineBound < 0 ? 0 : timelineBound;
  const dragHandler = e.clientX - startPosition + fixBounding;

  const dragInPercentage = Number((dragHandler / timeLineWidth) * 100);

  if (dragInPercentage > 100) return 100;
  if (dragInPercentage < 0) return 0;

  return dragInPercentage;
};
