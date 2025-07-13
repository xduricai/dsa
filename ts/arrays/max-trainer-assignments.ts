// LC 2410 (https://leetcode.com/problems/maximum-matching-of-players-with-trainers)

export function matchPlayersAndTrainers(
    players: number[],
    trainers: number[]
): number {
    players.sort((a, b) => a - b);
    trainers.sort((a, b) => a - b);
    let pIdx = players.length - 1;
    let tIdx = trainers.length - 1;
    let res = 0;

    while (pIdx >= 0 && tIdx >= 0) {
        if (trainers[tIdx] >= players[pIdx]) {
            pIdx--;
            tIdx--;
            res++;
        } else {
            pIdx--;
        }
    }

    return res;
}
