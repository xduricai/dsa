export function divideArray(nums: number[]): boolean {
    const seen = new Set<number>();

    for (const num of nums) {
        if (seen.has(num)) {
            seen.delete(num);
        } else {
            seen.add(num);
        }
    }

    return !seen.size;
}

export function divideArrayAlt(nums: number[]): boolean {
    const seen = Array(501).fill(true);

    for (const num of nums) {
        seen[num] = !seen[num];
    }

    return seen.every((hasPair) => hasPair);
}
