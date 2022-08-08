import { faPlay, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React, { FC, useEffect, useState } from "react";

interface QueueSongProps {
  image_src: string;
  song_title: string;
  song_artist: string;
  audio_src: string;
  index: number;
  removeSong: (index: number) => void;
  playCurrentSong: (index: number) => void;
  currentIndex: number
}

const QueueSong: FC<QueueSongProps> = (props) => {
  const [prepareRemove, setPrepareRemove] = useState(false);
  const [thisSongPlaying, setThisSongPlaying] = useState(false)

  useEffect(() => {
    if(props.index === props.currentIndex){
        return setThisSongPlaying(true)
    }

    setThisSongPlaying(false)
  }, [props.currentIndex, props.index])

  useEffect(() => {
    if (prepareRemove) {
      setTimeout(() => {
        props.removeSong(props.index);
      }, 500);
    }
  }, [prepareRemove]);

  return (
    <div className={prepareRemove ? "queue-song slided" : "queue-song"}>
      <div className="play-song-wrapper" onClick={() => {
        if(thisSongPlaying) return

        props.playCurrentSong(props.index)
        }}>
        <div className={thisSongPlaying ? "index-box playing": "index-box"}>
          <FontAwesomeIcon
            className="queue-play-icon"
            icon={faPlay as IconProp}
            color={!thisSongPlaying ? "#FFF" : "#75e368"}
            size={"xs"}
          />
          <p
            style={{
              fontSize: "0.8em",
            }}
          >
            {props.index + 1}
          </p>
        </div>
        <div className="image-wrapper">
          {props.image_src.trim() ? (
            <img src={props.image_src} alt="" draggable={false} />
          ) : null}
        </div>
        <div className="song-info">
          <div className={thisSongPlaying ? "song-title playing" : "song-title"}>
            {props.song_title.trim().length > 40
              ? `${props.song_title.trim().slice(0, 40)}...`
              : props.song_title.trim()}
          </div>
          <div className={thisSongPlaying ? "song-artist playing" : "song-artist"}>
            {props.song_artist.trim().length > 40
              ? `${props.song_artist.trim().slice(0, 40)}...`
              : !props.song_artist.trim()
              ? "-"
              : props.song_artist.trim()}
          </div>
        </div>
      </div>
        <div className="delete-btn" onClick={() => setPrepareRemove(true)}>
          <FontAwesomeIcon icon={faTrashCan as IconProp} color={"#FFF"} />
        </div>
    </div>
  );
};

export default QueueSong;
