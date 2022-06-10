import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForwardStep, faBackwardStep, faShuffle, faRepeat } from '@fortawesome/free-solid-svg-icons'
import { ConfigsTypes } from "../typings/initialStates"
import PlayerDragger from './PlayerDragger'
import { FC } from 'react'

interface PlayerProps {
	playing: boolean,
	shuffle: boolean,
	loop: number,
	currentDutaion: number
	toggleButton: (key: keyof ConfigsTypes) => void,
	repeat: () => void,
	setDuration: (time: number) => void
}

const Player: FC<PlayerProps> = (props) => {
	return (
		<div className='player'>
			<div className="buttons-wrapper">
				<div className="secondary-btn" onClick={() => props.toggleButton("shuffle")}>
					{props.shuffle && <FontAwesomeIcon icon={faShuffle} color={"#FFF"} />}
					{!props.shuffle && <FontAwesomeIcon icon={faShuffle} color={"#545454"} />}

				</div>
				<div className="secondary-btn">
					<FontAwesomeIcon icon={faBackwardStep} color={"#FFF"} />
				</div>
				<div className="control-btn" onClick={() => props.toggleButton("playing")}>
					{
						!props.playing ?
							<FontAwesomeIcon icon={faPlay} style={{
								transform: "translateX(1.5px)"
							}} /> :
							<FontAwesomeIcon icon={faPause} />
					}
				</div>
				<div className="secondary-btn">
					<FontAwesomeIcon icon={faForwardStep} color={"#FFF"} />
				</div>
				<div className="secondary-btn" onClick={props.repeat}>
					{props.loop === 2 && <p className='small-one'>1</p>}
					{props.loop === 0 && <FontAwesomeIcon icon={faRepeat} color={"#545454"} />}
					{props.loop === 1 && <FontAwesomeIcon icon={faRepeat} color={"#FFF"} />}
					{props.loop === 2 && <FontAwesomeIcon icon={faRepeat} color={"#FFF"} />}
				</div>
			</div>
			<PlayerDragger currentDuration={props.currentDutaion} setDuration={(time) => props.setDuration(time)}/>
		</div>
	)
}

export default Player