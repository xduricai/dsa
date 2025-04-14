// LC 1534 (https://leetcode.com/problems/count-good-triplets)

export function countGoodTriplets(
    arr: number[],
    a: number,
    b: number,
    c: number
): number {
    const n = arr.length;
    const prefix = Array(1001).fill(0);
    let res = 0;

    for (let mid = 0; mid < n - 1; mid++) {
        for (let right = mid + 1; right < n; right++) {
            if (Math.abs(arr[mid] - arr[right]) > b) {
                continue;
            }

            const l = Math.max(arr[mid] - a, arr[right] - c, 0);
            const r = Math.min(arr[mid] + a, arr[right] + c, 1000);

            if (l <= r) {
                res += prefix[r] - (l > 0 ? prefix[l - 1] : 0);
            }
        }

        for (let idx = arr[mid]; idx <= 1000; idx++) {
            prefix[idx]++;
        }
    }

    return res;
}
