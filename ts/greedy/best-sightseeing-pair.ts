function maxScoreSightseeingPair(values: number[]): number {
    let maxLeft = values[0];
    let max = 0;

    for (let idx = 1; idx < values.length; idx++) {
        const currentLeft = values[idx] + idx;
        const currentRight = values[idx] - idx;

        max = Math.max(max, maxLeft + currentRight);
        maxLeft = Math.max(maxLeft, currentLeft);
    }

    return max;
};