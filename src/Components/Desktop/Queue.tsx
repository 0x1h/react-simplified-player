import React, { FC, useEffect, useRef } from "react";
import QueueSong from "./QueueSong";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueueType } from "../../typings/playerTypes";
import "../../style/queue.css";

export interface QueueProps {
  songs: QueueType[];
  onQueueOpen: (bool: boolean) => void;
  removeSong: (index: number) => void;
  playSong: (index: number) => void;
  queuePopUp: boolean;
  currentIndex: number;
}

const Queue: FC<QueueProps> = ({
  songs,
  removeSong,
  playSong,
  queuePopUp,
  onQueueOpen,
  currentIndex,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onQueueOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div
      className={queuePopUp ? "queue-container" : "queue-container hidden"}
      ref={ref}
    >
      <div className="queue-header">
        <h4 draggable={false}>Queue</h4>
        <div className="close-btn" onClick={() => onQueueOpen(false)}>
          <FontAwesomeIcon icon={faXmark} color={"#FFF"} />
        </div>
      </div>
      <div className="queue-list">
        {songs.map((song, i) => {
          return (
            <QueueSong
              currentIndex={currentIndex}
              image_src={song.song_cover as string}
              song_artist={song.song_artist!}
              song_title={song.song_title!}
              index={i}
              key={song.id}
              audio_src={song.url}
              removeSong={removeSong}
              playCurrentSong={playSong}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Queue;
