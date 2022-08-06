export const token = () => {
    const random = Math.floor(1000000 + Math.random() * 9000000) 

    return random
}