export function maxChunksToSorted(arr: number[]): number {
    let chunks = 0;
    let max = arr[0];

    for (let idx = 0; idx < arr.length; idx++) {
        max = Math.max(max, arr[idx]);

        if (idx === max) {
            chunks++;
        }
    }

    return chunks;
}
