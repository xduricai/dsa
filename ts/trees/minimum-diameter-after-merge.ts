export function minimumDiameterAfterMerge(
    edges1: number[][],
    edges2: number[][]
): number {
    const adjList1 = buildAdjList(edges1);
    const adjList2 = buildAdjList(edges2);

    // diameter of the first tree
    const [diameter1, h1] = getDiameter(0, -1, adjList1);
    // diameter of the second tree
    const [diameter2, h2] = getDiameter(0, -1, adjList2);
    // shortest max path from connecting the 2 diameters
    const diameter3 = Math.ceil(diameter1 / 2) + Math.ceil(diameter2 / 2) + 1;

    return Math.max(diameter1, diameter2, diameter3);
}

function buildAdjList(edges: number[][]) {
    const adjList = new Map<number, number[]>();

    for (const [src, dst] of edges) {
        const listA = adjList.get(src);
        const listB = adjList.get(dst);

        listA ? listA.push(dst) : adjList.set(src, [dst]);
        listB ? listB.push(src) : adjList.set(dst, [src]);
    }

    return adjList;
}

function getDiameter(
    root: number,
    parent: number,
    adjList: Map<number, number[]>
) {
    let maxDiameter = 0;
    // track the 2 tallest subtrees
    let maxHeight1 = 0;
    let maxHeight2 = 0;

    for (const node of adjList.get(root) || []) {
        if (node === parent) {
            continue;
        }

        const [diameter, height] = getDiameter(node, root, adjList);
        maxDiameter = Math.max(maxDiameter, diameter);

        // update heights
        if (height > maxHeight1) {
            maxHeight2 = maxHeight1;
            maxHeight1 = height;
        } else if (height > maxHeight2) {
            maxHeight2 = height;
        }
    }

    maxDiameter = Math.max(maxDiameter, maxHeight1 + maxHeight2);
    return [maxDiameter, maxHeight1 + 1];
}
