class Node {
    val: number;
    next: Node | null;
    random: Node | null;

    constructor(val: number, next = null, random = null) {
        this.val = val;
        this.next = next;
        this.random = random;
    }
}

export function copyRandomList(head: Node) {
    const lookup = new Map<Node, Node>();
    let current = head;

    while (current) {
        lookup.set(current, new Node(current.val));
        current = current.next;
    }
    current = head;

    while (current) {
        const node = lookup.get(current);
        node.next = current.next ? lookup.get(current.next) : null;
        node.random = current.random ? lookup.get(current.random) : null;
        current = current.next;
    }
    return lookup.get(head);
}
