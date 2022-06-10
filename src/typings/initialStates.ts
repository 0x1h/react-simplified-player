//Player Configurations (Play & Pause) | (shuffl -> on/off) | (loop -> on/off)

export type ConfigsTypes = {
    playing: boolean,
	shuffle: boolean,
}

export type LoopType = "none"| "repeat" | "repeat-song"

export const initialConfig: ConfigsTypes = {
    playing: false,
	shuffle: false,
}