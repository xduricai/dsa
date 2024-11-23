export function rotateTheBox(box: string[][]): string[][] {
    const HEIGHT = box.length;
    const WIDTH = box[0].length;

    // counts of stones in pockets by row (reverse)
    const stones = Array(HEIGHT)
        .fill(null)
        .map((_) => []);
    // new box (rotated 90 degrees right)
    const output = Array(WIDTH)
        .fill(null)
        .map((_) => Array(HEIGHT).fill("."));
    let colIdx = HEIGHT - 1;

    // get all lengths of contiguous pockets of stones by row (in reverse order)
    for (const row of box) {
        let currentCount = 0;

        for (let idx = WIDTH; idx >= 0; idx--) {
            // add stone to current pocket
            if (row[idx] === "#") {
                currentCount++;
            }

            // we hit the end of the pocket or the end of the box
            if (row[idx] === "*" || idx === 0) {
                stones[colIdx].push(currentCount);
                currentCount = 0;
            }
        }

        colIdx--;
    }

    // create a new box with obstacles in matching positions
    for (let row = 0; row < HEIGHT; row++) {
        for (let col = 0; col < WIDTH; col++) {
            if (box[row][col] === "*") {
                output[col][HEIGHT - row - 1] = "*";
            }
        }
    }

    // place pockets of stones into the new box by column (bottom to top)
    for (let col = 0; col < HEIGHT; col++) {
        const counts = stones[col];
        let countIdx = 0;

        for (let row = WIDTH - 1; row >= 0; row--) {
            // move onto the next pocket after hitting an obsacle
            if (output[row][col] === "*") {
                countIdx++;
                continue;
            }

            // add a stone from the current pocket
            if (countIdx < counts.length && counts[countIdx] > 0) {
                output[row][col] = "#";
                counts[countIdx]--;
            }
        }
    }

    return output;
}
