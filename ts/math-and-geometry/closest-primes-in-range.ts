export function closestPrimes(left: number, right: number): number[] {
    const root = Math.sqrt(right);
    const sieve = Array(right + 1).fill(true);
    const primes = [];

    for (let num = 2; num <= root; num++) {
        if (!sieve[num]) {
            continue;
        }
        for (let idx = num * num; idx <= right; idx += num) {
            sieve[idx] = false;
        }
    }

    for (let num = Math.max(left, 2); num <= right; num++) {
        if (sieve[num]) {
            primes.push(num);
        }
    }

    if (primes.length < 2) {
        return [-1, -1];
    }

    let res = [primes[0], primes[1]];
    let diff = primes[1] - primes[0];

    for (let idx = 2; idx < primes.length; idx++) {
        const curr = primes[idx] - primes[idx - 1];

        if (curr < diff) {
            res[0] = primes[idx - 1];
            res[1] = primes[idx];
            diff = curr;
        }
    }

    return res;
}
