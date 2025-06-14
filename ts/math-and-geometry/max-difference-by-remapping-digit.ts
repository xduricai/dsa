// LC 2566 (https://leetcode.com/problems/maximum-difference-by-remapping-a-digit)

export function minMaxDifference(num: number): number {
    const str = num.toString();
    let min = str.replaceAll(str[0], "0");
    let max = str;

    for (let idx = 0; idx < str.length; idx++) {
        if (str[idx] !== "9") {
            max = str.replaceAll(str[idx], "9");
            break;
        }
    }

    return Number(max) - Number(min);
}
