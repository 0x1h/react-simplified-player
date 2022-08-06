import React, { FC } from "react";
import { SongContentType } from "../../typings/playerTypes";

interface IncludeWindowProp extends SongContentType {
  windowWidth: number;
  openPlayer: () => void
}

const SongContent: FC<IncludeWindowProp> = ({
  song_name,
  song_cover,
  artist,
  isLoading,
	windowWidth,
  openPlayer
}) => {
  return (
    <div
      className="song-content"
      onClick={() => {
        if(windowWidth > 768) return

        openPlayer()
      }}
    >
      {!isLoading && (
        <>
          <div className="song_cover">
            {song_cover!.trim() === "" ? (
              <div
                style={{
                  width: "20px",
                  height: "20px",
                }}
              ></div>
            ) : (
              <img src={song_cover} alt="" draggable={false} />
            )}
          </div>
          <div className="song-credits">
            {song_name!.length <= 14 ? (
              <h4 className="song_title">
                {song_name?.trim() ? song_name : "-"}
              </h4>
            ) : (
              <div className="board">
                <h4 className="song_title">{song_name}</h4>
              </div>
            )}
            <span className="song_artist">{artist?.trim() ? artist : "-"}</span>
          </div>
        </>
      )}
      {isLoading && (
        <div className="loader-wrapper">
          <span className="loader" />
        </div>
      )}
    </div>
  );
};

export default SongContent;
