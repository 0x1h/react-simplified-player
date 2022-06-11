import { DraggableType } from "../Components/PlayerDragger";

export const calculatePercentage = (e: DraggableType, element: any): number => {
    const { left } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;

    const getWidth = window.getComputedStyle(element.current!)
    const timeLineWidth = Number(getWidth.getPropertyValue("width").replace("px", ""))

    return Number(((x / timeLineWidth) * 100).toFixed(2))
}