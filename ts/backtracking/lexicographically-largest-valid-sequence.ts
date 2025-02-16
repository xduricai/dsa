export function constructDistancedSequence(n: number): number[] {
    const res = Array(n * 2 - 1).fill(0);
    const used = Array(n + 1).fill(false);

    const backtrack = (idx: number) => {
        if (idx === res.length) {
            return true;
        }

        for (let num = n; num > 0; num--) {
            // number has already been used or we cannot place the 2nd copy of it
            if (
                used[num] ||
                (num > 1 && (idx + num >= res.length || res[idx + num]))
            ) {
                continue;
            }

            used[num] = true;
            res[idx] = num;
            if (num > 1) {
                res[idx + num] = num;
            }

            // find the next available index that needs to be filled
            let next = idx + 1;
            while (next < res.length && res[next]) {
                next++;
            }
            if (backtrack(next)) {
                return true;
            }

            used[num] = false;
            res[idx] = 0;
            if (num > 1) {
                res[idx + num] = 0;
            }
        }

        return false;
    };

    backtrack(0);
    return res;
}
