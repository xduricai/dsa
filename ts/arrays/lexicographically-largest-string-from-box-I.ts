export function answerString(word: string, numFriends: number): string {
    if (numFriends === 1) {
        return word;
    }

    const maxLen = word.length - numFriends + 1;
    let res = "";

    for (let idx = 0; idx < word.length; idx++) {
        const curr = word.slice(idx, Math.min(idx + maxLen, word.length));

        if (curr > res) {
            res = curr;
        }
    }

    return res;
}
