export function countStudents(
    students: number[],
    sandwiches: number[]
): number {
    while (sandwiches.length) {
        const max = students.length;
        let count = 0;

        for (let iter = 0; iter < max; iter++) {
            const student = students.shift();

            if (student !== sandwiches[0]) {
                students.push(student);
            } else {
                sandwiches.shift();
                count++;
            }
        }
        if (!count) {
            return students.length;
        }
    }
    return 0;
}
