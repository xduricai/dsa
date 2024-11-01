export function reconstructQueue(people: number[][]): number[][] {
    people.sort((a, b) => (a[0] !== b[0] ? b[0] - a[0] : a[1] - b[1]));

    const output = [];

    for (let idx = 0; idx < people.length; idx++) {
        output.splice(people[idx][1], 0, people[idx]);
    }
    return output;
}
