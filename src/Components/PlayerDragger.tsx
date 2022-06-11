import { FC, useEffect, useRef, useState } from 'react'
import { formatSeconds } from '../utils/formatSeconds'
import { calculatePercentage } from "../utils/calculatePercentage"

interface TimelineProps {
    currentDuration: number,
    setDuration: (time: number) => void,
    current: number,
    total_length: number
}

export type DraggableType = React.MouseEvent<HTMLElement>

const PlayerDragger: FC<TimelineProps> = ({ currentDuration, setDuration, current, total_length }) => {
    const timelineRef = useRef<HTMLDivElement>(null)
    const [beforeChangeTime, setBeforeChangeTime] = useState(currentDuration)
    const [pressed, setPressed] = useState(false)

    // const onclick = (e: DraggableType) => {
    //     const dragged: number = calculatePercentage(e)
    //     setBeforeChangeTime(dragged)
    // }

    const onmousemove = (e: DraggableType) => {
        if (!pressed) return
        if (beforeChangeTime >= 100) return

        const dragged: number = calculatePercentage(e, timelineRef)
        setBeforeChangeTime(dragged)
    }

    const moveUpEvent = () => {
        if (pressed) {
            setPressed(false)
            setPressed(false)
            setDuration(beforeChangeTime)
        }
    }

    useEffect(() => {
        window.addEventListener("mouseup", moveUpEvent)

        return () => {
            window.removeEventListener("mouseup", moveUpEvent)
        }
    })

    return (
        <div className="player-dragger">
            <p className='current-time timelapse'>{formatSeconds(current)}</p>
            <div className="timeline-wrapper"
                ref={timelineRef}
                onMouseDown={(e) => {
                    setBeforeChangeTime(calculatePercentage(e, timelineRef))
                    setPressed(true)
                }}
                onMouseMove={onmousemove}

            >
                <div className="current-drag" style={{
                    width: `${beforeChangeTime}%`
                }}></div>
            </div>
            <p className='full-time timelapse' style={{
                transform: "translateX(10px)"
            }}>{formatSeconds(total_length)}</p>
        </div>
    )
}

export default PlayerDragger