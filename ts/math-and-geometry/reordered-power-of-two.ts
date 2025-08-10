// LC 869 (https://leetcode.com/problems/reordered-power-of-2)

export function reorderedPowerOf2(n: number): boolean {
    const parse = (num: number) => num.toString().split("").sort().join("");

    const max = 10 ** 9;
    const target = parse(n);
    let curr = 1;

    while (curr < max) {
        const num = parse(curr);

        if (num === target) {
            return true;
        }
        curr <<= 1;
    }

    return false;
}
