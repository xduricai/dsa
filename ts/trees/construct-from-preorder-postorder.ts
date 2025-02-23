import { TreeNode } from "./tree-node";

export function constructFromPrePost(
    preorder: number[],
    postorder: number[]
): TreeNode | null {
    let preIdx = 0;
    let postIdx = 0;

    const build = () => {
        if (preIdx >= preorder.length) {
            return null;
        }
        const node = new TreeNode(preorder[preIdx]);
        preIdx++;

        if (node.val != postorder[postIdx]) {
            node.left = build();
        }
        if (node.val != postorder[postIdx]) {
            node.right = build();
        }

        postIdx++;
        return node;
    };

    return build();
}

// suboptimal solution
export function constructFromPrePostAlt(
    preorder: number[],
    postorder: number[]
): TreeNode | null {
    if (!preorder.length) {
        return null;
    }
    const node = new TreeNode(preorder[0]);

    if (preorder.length > 1) {
        const idx = postorder.indexOf(preorder[1]);

        const leftPre = preorder.slice(1, idx + 2);
        const leftPost = postorder.slice(0, idx + 1);
        node.left = constructFromPrePostAlt(leftPre, leftPost);

        const rightPre = preorder.slice(idx + 2);
        const rightPost = postorder.slice(idx + 1, postorder.length - 1);
        node.right = constructFromPrePostAlt(rightPre, rightPost);
    }

    return node;
}
