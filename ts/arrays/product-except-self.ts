export function productExceptSelf(nums: number[]) {
    const prefix = Array(nums.length);
    const postfix = Array(nums.length);

    for (let idxL = 0; idxL < nums.length; idxL++) {
        const idxR = nums.length - 1 - idxL;

        if (idxL === 0) {
            prefix[idxL] = nums[idxL];
            postfix[idxR] = nums[idxR];
            continue;
        }

        prefix[idxL] = prefix[idxL - 1] * nums[idxL];
        postfix[idxR] = postfix[idxR + 1] * nums[idxR];
    }

    return nums.map((_, idx) => {
        if (idx === 0) return postfix[idx + 1];
        if (idx === nums.length - 1) return prefix[idx - 1];
        return prefix[idx - 1] * postfix[idx + 1];
    });
}

export function productExceptSelfAlt(nums: number[]) {
    let hadZero = false;

    const total = nums.reduce((acc, current) => {
        if (current) return acc * current;
        if (hadZero) return 0;

        hadZero = true;
        return acc;
    }, 1);

    return nums.map((num) => {
        if (num === 0) return total;
        if (hadZero) return 0;
        return total / num;
    });
}
