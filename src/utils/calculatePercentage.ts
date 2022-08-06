import { RefObject } from 'react';
import { DraggableType } from "../Components/Desktop/PlayerDragger";

export const calculatePercentage = (e: DraggableType, element: RefObject<HTMLElement>): number => {
    // const { left } = e.currentTarget.getBoundingClientRect();
    // const x = e.clientX - left;

    // const getWidth = window.getComputedStyle(element.current!)
    // const timeLineWidth = Number(getWidth.getPropertyValue("width").replace("px", ""))

    // const duration = Number(((x / timeLineWidth) * 100).toFixed(2))

    // console.log("calculatePercentage:",duration)

    // return duration
    return 0
}