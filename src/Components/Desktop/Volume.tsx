import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh, faVolumeLow, faVolumeOff, faVolumeXmark, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { FC, useEffect, useRef, useState } from 'react'
import { calculatePercentage } from '../../utils/calculatePercentage'
import { DraggableType } from './PlayerDragger'

export interface VolumeProps {
	volume: number,
	setVolume: (volume: number) => void,
	openQueue: () => void
}

const Volume: FC<VolumeProps> = ({ volume, setVolume, openQueue }) => {
	const volumeRef = useRef<HTMLDivElement>(null)
	const [pressed, setPressed] = useState<boolean>(false)
	const [beforeValue, setBeforeValue] = useState<number>(0)

	useEffect(() => {
		setBeforeValue(volume * 100)
	}, [])


	const onmousemove = (e: DraggableType) => {
		if (!pressed) return
		if (beforeValue >= 100 || beforeValue <= 0) return

		const dragged: number = calculatePercentage(e, volumeRef)
		setBeforeValue(dragged)
		setVolume(beforeValue)
	}

	const moveUpEvent = (e: MouseEvent) => {
		if (!pressed) return

		setPressed(false)
		setPressed(false)
		setVolume(beforeValue)

	}

	useEffect(() => {
		window.addEventListener("mouseup", moveUpEvent)

		return () => {
			window.removeEventListener("mouseup", moveUpEvent)
		}
	})

	return (
		<div className='volume-dragger'>
			<div className="volume-icon-box pointer" onClick={openQueue}>
				<FontAwesomeIcon icon={faLayerGroup} color={"#FFF"} />
			</div>
			<div className="volume-icon-box">
				{
					beforeValue >= 75 && <FontAwesomeIcon icon={faVolumeHigh} color={"#FFF"} />
				}
				{
					(beforeValue < 75 && beforeValue > 25) && <FontAwesomeIcon icon={faVolumeLow} color={"#FFF"} />
				}
				{
					(beforeValue < 25 && beforeValue > 0) && <FontAwesomeIcon icon={faVolumeOff} color={"#FFF"} />
				}
				{
					(beforeValue <= 0) && <FontAwesomeIcon icon={faVolumeXmark} color={"#FFF"} />
				}

			</div>
			<div className="volume-wrapper"
				ref={volumeRef}
				onMouseDown={(e) => {
					setBeforeValue(calculatePercentage(e, volumeRef))
					setPressed(true)
				}}
				onMouseMove={onmousemove}
			>
				<div className="current-volume" style={{
					width: `${beforeValue}%`
				}}></div>
			</div>
		</div>
	)
}

export default Volume