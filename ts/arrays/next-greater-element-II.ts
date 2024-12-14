// optimal solution
export function nextGreaterElements(nums: number[]): number[] {
    const output = Array(nums.length).fill(-1);
    const stack = [];

    for (let idx = 0; idx < nums.length; idx++) {
        while (stack.length && nums[stack.at(-1)] < nums[idx]) {
            output[stack.pop()] = nums[idx];
        }
        stack.push(idx);
    }

    for (let idx = 0; idx < nums.length; idx++) {
        while (stack.length && nums[stack.at(-1)] < nums[idx]) {
            output[stack.pop()] = nums[idx];
        }
    }

    return output;
}

// suboptimal solution that uses a hashmap
export function nextGreaterElementsAlt(nums: number[]): number[] {
    const map = new Map<number, number>();
    const stack = [];

    for (let idx = 0; idx < nums.length; idx++) {
        while (stack.length && nums[stack.at(-1)] < nums[idx]) {
            map.set(stack.pop(), nums[idx]);
        }
        stack.push(idx);
    }

    for (let idx = 0; idx < nums.length; idx++) {
        while (stack.length && nums[stack.at(-1)] < nums[idx]) {
            map.set(stack.pop(), nums[idx]);
        }
    }

    return nums.map((num, idx) => (map.has(idx) ? map.get(idx) : -1));
}
