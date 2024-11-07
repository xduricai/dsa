export function largestCombination(candidates: number[]): number {
    const bitmask = Array(32).fill(0);

    for (let candidate of candidates) {
        let idx = 0;

        while (candidate > 0) {
            if (candidate & 1) {
                bitmask[idx]++;
            }
            idx++;
            candidate >>= 1;
        }
    }
    return Math.max(...bitmask);
}
