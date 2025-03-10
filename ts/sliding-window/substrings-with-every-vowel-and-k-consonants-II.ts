export function countOfSubstrings(word: string, k: number): number {
    return atLeastK(word, k) - atLeastK(word, k + 1);
}

function atLeastK(word: string, k: number): number {
    const counter = Array(6).fill(0);
    let left = 0;
    let res = 0;

    const idx = (char: string) => {
        if (char === "a") return 1;
        if (char === "e") return 2;
        if (char === "i") return 3;
        if (char === "o") return 4;
        if (char === "u") return 5;
        return 0;
    };

    const isValid = () =>
        counter[1] > 0 &&
        counter[2] > 0 &&
        counter[3] > 0 &&
        counter[4] > 0 &&
        counter[5] > 0 &&
        counter[0] >= k;

    for (let right = 0; right < word.length; right++) {
        counter[idx(word[right])]++;

        while (isValid()) {
            res += word.length - right;
            counter[idx(word[left])]--;
            left++;
        }
    }

    return res;
}
