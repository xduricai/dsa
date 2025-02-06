export function areAlmostEqual(s1: string, s2: string): boolean {
    let swapIdx = -1;
    let swapped = false;

    for (let idx = 0; idx < s1.length; idx++) {
        if (s1[idx] === s2[idx]) {
            continue;
        }

        if (swapped) {
            return false;
        }

        if (swapIdx === -1) {
            swapIdx = idx;
        } else if (s1[idx] === s2[swapIdx] && s1[swapIdx] === s2[idx]) {
            swapped = true;
        } else {
            return false;
        }
    }

    return swapIdx === -1 || swapped;
};