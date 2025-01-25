export function lexicographicallySmallestArray(
    nums: number[],
    limit: number
): number[] {
    const n = nums.length;
    const sorted = [...nums].sort((a, b) => b - a);
    const groupMap = new Map<number, number[]>();
    const res = [];

    let group = [];

    for (const num of sorted) {
        if (!group.length || num + limit >= group.at(-1)) {
            group.push(num);
        } else {
            group = [num];
        }
        groupMap.set(num, group);
    }

    for (const num of nums) {
        const group = groupMap.get(num);
        const next = group.pop();
        res.push(next);
    }

    return res;
}
