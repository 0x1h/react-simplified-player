import { QueueType } from "../typings/playerTypes"

export const loopSong = (prevIndex: number, songData: QueueType[]): number => {
    if (prevIndex + 1 === songData.length) return 0
    return prevIndex + 1
}