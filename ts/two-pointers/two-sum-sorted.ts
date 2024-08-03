export function twoSum(numbers: number[], target: number): number[] {
    let low = 0;
    let hi = numbers.length - 1;

    while (low < hi) {
        if (numbers[low] + numbers[hi] === target) return [++low, ++hi];
        if (numbers[low] + numbers[hi] > target) hi--;
        else low++;
    }
    return [-1, -1];
}
