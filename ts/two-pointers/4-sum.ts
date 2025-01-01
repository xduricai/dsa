export function fourSum(nums: number[], target: number): number[][] {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const res = [];
    const kGroup = [];

    // function that returns all unique pairs that sum up to a given target inside of a subarray
    const twoSum = (start: number, target: number) => {
        const output = [];
        let left = start;
        let right = n - 1;

        while (left < right) {
            const current = nums[left] + nums[right];

            if (current < target) {
                left++;
                continue;
            }

            if (current > target) {
                right--;
                continue;
            }

            output.push([nums[left], nums[right]]);
            left++;
            right--;

            // skip duplicate numbers
            while (left < right && nums[left] === nums[left - 1]) {
                left++;
            }
            while (left < right && nums[right] === nums[right + 1]) {
                right--;
            }
        }

        return output;
    };

    // generic recursive k-sum function
    const kSum = (start: number, target: number, k: number) => {
        // run 2-sum if k is down to 2
        if (k === 2) {
            const pairs = twoSum(start, target);

            // append each group of numbers to result
            for (const pair of pairs) {
                res.push(kGroup.concat(pair));
            }
            return;
        }

        for (let idx = start; idx < n - k + 1; idx++) {
            // skip duplicate numbers
            if (idx > start && nums[idx] === nums[idx - 1]) {
                continue;
            }

            kGroup.push(nums[idx]);
            kSum(idx + 1, target - nums[idx], k - 1);
            kGroup.pop();
        }
    };

    kSum(0, target, 4);
    return res;
}
