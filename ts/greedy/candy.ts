// double pass solution
export function candy(ratings: number[]): number {
    const n = ratings.length;
    const candies = Array(n).fill(1);

    for (let idx = 1; idx < n; idx++) {
        if (ratings[idx - 1] < ratings[idx]) {
            candies[idx] = candies[idx - 1] + 1;
        }
    }

    for (let idx = n - 2; idx >= 0; idx--) {
        if (ratings[idx] > ratings[idx + 1]) {
            candies[idx] = Math.max(candies[idx], candies[idx + 1] + 1);
        }
    }

    return candies.reduce((acc, curr) => acc + curr, 0);
}
