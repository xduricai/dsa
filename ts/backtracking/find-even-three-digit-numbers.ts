// LC 2094 (https://leetcode.com/problems/finding-3-digit-even-numbers)

export function findEvenNumbers(digits: number[]): number[] {
    const counter = Array(10).fill(0);
    const current = [];
    const res = [];

    for (const num of digits) {
        counter[num]++;
    }

    const backtrack = (idx: number) => {
        if (idx === 3) {
            res.push(current[0] * 100 + current[1] * 10 + current[2]);
            return;
        }

        let start = 0;
        let inc = 1;

        if (idx === 0) {
            start = 1;
        } else if (idx === 2) {
            inc = 2;
        }

        for (let num = start; num < 10; num += inc) {
            if (!counter[num]) {
                continue;
            }

            current.push(num);
            counter[num]--;

            backtrack(idx + 1);

            current.pop();
            counter[num]++;
        }
    };

    backtrack(0);
    return res;
}
