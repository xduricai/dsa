export function isArraySpecial(nums: number[], queries: number[][]): boolean[] {
    const validUntil = Array(nums.length).fill(nums.length);
    const stack = [];

    // keep starts of all currently running valid chains in a stack
    for (let idx = 0; idx < nums.length; idx++) {
        if (idx > 0 && nums[idx] % 2 === nums[idx - 1] % 2) {
            while (stack.length) {
                const numIdx = stack.pop();
                validUntil[numIdx] = idx;
            }
        }
        stack.push(idx);
    }

    return queries.map(([start, end]) => validUntil[start] > end);
}

export function isArraySpecialAlt(
    nums: number[],
    queries: number[][]
): boolean[] {
    const validUntil = Array(nums.length).fill(0);
    validUntil[nums.length - 1] = nums.length;

    // find all breaking points
    for (let idx = 0; idx < nums.length; idx++) {
        if (idx > 0 && nums[idx] % 2 === nums[idx - 1] % 2) {
            validUntil[idx - 1] = idx;
        }
    }

    // propagate breaking points backwards
    let current = nums.length;
    for (let idx = nums.length - 1; idx >= 0; idx--) {
        if (validUntil[idx] !== 0) {
            current = validUntil[idx];
        } else {
            validUntil[idx] = current;
        }
    }

    return queries.map(([start, end]) => validUntil[start] > end);
}
