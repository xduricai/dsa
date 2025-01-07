export function numRescueBoats(people: number[], limit: number): number {
    people.sort((a, b) => a - b);

    let boats = 0;
    let left = 0;
    let right = people.length - 1;

    while (left <= right) {
        boats++;

        if (people[left] + people[right] > limit) {
            right--;
        } else {
            left++;
            right--;
        }
    }

    return boats;
}
