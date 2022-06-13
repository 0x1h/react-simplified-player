import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForwardStep,
  faBackwardStep,
  faShuffle,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { ConfigsTypes } from "../typings/initialStates";
import PlayerDragger from "./PlayerDragger";
import { forwardRef } from "react";

interface PlayerProps {
  playing: boolean;
  shuffle: boolean;
  loop: number;
  currentDutaion: number;
  toggleButton: (key: keyof ConfigsTypes) => void;
  repeat: () => void;
  setDuration: (time: number) => void;
  current: number;
  total_length: number;
  src: string;
  skipToTime: (to: number) => void;
  backSong: () => void;
  forwardSong: () => void;
  isSongLoaded: boolean;
}

const Player = forwardRef<HTMLAudioElement, PlayerProps>((props, ref) => {
  return (
    <div className="player">
      <audio
        src={props.src}
        ref={ref}
        style={{
          visibility: "hidden",
        }}
      />
      <div className="buttons-wrapper">
        <div
          className="secondary-btn"
          onClick={() => props.toggleButton("shuffle")}
        >
          {props.shuffle && <FontAwesomeIcon icon={faShuffle} color={"#FFF"} />}
          {!props.shuffle && (
            <FontAwesomeIcon icon={faShuffle} color={"#545454"} />
          )}
        </div>
        <div className={props.isSongLoaded ? "secondary-btn" : "secondary-btn forbidden"} onClick={() => {
			if(!props.isSongLoaded) return
			props.backSong()
		}}>
          <FontAwesomeIcon icon={faBackwardStep} color={"#FFF"} />
        </div>
        <div
          className={
            props.isSongLoaded ? "control-btn" : "control-btn forbidden"
          }
          onClick={() => {
			if(!props.isSongLoaded) return
            props.toggleButton("playing");
          }}
        >
          {!props.playing ? (
            <FontAwesomeIcon
              icon={faPlay}
              style={{
                transform: "translateX(1.5px)",
              }}
            />
          ) : (
            <FontAwesomeIcon icon={faPause} />
          )}
        </div>
        <div className={props.isSongLoaded ? "secondary-btn" : "secondary-btn forbidden"} onClick={() => {
			if(!props.isSongLoaded) return
			props.forwardSong()
		}}>
          <FontAwesomeIcon icon={faForwardStep} color={"#FFF"} />
        </div>
        <div className="secondary-btn" onClick={props.repeat}>
          {props.loop === 2 && <p className="small-one">1</p>}
          {props.loop === 0 && (
            <FontAwesomeIcon icon={faRepeat} color={"#545454"} />
          )}
          {props.loop === 1 && (
            <FontAwesomeIcon icon={faRepeat} color={"#FFF"} />
          )}
          {props.loop === 2 && (
            <FontAwesomeIcon icon={faRepeat} color={"#FFF"} />
          )}
        </div>
      </div>
      <PlayerDragger
        isSongLoaded={props.isSongLoaded}
        currentDuration={props.currentDutaion}
        setDuration={(time) => props.setDuration(time)}
        current={props.current}
        total_length={props.total_length}
        skipToTime={props.skipToTime}
      />
    </div>
  );
});

export default Player;
