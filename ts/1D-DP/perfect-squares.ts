export function numSquares(n: number): number {
    // in the worst case, every n can be written as a sum of n 1's
    const DP = Array.from({ length: n + 1 }, (_, idx) => idx);
    const squares = [];

    for (let num = 2; num <= Math.floor(Math.sqrt(n)); num++) {
        squares.push(num * num);
    }

    for (const num of squares) {
        for (let idx = num; idx <= n; idx++) {
            DP[idx] = Math.min(DP[idx], DP[idx - num] + 1);
        }
    }

    return DP[n];
}
