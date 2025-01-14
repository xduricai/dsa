export function findThePrefixCommonArray(A: number[], B: number[]): number[] {
    const seen = Array(A.length).fill(false);
    const res = Array(A.length);
    let count = 0;

    for (let idx = 0; idx < A.length; idx++) {
        if (seen[A[idx]]) {
            count++;
        } else {
            seen[A[idx]] = true;
        }

        if (seen[B[idx]]) {
            count++;
        } else {
            seen[B[idx]] = true;
        }

        res[idx] = count;
    }

    return res;
}
