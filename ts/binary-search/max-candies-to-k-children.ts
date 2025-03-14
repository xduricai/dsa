export function maximumCandies(candies: number[], k: number): number {
    let left = 1;
    let right = Math.max(...candies) + 1;
    let max = 0;

    while (left < right) {
        const target = left + ((right - left) >> 1);

        if (canAllocate(candies, k, target)) {
            max = target;
            left = target + 1;
        } else {
            right = target;
        }
    }

    return max;
}

function canAllocate(candies: number[], k: number, target: number): boolean {
    let piles = 0;

    for (let idx = 0; idx < candies.length && piles <= k; idx++) {
        piles += Math.floor(candies[idx] / target);
    }

    return piles >= k;
}
