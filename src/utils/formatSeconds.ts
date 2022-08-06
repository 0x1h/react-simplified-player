export const formatSeconds = (secs: number): string => {
    let hr = Math.floor(Number(secs) / 3600);
    let min = String(Math.floor((Number(secs) - (hr * 3600)) / 60));
    let sec = String(Math.floor(Number(secs) - (hr * 3600) - (Number(min) * 60)));

    if (Number(min) < 10) min = "0" + min;
    if (Number(sec) < 10) sec = "0" + sec;
    if(isNaN(secs)) return "- : -"

    return min + ':' + sec;
}