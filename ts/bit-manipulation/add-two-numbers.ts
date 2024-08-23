export function getSum(a: number, b: number): number {
    const add = (a: number, b: number) => {
        if (a === 0 || b === 0) {
            return a | b;
        }
        return add(a ^ b, (a & b) << 1);
    };
    return add(a, b);
}
