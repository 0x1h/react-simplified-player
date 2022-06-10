import { FC, useEffect, useRef, useState } from 'react'

interface TimelineProps {
    currentDuration: number,
    setDuration: (time: number) => void
}

const PlayerDragger: FC<TimelineProps> = ({ currentDuration, setDuration }) => {
    const timelineRef = useRef<HTMLDivElement>(null)
    const [beforeChangeTime, setBeforeChangeTime] = useState(currentDuration)
    const [pressed, setPressed] = useState(false)


    const calculatePercentage = (e: React.MouseEvent<HTMLElement>): number => {
        const { left } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;

        const getWidth = window.getComputedStyle(timelineRef.current!)
        const timeLineWidth = Number(getWidth.getPropertyValue("width").replace("px", ""))

        return Number(((x / timeLineWidth) * 100).toFixed(2))
    }

    const onclick = (e: React.MouseEvent<HTMLElement>) => {
        const dragged: number = calculatePercentage(e)
        setBeforeChangeTime(dragged)
    }
    const onmousemove = (e: React.MouseEvent<HTMLElement>) => {
        if (!pressed) return
        const dragged: number = calculatePercentage(e)
        setBeforeChangeTime(dragged)
    }

    const moveUpEvent = () => {
        console.log('up');
        
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
            <div className="timeline-wrapper"
                ref={timelineRef}
                onMouseDown={(e) => {
                    setBeforeChangeTime(calculatePercentage(e))
                    setPressed(true)
                }}
                onMouseMove={onmousemove}
                
            >
                <div className="current-drag" style={{
                    width: `${beforeChangeTime}%`
                }}></div>
            </div>
        </div>
    )
}

export default PlayerDragger