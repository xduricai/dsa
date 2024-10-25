class TrieNode {
    children = new Map<string, TrieNode>();
    isFolder = false;
}

export function removeSubfolders(folder: string[]): string[] {
    const trie = new TrieNode();
    const output: string[] = [];

    for (const item of folder) {
        const dirs = item.split("/");
        let current = trie;

        // first element will be a space
        for (let idx = 1; idx < dirs.length; idx++) {
            const char = dirs[idx];

            if (current.isFolder) {
                break;
            }

            if (current.children.has(char)) {
                current = current.children.get(char);
                continue;
            }

            const node = new TrieNode();
            current.children.set(char, node);
            current = node;
        }
        current.isFolder = true;
    }

    const dfs = (node: TrieNode, path: string) => {
        if (node.isFolder) {
            output.push(path);
            return;
        }

        for (const [char, child] of node.children.entries()) {
            dfs(child, `${path}/${char}`);
        }
    };

    dfs(trie, "");
    return output;
}

export function removeSubfoldersAlt(folder: string[]): string[] {
    folder.sort();
    const output: string[] = [folder[0]];
    folder = folder.map((dir) => `${dir}/`);
    let current = folder[0];

    for (let idx = 1; idx < folder.length; idx++) {
        if (folder[idx].startsWith(current)) {
            continue;
        }

        current = folder[idx];
        output.push(current.slice(0, current.length - 1));
    }
    return output;
}
