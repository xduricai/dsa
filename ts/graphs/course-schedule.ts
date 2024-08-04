export function canFinish(numCourses: number, prerequisites: number[][]) {
    const init = [];
    for (let course = 0; course < numCourses; course++) {
        init.push([course, []]);
    }

    const lists = new Map<number, number[]>(init);
    const seen = new Set<number>();

    for (let [course, req] of prerequisites) {
        const list = lists.get(course);
        list.push(req);
    }

    const dfs = (course: number) => {
        if (seen.has(course)) {
            return false;
        }

        const list = lists.get(course);
        if (!list.length) {
            return true;
        }

        seen.add(course);
        for (let prereq of list) {
            if (!dfs(prereq)) {
                return false;
            }
        }
        seen.delete(course);
        lists.set(course, []);
        return true;
    };

    for (let course = 0; course < numCourses; course++) {
        if (!dfs(course)) {
            return false;
        }
    }
    return true;
}
