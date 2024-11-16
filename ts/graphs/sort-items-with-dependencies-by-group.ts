// takes in the current node, the output array, an adjacency list, a visited nodes set and a cycle detection set
function topologicalSort(
    node: number,
    sortOrder: number[],
    adjList: Map<number, number[]>,
    visited: Set<number>,
    cycle: Set<number>
): boolean {
    if (visited.has(node)) {
        return true;
    }
    if (cycle.has(node)) {
        return false;
    }

    cycle.add(node);

    for (const req of adjList.get(node) || []) {
        if (!topologicalSort(req, sortOrder, adjList, visited, cycle)) {
            return false;
        }
    }

    cycle.delete(node);
    visited.add(node);
    sortOrder.push(node);

    return true;
}

export function sortItems(
    n: number,
    m: number,
    group: number[],
    beforeItems: number[][]
): number[] {
    // assign each ungrouped item its own group
    for (let idx = 0; idx < group.length; idx++) {
        if (group[idx] === -1) {
            group[idx] = m;
            m++;
        }
    }

    // init adjacency lists
    const groupAdj = new Map<number, number[]>();
    const itemAdj = new Map<number, number[]>();

    for (let item = 0; item < group.length; item++) {
        const currentGroup = group[item];

        for (const req of beforeItems[item]) {
            const reqGroup = group[req];

            if (currentGroup === reqGroup) {
                const list = itemAdj.get(item);
                list ? list.push(req) : itemAdj.set(item, [req]);
            } else {
                const list = groupAdj.get(currentGroup);
                list
                    ? list.push(reqGroup)
                    : groupAdj.set(currentGroup, [reqGroup]);
            }
        }
    }

    const groupOrder = [];
    const itemOrder = [];

    const groupVisited = new Set<number>();
    const itemVisited = new Set<number>();
    const groupCycle = new Set<number>();
    const itemCycle = new Set<number>();

    // sort items and groups
    for (let grp = 0; grp < m; grp++) {
        if (
            !topologicalSort(
                grp,
                groupOrder,
                groupAdj,
                groupVisited,
                groupCycle
            )
        ) {
            return [];
        }
    }

    for (let item = 0; item < n; item++) {
        if (
            !topologicalSort(item, itemOrder, itemAdj, itemVisited, itemCycle)
        ) {
            return [];
        }
    }

    // place items into groups in sorted order
    const itemsGrouped = Array(m)
        .fill(null)
        .map((_) => []);
    for (const item of itemOrder) {
        const grp = group[item];
        itemsGrouped[grp].push(item);
    }

    // add groups to output in sorted order
    let result = [];
    for (const grp of groupOrder) {
        result = result.concat(itemsGrouped[grp]);
    }

    return result;
}
