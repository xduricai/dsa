export function minimumSize(nums: number[], maxOperations: number): number {
    let left = 1;
    let right = Math.max(...nums);

    while (left < right) {
        console.log(left, right);
        const target = (left + right) >> 1;
        const canReach = getPenalty(nums, target, maxOperations);

        if (canReach) {
            right = target;
        } else {
            left = target + 1;
        }
    }
    return left;
}

function getPenalty(nums: number[], target: number, ops: number) {
    for (const num of nums) {
        // subtract the cost of making the current bag into target sized bags
        ops -= Math.ceil(num / target) - 1;

        // ran out of operations
        if (ops < 0) {
            return false;
        }
    }
    return true;
}
