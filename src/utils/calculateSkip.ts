export const calculateSkip = (songDuration: number, percentage: number): number => {
    const skipTo: number = (songDuration / 100) * percentage

    return Number(skipTo.toFixed(3))
}