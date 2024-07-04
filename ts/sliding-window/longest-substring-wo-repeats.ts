export function lengthOfLongestSubstring(s: string): number {
    let max = 0;
    let left = 0;
    let right = 0;
    const set = new Set();

    while (right < s.length) {
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        set.add(s[right]);
        right++;
        max = Math.max(max, right - left);
    }
    return max;
};