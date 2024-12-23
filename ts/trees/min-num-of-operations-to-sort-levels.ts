import { TreeNode } from "./tree-node";

export function minimumOperations(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }

    let level = [root];
    let count = 0;

    while (level.length) {
        const nextLevel = [];

        for (const node of level) {
            if (node.left) {
                nextLevel.push(node.left);
            }
            if (node.right) {
                nextLevel.push(node.right);
            }
        }

        count += countSwaps(level.map((node) => node.val));
        // count += selectionSort(level);
        level = nextLevel;
    }

    return count;
}

// compare array against sorted array and perform swaps
function countSwaps(nums: number[]): number {
    const idxMap = new Map<number, number>();
    const sorted = [...nums].sort((a, b) => a - b);
    let count = 0;

    for (let idx = 0; idx < nums.length; idx++) {
        idxMap.set(nums[idx], idx);
    }

    for (let idx = 0; idx < nums.length; idx++) {
        if (nums[idx] === sorted[idx]) {
            continue;
        }

        const sortedIdx = idxMap.get(sorted[idx]);
        [nums[idx], nums[sortedIdx]] = [nums[sortedIdx], nums[idx]];

        idxMap.set(nums[sortedIdx], sortedIdx);
        count++;
    }
    return count;
}

// use selection sort
function selectionSort(nodes: TreeNode[]): number {
    let count = 0;

    for (let start = 0; start < nodes.length - 1; start++) {
        let min = start;

        for (let idx = start; idx < nodes.length; idx++) {
            if (nodes[idx].val < nodes[min].val) {
                min = idx;
            }
        }

        if (min !== start) {
            const temp = nodes[min].val;
            nodes[min].val = nodes[start].val;
            nodes[start].val = temp;
            count++;
        }
    }

    return count;
}
