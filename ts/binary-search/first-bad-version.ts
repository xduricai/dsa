export const solution = function (isBadVersion: (n: number) => number) {
    return function (n: number): number {
        let low = 1;
        let hi = n;

        while (low <= hi) {
            const mid = Math.floor((low + hi) / 2);

            if (!isBadVersion(mid)) {
                low = mid + 1;
            } else if (mid > 1 && isBadVersion(mid - 1)) {
                hi = mid - 1;
            } else {
                return mid;
            }
        }
        return -1;
    };
};
