// optimal solution
export function findKthNumber(n: number, k: number): number {
    let current = 1;
    let idx = 1;

    const count = (num: number) => {
        let res = 0;
        let neighbor = num + 1;

        // iterate over all levels of subtree
        while (num <= n) {
            // count all numbers on current level in subtree
            res += Math.min(neighbor, n + 1) - num;
            num *= 10;
            neighbor *= 10;
        }
        return res;
    };

    while (idx < k) {
        // get number of elements in current subtree
        const steps = count(current);

        // current + number in current tree < target
        if (idx + steps <= k) {
            // move to the right in tree
            current++;
            idx += steps;
        } else {
            // move down in tree
            current *= 10;
            idx++;
        }
    }
    return current;
}

// brute force solution
export function findKthNumberBF(n: number, k: number): number {
    let current = 1;
    let count = 1;

    while (count < k) {
        if (current * 10 <= n) {
            current = current * 10;
        } else {
            while (current % 10 === 9 || current === n) {
                current = Math.floor(current / 10);
            }
            current++;
        }
        count++;
    }
    return current;
}
