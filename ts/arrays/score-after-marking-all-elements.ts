export function findScore(nums: number[]): number {
    const mapped = nums
        .map((num, idx) => [num, idx])
        .sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
    const seen = new Set<number>();
    let score = 0;

    for (const [num, idx] of mapped) {
        if (seen.has(idx)) {
            continue;
        }

        score += num;
        seen.add(idx);
        seen.add(idx - 1);
        seen.add(idx + 1);
    }
    return score;
}
