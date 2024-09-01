// bucket sort
export function sortColors(nums: number[]): void {
    const counts = [0, 0, 0];

    for (const num of nums) {
        counts[num]++;
    }

    let idx = 0;
    for (let color = 0; color < 3; color++) {
        for (let iter = 0; iter < counts[color]; iter++) {
            nums[idx] = color;
            idx++;
        }
    }
}
