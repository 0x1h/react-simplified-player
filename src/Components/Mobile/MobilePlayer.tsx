import { forwardRef, useEffect, useState } from "react";
import ImageView from "./ImageView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import SongInfoView, { SongViewProps } from "./SongInfoView";
import Player, {PlayerProps} from "../Desktop/Player"


interface MobilePlayerProps extends PlayerProps, SongViewProps{
  src: string;
  popUp: boolean,
  onPopUp: () => void
}

const MobilePlayer= forwardRef<HTMLAudioElement, MobilePlayerProps>((props, ref) => {
  const [slide, setSlide] = useState(false)


  useEffect(() => {

    if(props.popUp && !slide){
      setTimeout(() => {setSlide(true)}, 100)
    }

    if(!props.popUp && slide){
      return setSlide(false)
    }

  },[props.popUp, setSlide])

  return (
    <div className={slide ? "mobile-view-container" : "mobile-view-container hidden"}>
      <div className="close-mobile-view" onClick={props.onPopUp}/>
      <div className="mobile-view-song-content">
        <ImageView src={props.src}/>
        <SongInfoView song_artist={props.song_artist} song_name={props.song_name}/>
        <div className="mobile-player-wrapper">
          <div className="mobile-view-timelapse-player">
            <Player {...props} ref={ref}/>
          </div>
        </div>
        <div className="extra-icons">
          <div className="queue-opener-icon">
          <FontAwesomeIcon icon={faLayerGroup} color={"#FFF"} />
          </div>
        </div>
      </div>
    </div>
  );
})

export default MobilePlayer;
