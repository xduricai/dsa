export function addOperators(num: string, target: number): string[] {
    const res = [];
    const ops = [];

    const backtrack = (
        idx: number,
        value: number,
        prevNum: number,
        currNum: number
    ) => {
        if (idx === num.length) {
            if (value === target && currNum === 0) {
                res.push(ops.join("").substring(1));
            }
            return;
        }

        currNum = currNum * 10 + parseInt(num[idx]);
        const currStr = currNum.toString();

        if (currNum > 0) {
            backtrack(idx + 1, value, prevNum, currNum);
        }

        ops.push("+");
        ops.push(currStr);
        backtrack(idx + 1, value + currNum, currNum, 0);
        ops.pop();
        ops.pop();

        if (ops.length) {
            ops.push("-");
            ops.push(currStr);
            backtrack(idx + 1, value - currNum, -currNum, 0);
            ops.pop();
            ops.pop();

            ops.push("*");
            ops.push(currStr);
            backtrack(
                idx + 1,
                value - prevNum + prevNum * currNum, // undo the previous operation, then multiply the previous number and add it back
                prevNum * currNum,
                0
            );
            ops.pop();
            ops.pop();
        }
    };

    backtrack(0, 0, 0, 0);
    return res;
}
