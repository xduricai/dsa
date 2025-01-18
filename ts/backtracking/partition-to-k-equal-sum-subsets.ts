// Slightly more generic version of LC 473
export function canPartitionKSubsets(nums: number[], k: number): boolean {
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    const target = sum / k;
    const current = Array(k).fill(0);
    nums.sort((a, b) => b - a);

    if (sum % k !== 0) {
        return false;
    }

    const isDuplicate = (group: number) => {
        for (let idx = 0; idx < group; idx++) {
            if (current[idx] === current[group]) {
                return true;
            }
        }
        return false;
    };

    const dfs = (idx: number) => {
        if (idx === nums.length) {
            return true;
        }

        for (let group = 0; group < k; group++) {
            if (current[group] + nums[idx] > target) {
                continue;
            }
            if (isDuplicate(group)) {
                continue;
            }

            current[group] += nums[idx];
            if (dfs(idx + 1)) {
                return true;
            }
            current[group] -= nums[idx];
        }
        return false;
    };
    return dfs(0);
}

// alternate solution, worse performance
export function canPartitionKSubsetsAlt(nums: number[], k: number): boolean {
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    const target = sum / k;
    const used = Array(nums.length).fill(false);
    nums.sort((a, b) => b - a);

    if (sum % k !== 0) {
        return false;
    }

    const dfs = (start: number, groups: number, sum: number) => {
        // successfully reached k groups
        if (groups === k) {
            return true;
        }
        // current group sum is equal to the target sum
        if (sum === target) {
            return dfs(0, groups + 1, 0);
        }

        for (let idx = start; idx < nums.length; idx++) {
            // current element has either been used or is too large to include
            if (used[idx] || sum + nums[idx] > target) {
                continue;
            }

            used[idx] = true;
            if (dfs(idx + 1, groups, sum + nums[idx])) {
                return true;
            }
            used[idx] = false;
        }
        return false;
    };

    return dfs(0, 0, 0);
}
