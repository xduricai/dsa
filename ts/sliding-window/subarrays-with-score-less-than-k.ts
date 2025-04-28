// LC 2302 (https://leetcode.com/problems/count-subarrays-with-score-less-than-k)

export function countSubarrays(nums: number[], k: number): number {
    let score = 0;
    let left = 0;
    let res = 0;

    for (let right = 0; right < nums.length; right++) {
        score += nums[right];

        while (score * (right - left + 1) >= k) {
            score -= nums[left];
            left++;
        }

        res += right - left + 1;
    }

    return res;
}
