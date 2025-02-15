export function punishmentNumber(n: number): number {
    let res = 0;

    for (let num = 1; num <= n; num++) {
        if (isValid(num)) {
            res += num * num;
        }
    }

    return res;
}

function isValid(num: number) {
    const square = num * num;
    const str = square.toString();
    let sum = 0;

    const backtrack = (start: number) => {
        if (start === str.length) {
            return sum === num;
        }
        if (sum > num) {
            return false;
        }

        for (let idx = start; idx < str.length; idx++) {
            const val = parseInt(str.slice(start, idx + 1));
            sum += val;

            if (backtrack(idx + 1)) {
                return true;
            }
            sum -= val;
        }

        return false;
    };

    return backtrack(0);
}
