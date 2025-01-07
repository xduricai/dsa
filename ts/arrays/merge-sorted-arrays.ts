// Do not return anything, modify nums1 in-place instead.
export function merge(
    nums1: number[],
    m: number,
    nums2: number[],
    n: number
): void {
    let mIdx = m - 1;
    let nIdx = n - 1;

    for (let idx = m + n - 1; idx >= 0; idx--) {
        if (nIdx < 0 || nums1[mIdx] > nums2[nIdx]) {
            nums1[idx] = nums1[mIdx];
            mIdx--;
        } else {
            nums1[idx] = nums2[nIdx];
            nIdx--;
        }
    }
}
