export function largestNumber(nums: number[]): string {
    if (nums.every((num) => num === 0)) {
        return "0";
    }

    return nums
        .map((num) => num.toString())
        .sort((a, b) => {
            const ab = `${a}${b}`;
            const ba = `${b}${b}`;
            return ab < ba ? 1 : -1;
        })
        .join("");
}
