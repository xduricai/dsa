export function applyOperations(nums: number[]): number[] {
    const res = [];
    let prev = 0;

    for (const num of nums) {
        if (!num) {
            prev = 0;
        } else if (num === prev) {
            res[res.length - 1] += num;
            prev = 0;
        } else {
            res.push(num);
            prev = num;
        }
    }

    return res.concat(Array(nums.length - res.length).fill(0));
}
