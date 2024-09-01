import { Pair } from "./pair";

export function mergeSort(pairs: Pair[]): Pair[] {
    if (pairs.length <= 1) {
        return pairs;
    }

    const mid = Math.floor(pairs.length / 2);
    const left = mergeSort(pairs.slice(0, mid));
    const right = mergeSort(pairs.slice(mid));

    return merge(left, right);
}

function merge(left: Pair[], right: Pair[]): Pair[] {
    const res = Array<Pair>(left.length + right.length);
    let pLeft = 0;
    let pRight = 0;

    for (let idx = 0; idx < res.length; idx++) {
        if (
            pRight >= right.length || // right is out of bounds
            (pLeft < left.length && left[pLeft].key <= right[pRight].key) // left is in bounds and smaller/equal to right
        ) {
            res[idx] = left[pLeft];
            pLeft++;
        } else {
            res[idx] = right[pRight];
            pRight++;
        }
    }
    return res;
}
