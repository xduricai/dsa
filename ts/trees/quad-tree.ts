export function construct(grid: number[][]): QuadNode | null {
    return dfs(grid, 0, 0, grid.length);
}

function dfs(
    grid: number[][],
    startRow: number,
    startCol: number,
    size: number
): QuadNode {
    if (checkQuadrant(grid, startRow, startCol, size)) {
        return new QuadNode(grid[startRow][startCol] === 1, true);
    }
    const half = size / 2;

    const topLeft = dfs(grid, startRow, startCol, half);
    const topRight = dfs(grid, startRow, startCol + half, half);
    const botLeft = dfs(grid, startRow + half, startCol, half);
    const botRight = dfs(grid, startRow + half, startCol + half, half);

    return new QuadNode(false, false, topLeft, topRight, botLeft, botRight);
}

function checkQuadrant(
    grid: number[][],
    startRow: number,
    startCol: number,
    size: number
): boolean {
    const pattern = grid[startRow][startCol];

    for (let row = startRow; row < startRow + size; row++) {
        for (let col = startCol; col < startCol + size; col++) {
            if (grid[row][col] !== pattern) {
                return false;
            }
        }
    }

    return true;
}

class QuadNode {
    val: boolean;
    isLeaf: boolean;
    topLeft?: QuadNode;
    topRight?: QuadNode;
    bottomLeft?: QuadNode;
    bottomRight?: QuadNode;

    constructor(
        val: boolean,
        isLeaf: boolean,
        topLeft?: QuadNode,
        topRight?: QuadNode,
        bottomLeft?: QuadNode,
        bottomRight?: QuadNode
    ) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }
}
