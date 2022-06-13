import React, { FC } from 'react'

export interface SongViewProps {
    song_name?: string,
    song_artist?: string
}

const SongInfoView: FC<SongViewProps> = ({
    song_name,
    song_artist
}) => {
  return (
    <div className='mobile-song-info'>
        <div className="mobile-song-credits">
        {song_name!.length <= 14 ? (
              <h4 className="song_title">
                {song_name?.trim() ? song_name : "-"}
              </h4>
            ) : (
              <div className="board">
                <h4 className="song_title">{song_name}</h4>
              </div>
            )}
            <span className="song_artist">{song_artist?.trim() ? song_artist : "-"}</span>
        </div>
    </div>
  )
}

export default SongInfoView