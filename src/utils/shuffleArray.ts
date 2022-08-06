import { QueueType } from "../typings/playerTypes";

export const shuffleArray = (arr: QueueType[]): QueueType[] => {
    let initlaArr: QueueType[] = [...arr]
    
    let j, x, i;
    for (i = initlaArr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = initlaArr[i];
        initlaArr[i] = initlaArr[j];
        initlaArr[j] = x;
    }
    return initlaArr ;
}