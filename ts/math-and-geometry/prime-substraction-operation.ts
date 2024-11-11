export function primeSubOperation(nums: number[]): boolean {
    const primes = [2];

    const extendPrimes = (target: number) => {
        for (
            let current = primes.at(-1) + 1;
            primes.at(-1) <= target;
            current++
        ) {
            const root = Math.sqrt(current);

            for (const prime of primes) {
                if (prime > root) {
                    primes.push(current);
                    break;
                }
                if (current % prime === 0) {
                    break;
                }
            }
        }
    };

    for (let idx = nums.length - 2; idx >= 0; idx--) {
        const diff = nums[idx] - nums[idx + 1];

        if (diff < 0) {
            continue;
        }

        extendPrimes(diff);
        const prime = primes.find((num) => num > diff);

        if (prime >= nums[idx]) {
            return false;
        }
        nums[idx] -= prime;
    }

    return true;
}
