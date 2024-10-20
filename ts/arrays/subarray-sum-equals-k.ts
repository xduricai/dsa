export function subarraySum(nums: number[], k: number): number {
    const prefixSums = new Map<number, number>([[0, 1]]);
    let count = 0;
    let sum = 0;

    for (const num of nums) {
        sum += num;
        const diff = sum - k;
        count += prefixSums.get(diff) || 0;

        prefixSums.set(sum, (prefixSums.get(sum) || 0) + 1);
    }

    return count;
}
