export function fullJustify(words: string[], maxWidth: number): string[] {
    const lines = [];
    let currentLine = { words: [], length: 0 };
    let minPadding = maxWidth;

    for (const word of words) {
        if (currentLine.length === 0) {
            currentLine.words.push(word);
            currentLine.length = word.length;
        } else if (currentLine.length + word.length + 1 <= maxWidth) {
            currentLine.words.push(word);
            currentLine.length += word.length + 1;
        } else {
            lines.push(currentLine);
            currentLine = { words: [word], length: word.length };
        }
    }

    const lastLine = `${currentLine.words.join(" ")}${getSpaces(
        maxWidth - currentLine.length
    )}`;
    const formattedLines = lines.map((line) =>
        getFormattedLine(line.words, maxWidth - line.length)
    );
    formattedLines.push(lastLine);

    return formattedLines;
}

function getFormattedLine(words: string[], totalSpaces: number) {
    if (words.length === 1) {
        return `${words[0]}${getSpaces(totalSpaces)}`;
    }

    const spacesPerGap = Math.floor(totalSpaces / (words.length - 1));
    let extraSpaces = totalSpaces % (words.length - 1);
    let output = words[0];

    for (let idx = 1; idx < words.length; idx++) {
        totalSpaces -= spacesPerGap;

        if (extraSpaces > 0) {
            output = `${output}${" "}`;
            extraSpaces--;
        }

        output = `${output}${getSpaces(spacesPerGap + 1)}${words[idx]}`;
    }

    return output;
}

function getSpaces(n: number) {
    return Array(n).fill(" ").join("");
}
