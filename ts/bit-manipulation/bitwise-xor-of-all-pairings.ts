export function xorAllNums(nums1: number[], nums2: number[]): number {
    let res = 0;

    if (nums2.length % 2 === 1) {
        for (const num of nums1) {
            res ^= num;
        }
    }

    if (nums1.length % 2 === 1) {
        for (const num of nums2) {
            res ^= num;
        }
    }

    return res;
}
