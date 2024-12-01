// Use cache if asked to find highest importance employee
// Use set if subordinates can be shared between employees
export function getImportance(employees: Employee[], id: number): number {
    const people = new Map<number, Employee>();

    const dfs = (id: number) => {
        const person = people.get(id);
        let sum = person.importance;

        for (const sub of person.subordinates) {
            sum += dfs(sub);
        }

        return sum;
    };

    for (const person of employees) {
        people.set(person.id, person);
    }

    return dfs(id);
}

type Employee = {
    id: number;
    importance: number;
    subordinates: number[];
};
