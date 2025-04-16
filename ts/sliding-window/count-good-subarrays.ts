// LC 2537 (https://leetcode.com/problems/count-the-number-of-good-subarrays)
export function countGood(nums: number[], k: number): number {
    const counter = new Map<number, number>();
    let pairs = 0;
    let left = 0;
    let res = 0;

    for (let right = 0; right < nums.length; right++) {
        // count before adding right element
        const rightCount = counter.get(nums[right]) || 0;
        pairs += rightCount;
        counter.set(nums[right], rightCount + 1);

        while (true) {
            // count after removing left element
            const leftCount = counter.get(nums[left]) - 1;
            if (pairs - leftCount < k) {
                break;
            }
            pairs -= leftCount;
            counter.set(nums[left], leftCount);
            left++;
        }

        if (pairs >= k) {
            res += left + 1;
        }
    }

    return res;
}
