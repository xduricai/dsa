export function numOfSubarrays(arr: number[]): number {
    const PRIME = 10 ** 9 + 7;
    let even = 0;
    let odd = 0;
    let sum = 0;
    let res = 0;

    for (const num of arr) {
        sum += num % 2;

        if (sum % 2 === 1) {
            res += even + 1;
            odd++;
        } else {
            res += odd;
            even++;
        }

        res %= PRIME;
    }

    return res;
}

export function numOfSubarraysDP(arr: number[]): number {
    const PRIME = 10 ** 9 + 7;
    const dp = [0, 0];
    let res = 0;
    let current = 0;

    for (let idx = 0; idx < arr.length; idx++) {
        current++;

        if (arr[idx] % 2 === 0) {
            res += dp[1];
            res %= PRIME;
            continue;
        }

        const temp = dp[0] + current;
        dp[0] = dp[1];
        dp[1] = temp;

        current = 0;
        res += temp;
        res %= PRIME;
    }

    return res;
}
