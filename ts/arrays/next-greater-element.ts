export function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    const map = new Map<number, number>();
    const stack = [];

    for (const num of nums2) {
        while (stack.length && stack.at(-1) < num) {
            map.set(stack.pop(), num);
        }
        stack.push(num);
    }

    return nums1.map((num) => map.get(num) || -1);
}
