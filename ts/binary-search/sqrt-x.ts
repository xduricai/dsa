function mySqrt(x: number): number {
    let left = 0;
    let right = x;
    let res = 0;

    while (left <= right) {
        const mid = left + ((right - left) >> 1);

        if (mid * mid > x) {
            right = mid - 1;
        } else {
            res = mid;
            left = mid + 1;
        }
    }

    return res;
}

export function mySqrtAlt(x: number): number {
    if (x < 2) {
        return x;
    }

    let left = 1;
    let right = x;

    while (left < right) {
        const mid = left + ((right - left) >> 1);

        if (mid * mid > x) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left - 1;
}
