// DP solution
export function lenLongestFibSequence(arr: number[]): number {
    const idxMap = new Map<number, number>();
    const dp = new Map<string, number>();
    let max = 0;

    for (let i = 0; i < arr.length; i++) {
        idxMap.set(arr[i], i);
    }

    for (let second = 1; second < arr.length; second++) {
        for (let first = 0; first < second; first++) {
            const prev = arr[second] - arr[first];

            if (prev >= arr[first] || !idxMap.has(prev)) {
                continue;
            }
            const prevIdx = idxMap.get(prev);
            const len = (dp.get(`${prevIdx}-${first}`) || 2) + 1;

            dp.set(`${first}-${second}`, len);
            max = Math.max(len, max);
        }
    }

    if (max <= 2) {
        return 0;
    }
    return max;
}

// burte force solution
export function lenLongestFibSubseqBF(arr: number[]): number {
    const nums = new Set(arr);
    let max = 2;

    for (let first = 0; first < arr.length - 3; first++) {
        for (let second = first + 1; second < arr.length - 2; second++) {
            let numA = arr[first];
            let numB = arr[second];
            let len = 2;

            while (nums.has(numA + numB)) {
                const temp = numA + numB;
                numA = numB;
                numB = temp;
                len++;
            }

            max = Math.max(max, len);
        }
    }

    if (max <= 2) {
        return 0;
    }
    return max;
}
