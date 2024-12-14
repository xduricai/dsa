function secondGreaterElement(nums: number[]): number[] {
    const output = Array(nums.length).fill(-1);
    const stack1 = [];
    const stack2 = [];
    const temp = [];

    for (let idx = 0; idx < nums.length; idx++) {
        // any elements that we already found the 2nd greater num for can be written to output
        while (stack2.length && nums[stack2.at(-1)] < nums[idx]) {
            output[stack2.pop()] = nums[idx];
        }

        // all elements that we've found a single greater num for can be pushed into the 2nd stack (temp first)
        while (stack1.length && nums[stack1.at(-1)] < nums[idx]) {
            temp.push(stack1.pop());
        }

        // use temp to add the elements in reverse order than they were popped
        // this keeps them sorted in descending order
        while (temp.length) {
            stack2.push(temp.pop());
        }
        stack1.push(idx);
    }

    return output;
}
