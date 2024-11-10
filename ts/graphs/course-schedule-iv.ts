export function checkIfPrerequisite(
    numCourses: number,
    prerequisites: number[][],
    queries: number[][]
): boolean[] {
    const adjList = new Map<number, number[]>();
    const reqs = new Map<number, Set<number>>();

    for (const [req, course] of prerequisites) {
        const list = adjList.get(course);
        if (list) {
            list.push(req);
        } else {
            adjList.set(course, [req]);
        }
    }

    const dfs = (course: number) => {
        if (reqs.has(course)) {
            return reqs.get(course);
        }

        const output = new Set<number>();

        for (const req of adjList.get(course) || []) {
            output.add(req);

            for (const element of dfs(req)) {
                output.add(element);
            }
        }

        reqs.set(course, output);
        return output;
    };

    for (let course = 0; course < numCourses; course++) {
        dfs(course);
    }

    return queries.map(([req, course]) => reqs.get(course).has(req));
}
