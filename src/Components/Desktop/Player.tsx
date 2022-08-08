import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForwardStep,
  faBackwardStep,
  faShuffle,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { PlayerProps } from "../../typings/player.types";
import PlayerDragger from "./PlayerDragger";
import { forwardRef } from "react";
import { formatSeconds } from "../../utils/formatSeconds";


const Player = forwardRef<HTMLAudioElement, PlayerProps>((props, ref) => {
  return (
    <div className="player">
      <audio
        src={props.song_uri}
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
          {props.shuffle && <FontAwesomeIcon icon={faShuffle as IconProp} color={"#FFF"} />}
          {!props.shuffle && (
            <FontAwesomeIcon icon={faShuffle as IconProp} color={"#545454"} />
          )}
        </div>
        <div
          className={
            props.isSongLoaded ? "secondary-btn" : "secondary-btn forbidden"
          }
          onClick={() => {
            if (!props.isSongLoaded) return;
            props.backSong();
          }}
        >
          <FontAwesomeIcon icon={faBackwardStep as IconProp} color={"#FFF"} />
        </div>
        <div
          className={
            props.isSongLoaded ? "control-btn" : "control-btn forbidden"
          }
          onClick={() => {
            if (!props.isSongLoaded) return;
            props.toggleButton("playing");
          }}
        >
          {!props.playing ? (
            <FontAwesomeIcon
              icon={faPlay as IconProp}
              style={{
                transform: "translateX(1.5px)",
              }}
            />
          ) : (
            <FontAwesomeIcon icon={faPause as IconProp} />
          )}
        </div>
        <div
          className={
            props.isSongLoaded ? "secondary-btn" : "secondary-btn forbidden"
          }
          onClick={() => {
            if (!props.isSongLoaded) return;
            props.forwardSong();
          }}
        >
          <FontAwesomeIcon icon={faForwardStep as IconProp} color={"#FFF"} />
        </div>
        <div className="secondary-btn" onClick={props.repeat}>
          {props.loop === 2 && <p className="small-one">1</p>}
          {props.loop === 0 && (
            <FontAwesomeIcon icon={faRepeat as IconProp} color={"#545454"} />
          )}
          {props.loop === 1 && (
            <FontAwesomeIcon icon={faRepeat as IconProp} color={"#FFF"} />
          )}
          {props.loop === 2 && (
            <FontAwesomeIcon icon={faRepeat as IconProp} color={"#FFF"} />
          )}
        </div>
      </div>
      <div className="mobile-view-timelapse">
        <p
          style={{
            fontSize: "0.8em",
          }}
        >
          {formatSeconds(props.current)}
        </p>
        <p
          style={{
            fontSize: "0.8em",
          }}
        >
          {formatSeconds(props.total_length)}
        </p>
      </div>
      <PlayerDragger
        color={props.color}
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
