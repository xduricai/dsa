export function maxArea(heights: number[]) {
    let max = 0;
    let low = 0;
    let hi = heights.length - 1;

    while (low < hi) {
        if (heights[low] < heights[hi]) {
            const area = heights[low] * (hi - low);
            max = Math.max(area, max);

            const curr = heights[low];
            while (heights[low] <= curr) {
                low++;
            }
        } else {
            const area = heights[hi] * (hi - low);
            max = Math.max(area, max);

            const curr = heights[hi];
            while (heights[hi] <= curr) {
                hi--;
            }
        }
    }
    return max;
}
