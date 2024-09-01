import { Pair } from "./pair";

export function insertionSort(pairs: Pair[]) {
    const states: Pair[][] = [];

    for (let iter = 0; iter < pairs.length; iter++) {
        for (let idx = iter; idx > 0; idx--) {
            if (pairs[idx].key >= pairs[idx - 1].key) {
                break;
            }

            const temp = pairs[idx];
            pairs[idx] = pairs[idx - 1];
            pairs[idx - 1] = temp;
        }
        states.push([...pairs]);
    }
    return states;
}
