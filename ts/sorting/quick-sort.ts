import { Pair } from "./pair";

export function quickSort(pairs: Pair[]) {
    qs(pairs, 0, pairs.length - 1);
    return pairs;
}

function qs(pairs: Pair[], left: number, right: number) {
    if (left >= right) {
        return;
    }
    const pivot = pairs[right];
    let pIdx = left;

    for (let idx = left; idx < right; idx++) {
        if (pairs[idx].key >= pivot.key) {
            continue;
        }
        const temp = pairs[pIdx];
        pairs[pIdx] = pairs[idx];
        pairs[idx] = temp;

        pIdx++;
    }
    pairs[right] = pairs[pIdx];
    pairs[pIdx] = pivot;

    qs(pairs, left, pIdx - 1);
    qs(pairs, pIdx + 1, right);
}
