// DP solution
export function integerBreak(n: number): number {
    const DP = Array(n + 1).fill(1);

    for (let num = 2; num < n; num++) {
        for (let idx = num; idx <= n; idx++) {
            DP[idx] = Math.max(DP[idx], DP[idx - num] * num);
        }
    }

    return DP[n];
}

// significantly more optimal solution
export function integerBreakAlt(n: number): number {
    if (n <= 3) {
        return n - 1;
    }

    let res = Math.pow(3, Math.floor(n / 3));
    if (n % 3 === 1) {
        return Math.floor(res / 3) * 4;
    }

    return res * Math.max(1, n % 3);
}
