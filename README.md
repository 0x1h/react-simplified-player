<div align="center">
	<img src="https://camo.githubusercontent.com/757f6d12dd3099b150a559147ebcfbe35264dbcaca2f6bd2b675bc7c7ec85c57/68747470733a2f2f692e6962622e636f2f365931333042472f696d6167652e706e67" width="200"> 
	<h1>react-simplified-player</h1>
	Simple Easy Customizable React Audio Player 🎶
</div>

<div align="center">
<img src="https://img.shields.io/npm/dt/react-simplified-player.svg">
<img src="https://img.shields.io/static/v1?label=version&message=v1.0.5&color=yellow">
<img src="https://img.shields.io/static/v1?label=license&message=MIT&color=black">
<img src="https://img.shields.io/static/v1?label=minzipped file&message=45.1 KB&color=success">
<img src="https://visitor-badge.glitch.me/badge?page_id=callmenikk.react-simplified-player">
</div>

##  📦  Installation

using `npm`:

`npm i react-simplified-player`

using `yarn`: 

`yarn add react-simplified-player`	

## 🖼️  Screenshots

> Desktop

<img src="https://i.ibb.co/9mDnVGZ/Screenshot-2022-08-07-014057.png">
<img src="https://i.ibb.co/0C6X2pT/Screenshot-2022-08-07-014112.png">

> Mobile

<div align="center">
<img src="https://i.ibb.co/JjH7NNK/Screenshot-2022-08-07-014130.png" width="300">
<img src="https://i.ibb.co/kBLDbDZ/Screenshot-2022-08-07-014146.png" width="300">
</div>

## ✨  Feature list

 - [x] Playlist
 - [x] Color Customize
 - [x] API props
 - [x]  Typescript support

## 👀  Example
> Live Demo:
> 
https://react-simplified-player.netlify.app/

> How things work
> 
[Source Code](https://github.com/callmenikk/react-simplified-player/blob/master/src/ReactSimplifiedPlayer.tsx)

## 📝  Usage

```jsx
import ReactDOM from "react-dom/client";
const rootElement = document.getElementById("root") as HTMLElement
const root = ReactDOM.createRoot(rootElement);

import { ReactSimplifiedPlayer } from "react-simplified-player"

root.render(<ReactSimplifiedPlayer {...props} />);
```

## 📄 API

| Name | Type | Default |Required |  Description |
|--|--|--|--|--|
| mainColor | string | `-` |  ✅ | main color shows the background of draggable player
| showQueue | boolean | `false` |   | showing queue on player
| song | [`QueueType`](https://github.com/callmenikk/react-simplified-player/blob/6f271275f4dd166c376ab537ec27159dbe051165/src/typings/playerTypes.ts#L8) | `-` |  ✅ | which song must be added to queue or which one should play, if you dont have music yet just put there boilerplate
| defaultVolume | `0-1` | `0.5` |   | when page loads default volume of playing song
| onVolumeChange | `(volume: string) => void` | `-` |   | when you change volume it triggers `volume` parameter and shows volume level `0-1`
| onAudioPlay | `(currentSong:` [`QueueType`](https://github.com/callmenikk/react-simplified-player/blob/6f271275f4dd166c376ab537ec27159dbe051165/src/typings/playerTypes.ts#L8)`)=> void ` | `-` |   | when you click **play** of song it `currentSong` show object of what song is playing right now
| onAudioPause | `(currentSong:` [`QueueType`](https://github.com/callmenikk/react-simplified-player/blob/6f271275f4dd166c376ab537ec27159dbe051165/src/typings/playerTypes.ts#L8)`)=> void` | `-` |   | when you click **pause** of song it `currentSong` show object of what song is playing right now
| onAudioEnded | `(currentSong:` [`QueueType`](https://github.com/callmenikk/react-simplified-player/blob/6f271275f4dd166c376ab537ec27159dbe051165/src/typings/playerTypes.ts#L8)`)=> void` | `-` |   | when audio **ends** shows which audio ended as object
| onForward | `(currentSong:` [`QueueType`](https://github.com/callmenikk/react-simplified-player/blob/6f271275f4dd166c376ab537ec27159dbe051165/src/typings/playerTypes.ts#L8)`)=> void` | `-` |   | when you click **next** button it shows which is upcomming song as object
| onBack | `(currentSong:` [`QueueType`](https://github.com/callmenikk/react-simplified-player/blob/6f271275f4dd166c376ab537ec27159dbe051165/src/typings/playerTypes.ts#L8)`)=> void` | `-` |   | when you click **previous** button it shows which is upcomming song as object

## 💡  Customizeble UI

- color
- showing queue

####  custom color

```jsx
import ReactDOM from "react-dom/client";
const rootElement = document.getElementById("root") as HTMLElement
const root = ReactDOM.createRoot(rootElement);

import { ReactSimplifiedPlayer } from "react-simplified-player"

// 🟡
root.render(<ReactSimplifiedPlayer mainColor={"#fcba03"} {...props} />);
```
<img src="https://i.ibb.co/6RfpWYN/Screenshot-2022-08-07-022439.png">

#### show queue
```jsx
import ReactDOM from "react-dom/client";
const rootElement = document.getElementById("root") as HTMLElement
const root = ReactDOM.createRoot(rootElement);

import { ReactSimplifiedPlayer } from "react-simplified-player"

// 🟡
root.render(<ReactSimplifiedPlayer showQueue={true} {...props} />);
```
<img src="https://i.ibb.co/VTZ8CYv/Screenshot-2022-08-07-022700.png" width="400">

## 👨‍💻  Installation

```bash
git clone https://github.com/callmenikk/react-simplified-player.git
cd react-simplified-player

npm i
npm start
```
## 🟦Component Prop Types

```ts
interface PlayerProps {
	mainColor: string,
	queue?:boolean,
	song?: QueueType,
	defaultVolume?: number,
	showQueue?: boolean,
	onVolumeChange?: (volume: number) => void,
	onAudioPlay?: (currentSong: QueueType) => void
	onAudioPause?: (currentSong: QueueType) => void,
	onAudioEnded?: (currentSong: QueueType) => void,
	onForward?: (currentSong: QueueType) => void,
	onBack?: (currentSong: QueueType) => void
}
```

## 🎶🟦Song Type

```ts
interface QueueType {
	song_cover?: string;
	song_title?: string;
	id?: string
	song_artist?: string;
	url: string;
}
```

## 📄  License

[MIT]()
