export function findOrder(
    numCourses: number,
    prerequisites: [number, number][]
) {
    const lists = new Map<number, number[]>();
    const visit = new Set<number>();
    const cycle = new Set<number>();
    const output = [];

    for (const [course, req] of prerequisites) {
        const list = lists.get(course);

        if (list) {
            list.push(req);
        } else {
            lists.set(course, [req]);
        }
    }

    const dfs = (course: number) => {
        if (cycle.has(course)) {
            return false;
        }
        if (visit.has(course)) {
            return true;
        }

        cycle.add(course);
        for (const req of lists.get(course) || []) {
            if (!dfs(req)) {
                return false;
            }
        }
        cycle.delete(course);
        visit.add(course);
        output.push(course);

        return true;
    };

    for (let course = 0; course < numCourses; course++) {
        if (!dfs(course)) {
            return [];
        }
    }
    return output;
}
