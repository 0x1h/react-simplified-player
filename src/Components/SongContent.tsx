import { FC } from 'react'
import { SongContentType } from '../typings/playerTypes'

const SongContent: FC<SongContentType> = ({song_name, song_cover, artist}) => {
    const name: string | undefined = song_name!.length > 15 ? `${song_name?.slice(0, 15)}...` : song_name
    
    return (
        <div className="song-content">
            <div className="song_cover">
                <img src={song_cover} alt="" draggable={false} />
            </div>
            <div className="song-credits">
                <h4 className='song_title'>{name}</h4>
                <span className='song_artist'>{artist}</span>
            </div>
        </div>
    )
}

export default SongContent