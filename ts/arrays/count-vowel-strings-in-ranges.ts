export function vowelStrings(words: string[], queries: number[][]): number[] {
    const regex = /^[aeiou]$|^[aeiou].*[aeiou]$/;
    const prefixSums = Array(words.length + 1).fill(0);

    for (let idx = 0; idx < words.length; idx++) {
        prefixSums[idx + 1] = prefixSums[idx];

        if (regex.test(words[idx])) {
            prefixSums[idx + 1]++;
        }
    }

    return queries.map(
        ([left, right]) => prefixSums[right + 1] - prefixSums[left]
    );
}
