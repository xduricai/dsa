export function canPartition(nums: number[]): boolean {
    const sum = nums.reduce((acc, val) => acc + val, 0);
    if (sum % 2 === 1) {
        return false;
    }

    const target = sum / 2;
    let possibleSums = new Set<number>([0]);

    for (const num of nums) {
        const newSums = new Set<number>();

        for (let sum of possibleSums) {
            if (sum + num === target) {
                return true;
            }

            newSums.add(sum);
            newSums.add(sum + num);
        }
        possibleSums = newSums;
    }
    return false;
}
