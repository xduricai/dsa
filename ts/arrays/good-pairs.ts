export function numIdenticalPairs(nums: number[]): number {
    const counts = new Map<number, number>();
    let pairs = 0;

    for (const num of nums) {
        const count = counts.get(num) || 0;
        pairs += count;
        counts.set(num, count + 1);
    }
    return pairs;
}
