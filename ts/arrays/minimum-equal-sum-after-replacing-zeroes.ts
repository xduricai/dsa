export function minSum(nums1: number[], nums2: number[]): number {
    let sum1 = 0;
    let sum2 = 0;
    let zeroes1 = 0;
    let zeroes2 = 0;

    for (const num of nums1) {
        num ? (sum1 += num) : zeroes1++;
    }
    for (const num of nums2) {
        num ? (sum2 += num) : zeroes2++;
    }

    sum1 += zeroes1;
    sum2 += zeroes2;

    if ((!zeroes1 && sum1 < sum2) || (!zeroes2 && sum2 < sum1)) {
        return -1;
    }

    return Math.max(sum1, sum2);
}
