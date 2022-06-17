import ReactSimplifiedPlayer from "./ReactSimplfiedPlayer";

const App = () => {
  return (
    <div>
      <ReactSimplifiedPlayer
        song={{
          song_artist: "Kesha  im",
          song_cover: "",
          song_title: "ee",
          url: "https://cdns-preview-a.dzcdn.net/stream/c-a0f6f354043545619b46daae9cd9aa40-17.mp3",
        }}
        showQueue={true}
        mainColor={"#fa7f8a"}
        defaultVolume={0.1}
      />
    </div>
  );
};

export default App;
