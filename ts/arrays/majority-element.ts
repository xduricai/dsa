export function majorityElement(nums: number[]): number {
    let res = 0;
    let count = 1;

    for (const num of nums) {
        if (num === res) {
            count++;
        } else if (count === 1) {
            res = num;
        } else {
            count--;
        }
    }

    return res;
}
