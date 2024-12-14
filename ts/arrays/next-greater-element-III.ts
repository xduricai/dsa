function nextGreaterElement(n: number): number {
    const nums = n.toString().split("");
    let first = -1;
    let last = -1;

    // find the first element that isn't in a decreasing sequence (from the end)
    for (let idx = nums.length - 2; idx >= 0; idx--) {
        if (nums[idx] < nums[idx + 1]) {
            first = idx;
            break;
        }
    }

    if (first === -1) {
        return -1;
    }

    // find the last element that's greater than first
    last = first + 1;
    for (let idx = first + 1; idx < nums.length; idx++) {
        if (nums[idx] <= nums[last] && nums[idx] > nums[first]) {
            last = idx;
        }
    }

    // swap the two numbers
    const temp = nums[first];
    nums[first] = nums[last];
    nums[last] = temp;

    // reverse the part of the number after the number that was swapped
    const left = nums.slice(0, first + 1);
    const right = nums.slice(first + 1).reverse();

    const res = parseInt(left.concat(right).join(""));

    // handle possible overflow
    return res < (1 << 31) * -1 ? res : -1;
}
