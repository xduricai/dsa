// LC 1922 (https://leetcode.com/problems/count-good-numbers)

export function countGoodNumbers(n: number): number {
    const mod = 1_000_000_007n;
    const even = Math.ceil(n / 2);
    const odd = n - even;

    const pow = (base: bigint, exp: bigint) => {
        let res = 1n;

        while (exp > 0) {
            if (exp % 2n === 1n) {
                res = (res * base) % mod;
            }

            if (exp % 2n === 1n) {
                exp--;
            }

            exp = exp / 2n;
            base = (base * base) % mod;
        }

        return res;
    };

    return Number((pow(5n, BigInt(even)) * pow(4n, BigInt(odd))) % mod);
}

/* python solution
def countGoodNumbers(self, n: int) -> int:
    mod = 10 ** 9 + 7
    a = ceil(n / 2)
    b = n - a

    return (pow(5, a, mod) * pow(4, b, mod)) % mod
*/
