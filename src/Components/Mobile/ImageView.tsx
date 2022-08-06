import React, { FC } from "react";

const ImageView: FC<{ src: string }> = ({ src }) => {
  return (
    <div className="image-container">
      <div className="image-frame">
        {
            src.trim() && <img src={src} alt="" draggable={false}/> 
        }
      </div>
    </div>
  );
};

export default ImageView;
