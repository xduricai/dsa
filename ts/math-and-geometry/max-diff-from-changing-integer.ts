// LC 1432 (https://leetcode.com/problems/max-difference-you-can-get-from-changing-an-integer)

export function maxDiff(num: number): number {
    const str = num.toString();
    const seen = Array(10).fill(false);
    let max = str;
    let min = str;

    for (let idx = 0; idx < str.length; idx++) {
        if (str[idx] !== "9") {
            max = str.replaceAll(str[idx], "9");
            break;
        }
    }

    for (let idx = 0; idx < str.length; idx++) {
        if (str[idx] === "0" || str[idx] === "1") {
            continue;
        }

        if (str[0] === str[idx]) {
            min = str.replaceAll(str[idx], "1");
        } else {
            min = str.replaceAll(str[idx], "0");
        }
        break;
    }

    return Number(max) - Number(min);
}
