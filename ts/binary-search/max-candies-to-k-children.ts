export function maximumCandies(candies: number[], k: number): number {
    let left = 1;
    let right = Math.max(...candies) + 1;

    while (left < right) {
        const target = left + ((right - left) >> 1);

        if (canAllocate(candies, k, target)) {
            left = target + 1;
        } else {
            right = target;
        }
    }

    return left - 1;
}

function canAllocate(candies: number[], k: number, target: number): boolean {
    let piles = 0;

    for (let idx = 0; idx < candies.length && piles <= k; idx++) {
        piles += Math.floor(candies[idx] / target);
    }

    return piles >= k;
}
