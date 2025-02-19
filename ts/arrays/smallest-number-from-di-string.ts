// linear time stack solution
export function smallestNumber(pattern: string): string {
    const res = [];
    const stack = [];

    for (let idx = 0; idx <= pattern.length; idx++) {
        stack.push(idx + 1);

        while (
            stack.length &&
            (idx === pattern.length || pattern[idx] === "I")
        ) {
            res.push(stack.pop());
        }
    }

    return res.join("");
}

// suboptimal backtracking solution
export function smallestNumberAlt(pattern: string): string {
    const n = pattern.length + 1;
    const used = Array(n + 1).fill(false);
    const current = [];

    const backtrack = (idx: number) => {
        if (idx === n) {
            return true;
        }

        const min = idx === 0 || pattern[idx - 1] === "D" ? 1 : current.at(-1);
        const max = idx === 0 || pattern[idx - 1] === "I" ? n : current.at(-1);

        for (let num = min; num <= max; num++) {
            if (used[num]) {
                continue;
            }

            current.push(num);
            used[num] = true;

            if (backtrack(idx + 1)) {
                return true;
            }

            current.pop();
            used[num] = false;
        }

        return false;
    };

    backtrack(0);
    return current.join("");
}
