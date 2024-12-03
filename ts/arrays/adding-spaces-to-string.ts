export function addSpaces(s: string, spaces: number[]): string {
    const split = s.split("");
    let output = s.slice(0, spaces[0]);

    for (let idx = 0; idx < spaces.length - 1; idx++) {
        output = `${output} ${s.slice(spaces[idx], spaces[idx + 1])}`;
    }
    output = `${output} ${s.slice(spaces.at(-1))}`;

    return output;
}
