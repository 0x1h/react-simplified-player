import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './ReactSimplifiedPlayer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <App 
      song={{
          song_artist: "Kesha  im",
          song_cover: "",
          song_title: "ee",
          url: "https://cdns-preview-a.dzcdn.net/stream/c-a0f6f354043545619b46daae9cd9aa40-17.mp3",
        }}
        showQueue={true}
        mainColor={"#fa7f8a"}
        defaultVolume={0.5}/>
  </React.StrictMode>
);