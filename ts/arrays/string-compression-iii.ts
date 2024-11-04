export function compressedString(word: string): string {
    let ptr = 0;
    let c = 1;
    let comp = "";

    while (ptr < word.length) {
        while (ptr + c < word.length && word[ptr] === word[ptr + c] && c < 9) {
            c++;
        }

        comp = `${comp}${c}${word[ptr]}`;
        ptr += c;
        c = 1;
    }
    return comp;
}
