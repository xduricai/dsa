export function evalRPN(tokens: string[]) {
    const nums = [];

    for (let token of tokens) {
        if (!/^[+-/*]$/.test(token)) {
            nums.push(parseInt(token));
            continue;
        }
        const num = nums.pop();

        if (token === "+") nums[nums.length - 1] += num;
        else if (token === "*") nums[nums.length - 1] *= num;
        else if (token === "-") nums[nums.length - 1] -= num;
        else if (token === "/")
            nums[nums.length - 1] = Math.trunc(nums[nums.length - 1] / num);
        else return undefined;
    }
    return nums.pop();
}
