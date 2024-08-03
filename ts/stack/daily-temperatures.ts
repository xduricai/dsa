export function dailyTemperatures(temperatures: number[]) {
    const ret: number[] = [];
    const stack: number[] = [];

    for (let idx = 0; idx < temperatures.length; idx++) {
        while (stack.length) {
            const lastIdx = stack[stack.length - 1];
            if (temperatures[lastIdx] >= temperatures[idx]) break;

            ret[lastIdx] = idx - lastIdx;
            stack.pop();
        }
        ret.push(0);
        stack.push(idx);
    }
    return ret;
}
