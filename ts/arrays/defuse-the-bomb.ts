// brute force solution
export function decrypt(code: number[], k: number): number[] {
    const n = code.length;
    const output = Array(n).fill(0);

    for (let digit = 0; digit < n; digit++) {
        let sum = 0;
        let count = 0;
        let idx = digit;

        while (count < Math.abs(k)) {
            if (k >= 0) {
                idx = (idx + 1) % n;
            } else {
                idx = (idx - 1 + n) % n;
            }

            sum += code[idx];
            count++;
        }

        output[digit] = sum;
    }

    return output;
}

// prefix sum solution
export function decryptAlt(code: number[], k: number): number[] {
    const prefixSums = Array(code.length + 1).fill(0);
    for (let idx = 0; idx < code.length; idx++) {
        prefixSums[idx + 1] = code[idx] + prefixSums[idx];
    }

    return code.map((_, idx) => {
        let start = 0;
        let end = 0;

        if (k > 0) {
            start = (idx + 1) % code.length;
            end = (idx + k) % code.length;
        } else if (k < 0) {
            start = (idx + k + code.length) % code.length;
            end = (idx - 1 + code.length) % code.length;
        } else {
            return 0;
        }

        if (start <= end) {
            return prefixSums[end + 1] - prefixSums[start];
        } else {
            return (
                prefixSums[end + 1] +
                (prefixSums[code.length] - prefixSums[start])
            );
        }
    });
}
