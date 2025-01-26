import { Heap } from "../heap/custom-heap";

export function mostBooked(n: number, meetings: number[][]): number {
    // sort meetings by start time
    meetings.sort((a, b) => a[0] - b[0]);
    // track usage count for each room
    const counts = Array(n).fill(0);
    // heap of available rooms
    const rooms = new Heap<number>(
        (a, b) => a - b,
        Array.from({ length: n }, (_, idx) => idx)
    );
    // list of currently running meetings
    const running = new Heap<[number, number]>(
        (a, b) => a[0] - b[0] || a[1] - b[1]
    );

    for (const [start, end] of meetings) {
        // pop all meetings that end before the current meeting and make rooms available
        while (running.size && running.peek()[0] <= start) {
            const [_, room] = running.pop();
            rooms.push(room);
        }

        // if a room is available, give it to the current meeting
        if (rooms.size) {
            const room = rooms.pop();
            running.push([end, room]);
            counts[room]++;
        }
        // otherwise take the earliest ending meeting and give its room to the current meeting
        // add the delay to the end time
        else {
            const [firstEnd, room] = running.pop();
            const delay = firstEnd - start;

            running.push([end + delay, room]);
            counts[room]++;
        }
    }

    return counts.indexOf(Math.max(...counts));
}
