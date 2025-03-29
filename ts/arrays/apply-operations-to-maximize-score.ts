// LC 2818 (https://leetcode.com/problems/apply-operations-to-maximize-score)

export function maximumScore(nums: number[], k: number): number {
    const primes = sieve(Math.max(...nums));
    const mod = 10 ** 9 + 7;
    const n = nums.length;

    const scores = nums.map((num) => getScore(num, primes));
    const sortedNums = nums
        .map((num, idx) => [num, idx])
        .sort((a, b) => (a[0] !== b[0] ? b[0] - a[0] : a[1] - b[1]));

    const left = Array(n).fill(-1);
    const right = Array(n).fill(n);
    const stack = [];
    let res = 1;

    // monotonic stack step
    for (let idx = 0; idx < n; idx++) {
        while (stack.length && scores[stack.at(-1)] < scores[idx]) {
            right[stack.pop()] = idx;
        }

        if (stack.length) {
            left[idx] = stack.at(-1);
        }
        stack.push(idx);
    }

    for (const [num, idx] of sortedNums) {
        const count = (idx - left[idx]) * (right[idx] - idx);
        const pow = Math.min(count, k);

        // causes TLE, fast exponentiation required
        for (let iter = 0; iter < pow; iter++) {
            res *= num;
            res %= mod;
        }

        k -= pow;
        if (!k) break;
    }

    return res;
}

function getScore(num: number, primes: number[]) {
    let count = 0;

    for (const prime of primes) {
        if (prime > num) {
            break;
        }
        if (num % prime === 0) {
            count++;
        }
    }

    return count;
}

// get all relevant prime numbers
function sieve(max: number) {
    const isPrime = Array(max + 1).fill(true);
    const res = [];

    for (let num = 2; num <= max; num++) {
        if (!isPrime[num]) {
            continue;
        }
        res.push(num);

        for (let idx = num + num; idx <= max; idx += num) {
            isPrime[idx] = false;
        }
    }

    return res;
}
