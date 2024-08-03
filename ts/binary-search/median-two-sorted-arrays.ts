export function findMedianSortedArrays(nums1: number[], nums2: number[]) {
    // init arrays
    let a: number[];
    let b: number[];

    if (nums1.length <= nums2.length) {
        a = nums1;
        b = nums2;
    } else {
        a = nums2;
        b = nums1;
    }

    //init partitions
    const total = a.length + b.length;
    const half = Math.floor(total / 2);
    let left = 0;
    let right = a.length - 1;

    while (true) {
        const midA = Math.floor((left + right) / 2);
        const midB = half - midA - 2;

        const leftA = midA >= 0 ? a[midA] : -Infinity;
        const rightA = midA + 1 < a.length ? a[midA + 1] : Infinity;
        const leftB = midB >= 0 ? b[midB] : -Infinity;
        const rightB = midB + 1 < b.length ? b[midB + 1] : Infinity;

        if (leftA <= rightB && leftB <= rightA) {
            if (total % 2 === 1) {
                return Math.min(rightA, rightB);
            } else {
                return (Math.max(leftA, leftB) + Math.min(rightA, rightB)) / 2;
            }
        }
        if (leftA > rightB) {
            right = midA - 1;
        } else {
            left = midA + 1;
        }
    }
    return null;
}
