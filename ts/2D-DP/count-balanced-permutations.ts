// LC 3343 (https://leetcode.com/problems/count-number-of-balanced-permutations)

export function countBalancedPermutations(num: string): number {
    const mod = 1_000_000_007n;
    const n = num.length;
    const counter = Array(10).fill(0);
    let sum = 0;

    for (const char of num) {
        const num = Number(char);
        sum += num;
        counter[num]++;
    }

    if (sum % 2 === 1) {
        return 0;
    }

    const target = sum / 2;
    const half = Math.ceil(n / 2);
    const combinations: bigint[][] = Array.from({ length: half + 1 }, () =>
        Array(half + 1).fill(0n)
    );

    for (let row = 0; row <= half; row++) {
        combinations[row][0] = 1n;
        combinations[row][row] = 1n;

        for (let col = 1; col < row; col++) {
            combinations[row][col] =
                (combinations[row - 1][col] + combinations[row - 1][col - 1]) %
                mod;
        }
    }

    const dp: bigint[][] = Array.from({ length: target + 1 }, () =>
        Array(half + 1).fill(0n)
    );
    dp[0][0] = 1n;

    let psum = 0;
    let totalSum = 0;

    for (let idx = 0; idx <= 9; idx++) {
        psum += counter[idx];
        totalSum += idx * counter[idx];

        for (
            let oddCount = Math.min(psum, half);
            oddCount >= Math.max(0, psum - (n - half));
            oddCount--
        ) {
            const evenCnt = psum - oddCount;

            for (
                let curr = Math.min(totalSum, target);
                curr >= Math.max(0, totalSum - target);
                curr--
            ) {
                let res = 0n;

                for (
                    let j = Math.max(0, counter[idx] - evenCnt);
                    j <= Math.min(counter[idx], oddCount) && idx * j <= curr;
                    j++
                ) {
                    const ways =
                        (combinations[oddCount][j] *
                            combinations[evenCnt][counter[idx] - j]) %
                        mod;
                    res =
                        (res +
                            ((ways * dp[curr - idx * j][oddCount - j]) % mod)) %
                        mod;
                }
                dp[curr][oddCount] = res % mod;
            }
        }
    }

    return Number(dp.at(-1).at(-1));
}
