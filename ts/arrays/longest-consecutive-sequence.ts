export function longestConsecutive(nums: number[]) {
    const numSet = new Set<number>(nums);
    let max = 0;

    for (let num of nums) {
        if (numSet.has(num + 1)) continue;
        let seq = 1;
        let current = num - 1;

        while(numSet.has(current)) {
            current--;
            seq++;
        }
        max = Math.max(seq, max);
    }
    return max;
}