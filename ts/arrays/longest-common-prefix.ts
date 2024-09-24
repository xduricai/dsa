export function longestCommonPrefix(arr1: number[], arr2: number[]): number {
    const prefixes = new Set<string>();
    let max = 0;

    for (const num of arr1) {
        const str = num.toString();

        for (let end = 1; end <= str.length; end++) {
            prefixes.add(str.slice(0, end));
        }
    }

    for (const num of arr2) {
        const str = num.toString();
        if (str.length <= max) {
            continue;
        }

        for (let end = max + 1; end <= str.length; end++) {
            if (prefixes.has(str.slice(0, end))) {
                max = Math.max(max, end);
            }
        }
    }
    return max;
}
