export function longestSquareStreak(nums: number[]): number {
    const set = new Set<number>(nums);
    let max = -1;

    for (let num of nums) {
        let seq = 1;

        if (set.has(Math.sqrt(num))) {
            continue;
        }

        while (set.has(num * num)) {
            num *= num;
            seq++;
        }

        if (seq > 1 && seq > max) {
            max = seq;
        }
    }
    return max;
}
