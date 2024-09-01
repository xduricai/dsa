export function guessNumber(n: number): number {
    let low = 1;
    let hi = n;

    while (low <= hi) {
        const mid = Math.floor((low + hi) / 2);
        const res = guess(mid);

        if (res < 0) {
            hi = mid - 1;
        } else if (res > 0) {
            low = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
}

// ignore
function guess(n: number) {
    return 0;
}
