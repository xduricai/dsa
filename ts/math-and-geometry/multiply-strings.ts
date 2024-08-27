export function multiply(num1: string, num2: string): string {
    const res = Array(num1.length + num2.length).fill(0);
    const digits1 = num1.split("").reverse();
    const digits2 = num2.split("").reverse();

    for (let outer = 0; outer < digits1.length; outer++) {
        for (let inner = 0; inner < digits2.length; inner++) {
            res[inner + outer] +=
                parseInt(digits2[inner]) * parseInt(digits1[outer]);
            res[inner + outer + 1] += Math.floor(res[inner + outer] / 10);
            res[inner + outer] %= 10;
        }
    }

    for (let idx = res.length - 1; idx >= 0; idx--) {
        if (res[idx] !== 0) {
            return res
                .slice(0, idx + 1)
                .reverse()
                .join("");
        }
    }
    return "0";
}
