/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    if (!root) return [];
    const queue = [root];
    const res = [];
    while(queue.length) {
        const levelSize = queue.length;
        const level = Array(levelSize).fill(0);
        for(let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            const idx = res.length % 2 === 0 ? i : levelSize - i - 1;
            level[idx] = node.val;
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        res.push(level);
    }
    return res;
};

// --- Binary Tree Node Constructor ---
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

// --- Test Examples ---

// Example 1:
//     3
//    / \
//   9  20
//      /  \
//     15   7
const root1 = new TreeNode(3,
    new TreeNode(9),
    new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

// Example 2:
//     1
//    / \
//   2   3
//  /   / \
// 4   5   6
const root2 = new TreeNode(1,
    new TreeNode(2, new TreeNode(4)),
    new TreeNode(3, new TreeNode(5), new TreeNode(6))
);

// Example 3:
//     1
//      \
//       2
//        \
//         3
const root3 = new TreeNode(1, null, new TreeNode(2, null, new TreeNode(3)));

// Example 4:
//     1
//    /
//   2
//  /
// 3
const root4 = new TreeNode(1, new TreeNode(2, new TreeNode(3)));

// --- Run and Print Results ---
console.log('Example 1:');
console.log('    3');
console.log('   / \\');
console.log('  9  20');
console.log('     /  \\');
console.log('    15   7');
console.log('Output:', zigzagLevelOrder(root1));
console.log('---');

console.log('Example 2:');
console.log('    1');
console.log('   / \\');
console.log('  2   3');
console.log(' /   / \\');
console.log('4   5   6');
console.log('Output:', zigzagLevelOrder(root2));
console.log('---');

console.log('Example 3:');
console.log('1');
console.log(' \\');
console.log('  2');
console.log('   \\');
console.log('    3');
console.log('Output:', zigzagLevelOrder(root3));
console.log('---');

console.log('Example 4:');
console.log('  1');
console.log(' /');
console.log('2');
console.log('/');
console.log('3');
console.log('Output:', zigzagLevelOrder(root4));
console.log('---');