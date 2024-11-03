export function permuteUnique(nums: number[]): number[][] {
    const output = [];
    const current = [];

    const counter = new Map<number, number>();
    for (const num of nums) {
        counter.set(num, (counter.get(num) || 0) + 1);
    }

    const dfs = () => {
        if (current.length === nums.length) {
            output.push([...current]);
            return;
        }

        for (const key of counter.keys()) {
            if (!counter.get(key)) {
                continue;
            }

            current.push(key);
            counter.set(key, counter.get(key) - 1);

            dfs();

            counter.set(key, counter.get(key) + 1);
            current.pop();
        }
    };

    dfs();
    return output;
}

export function permuteUniqueAlt(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const current = [];
    const output = [];

    const backtrack = (values: number[]) => {
        if (!values.length) {
            output.push([...current]);
            return;
        }

        for (let idx = 0; idx < values.length; idx++) {
            current.push(values[idx]);
            backtrack(values.filter((_, index) => index !== idx));
            current.pop();

            while (idx + 1 < values.length && values[idx] === values[idx + 1]) {
                idx++;
            }
        }
    };

    backtrack(nums);
    return output;
}
