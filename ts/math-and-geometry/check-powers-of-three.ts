export function checkPowersOfThree(n: number): boolean {
    const powers = [1];

    while (powers.at(-1) <= n) {
        powers.push(powers.at(-1) * 3);
    }

    for (let idx = powers.length - 1; idx >= 0 && n; idx--) {
        if (powers[idx] <= n) {
            n -= powers[idx];
        }
    }

    return n === 0;
}
