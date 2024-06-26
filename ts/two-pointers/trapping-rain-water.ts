export function trap(height: number[]) {
    let total = 0;
    let left = 0;
    let right = height.length - 1;
    let leftMax = height[left];
    let rightMax = height[right];

    while (left < right) {
        if (height[left] < height[right]) {
            left++;
            leftMax = Math.max(leftMax, height[left]);
            total += leftMax - height[left];
        } else {
            right--;
            rightMax = Math.max(rightMax, height[right]);
            total += rightMax - height[right];
        }
    }
    return total;
}