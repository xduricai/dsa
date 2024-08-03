export function minEatingSpeed(piles: number[], h: number): number {
    let min = 1;
    let max = piles[0];

    for (let pile of piles) {
        if (pile > max) max = pile;
    }
    let best = max;

    while (min <= max) {
        const mid = Math.floor((min + max) / 2);
        let time = 0;

        for (let pile of piles) {
            time += Math.ceil(pile / mid);
            if (time > h) break;
        }
        if (time > h) {
            min = mid + 1;
            continue;
        }
        best = mid;
        max = mid - 1;
    }
    return best;
}
