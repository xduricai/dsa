// LC 898 (https://leetcode.com/problems/bitwise-ors-of-subarrays)

export function subarrayBitwiseORs(arr: number[]): number {
    const res = new Set<number>();
    let curr = new Set<number>();

    for (const num of arr) {
        const temp = new Set<number>();

        for (const el of curr) {
            temp.add(num | el);
        }

        temp.add(num);
        curr = temp;

        for (const el of curr) {
            res.add(el);
        }
    }

    return res.size;
}
