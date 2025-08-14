// LC 2264 (https://leetcode.com/problems/largest-3-same-digit-number-in-string)

export function largestGoodInteger(num: string): string {
    let res = -1;

    for (let idx = 2; idx < num.length; idx++) {
        if (num[idx] === num[idx - 1] && num[idx - 1] === num[idx - 2]) {
            res = Math.max(res, Number(num[idx]));
            idx += 2;
        }
    }

    if (res === -1) {
        return "";
    }

    return res.toString().repeat(3);
}