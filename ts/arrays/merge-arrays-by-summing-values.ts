export function mergeArrays(nums1: number[][], nums2: number[][]): number[][] {
    const res: number[][] = [];
    const m = nums1.length;
    const n = nums2.length;
    let i = 0;
    let j = 0;

    while (i < m && j < n) {
        if (nums1[i][0] < nums2[j][0]) {
            res.push([nums1[i][0], nums1[i][1]]);
            i++;
        } else if (nums2[j][0] < nums1[i][0]) {
            res.push([nums2[j][0], nums2[j][1]]);
            j++;
        } else {
            res.push([nums1[i][0], nums1[i][1] + nums2[j][1]]);
            i++;
            j++;
        }
    }

    if (i < m) {
        return res.concat(nums1.slice(i));
    }
    if (j < n) {
        return res.concat(nums2.slice(j));
    }
    return res;
}
