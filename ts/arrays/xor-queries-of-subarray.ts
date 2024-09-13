export function xorQueries(arr: number[], queries: number[][]): number[] {
    const prefix = Array(arr.length);
    prefix[0] = arr[0];

    for (let idx = 1; idx < arr.length; idx++) {
        prefix[idx] = prefix[idx - 1] ^ arr[idx];
    }

    return queries.map(([start, end]) => {
        if (start === 0) {
            return prefix[end];
        }
        return prefix[start - 1] ^ prefix[end];
    });
}
