export function maximumBeauty(items: number[][], queries: number[]): number[] {
    items.sort((a, b) => a[0] - b[0]);
    const queryList = queries
        .map((q, idx) => [q, idx])
        .sort((a, b) => a[0] - b[0]);

    const output = Array(queryList.length).fill(0);
    let maxBeauty = 0;
    let itemIdx = 0;

    for (const [query, idx] of queryList) {
        while (itemIdx < items.length && items[itemIdx][0] <= query) {
            maxBeauty = Math.max(maxBeauty, items[itemIdx][1]);
            itemIdx++;
        }

        output[idx] = maxBeauty;
    }

    return output;
}

// binary search solution
export function maximumBeautyAlt(
    items: number[][],
    queries: number[]
): number[] {
    items.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));

    const maxes: [number, number][] = [];
    let maxBeauty = -1;

    // find max beauty for each cost
    for (let idx = 0; idx < items.length; idx++) {
        if (idx === items.length - 1 || items[idx][0] !== items[idx + 1][0]) {
            maxBeauty = Math.max(maxBeauty, items[idx][1]);
            maxes.push([items[idx][0], maxBeauty]);
        }
    }

    // binary search for closest matching cost
    return queries.map((target) => {
        if (target < maxes[0][0]) {
            return 0;
        }

        let left = 0;
        let right = maxes.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (maxes[mid][0] > target) {
                right = mid - 1;
            } else if (maxes[mid][0] < target) {
                left = mid + 1;
            } else {
                return maxes[mid][1];
            }
        }

        const idx = Math.floor((left + right) / 2);
        return maxes[idx][1];
    });
}
