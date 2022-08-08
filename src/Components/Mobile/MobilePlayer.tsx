import React, { forwardRef, useEffect, useState } from "react";
import ImageView from "./ImageView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import SongInfoView, { SongViewProps } from "./SongInfoView";
import Player from "../Desktop/Player"
import { PlayerProps } from "../../typings/player.types";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { QueueProps } from "../Desktop/Queue";
import Queue from "../Desktop/Queue";

interface MobilePlayerProps extends PlayerProps, SongViewProps, QueueProps {
  src: string;
  popUp: boolean;
  onPopUp: () => void;
  openQueue: () => void;
  showQueue: boolean;
}

const MobilePlayer = forwardRef<HTMLAudioElement, MobilePlayerProps>(
  (props, ref) => {
    const [slide, setSlide] = useState(false);

    useEffect(() => {
      if (props.popUp && !slide) {
        setTimeout(() => {
          setSlide(true);
        }, 100);
      }

      if (!props.popUp && slide) {
        return setSlide(false);
      }
    }, [props.popUp, setSlide]);

    return (
      <div
        className={
          slide ? "mobile-view-container" : "mobile-view-container hidden"
        }
      >
        <div className="close-mobile-view" onClick={props.onPopUp} />
        <div className="mobile-view-song-content">
          <ImageView src={props.src} />
          <SongInfoView
            song_artist={props.song_artist}
            song_name={props.song_name}
          />
          <div className="mobile-player-wrapper">
            <div className="mobile-view-timelapse-player">
              <Player {...props} ref={ref} />
            </div>
          </div>
          <div className="extra-icons">
            <div className="queue-opener-icon" onClick={props.openQueue}>
              {props.showQueue && (
                <FontAwesomeIcon icon={faLayerGroup as IconProp} color={"#FFF"} />
              )}
            </div>
          </div>
        </div>
        <Queue {...props} />
      </div>
    );
  }
);

export default MobilePlayer;
