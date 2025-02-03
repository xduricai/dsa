export function longestMonotonicSubarray(nums: number[]): number {
    let res = 1;
    let curr = 1;
    let sign = "";

    for (let idx = 1; idx < nums.length; idx++) {
        if (nums[idx - 1] < nums[idx]) {
            if (sign === "<") {
                curr++;
            } else {
                curr = 2;
                sign = "<";
            }
        } else if (nums[idx - 1] > nums[idx]) {
            if (sign === ">") {
                curr++;
            } else {
                curr = 2;
                sign = ">";
            }
        } else {
            curr = 1;
            sign = "";
        }
        res = Math.max(curr, res);
    }

    return res;
}
