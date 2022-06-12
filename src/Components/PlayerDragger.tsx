import { FC, useEffect, useRef, useState } from 'react'
import { formatSeconds } from '../utils/formatSeconds'
import { calculatePercentage } from "../utils/calculatePercentage"
import { calculateSkip } from '../utils/calculateSkip'

interface TimelineProps {
    currentDuration: number,
    setDuration: (time: number) => void,
    current: number,
    total_length: number,
    skipToTime: (to: number) => void
}

export type DraggableType = React.MouseEvent<HTMLElement>

const PlayerDragger: FC<TimelineProps> = ({ currentDuration, setDuration, current, total_length,skipToTime }) => {
    const timelineRef = useRef<HTMLDivElement>(null)
    const [beforeChangeTime, setBeforeChangeTime] = useState(currentDuration)
    const [pressed, setPressed] = useState(false)


    useEffect(() => {
        if(pressed) return
        
        setBeforeChangeTime(currentDuration)
    }, [currentDuration])

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
            <p className='current-time timelapse'>{pressed ? formatSeconds(calculateSkip(total_length, beforeChangeTime)) : formatSeconds(current)}</p>
            <div className="timeline-wrapper"
                ref={timelineRef}
                onMouseDown={(e) => {
                    setBeforeChangeTime(calculatePercentage(e, timelineRef))
                    setPressed(true)
                }}
                onMouseMove={onmousemove}
                onMouseUp={() => {
                    const skipTo: number =  calculateSkip(total_length, beforeChangeTime)
                    skipToTime(skipTo)
                }}
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