/**
 * 148. Sort List
 * https://leetcode.com/problems/sort-list/
 *
 * Given the head of a linked list, return the list after sorting it in ascending order.
 *
 * Example 1: head = [4,2,1,3] → [1,2,3,4]
 * Example 2: head = [-1,5,3,4,0] → [-1,0,3,4,5]
 * Example 3: head = [] → []
 *
 * Constraints: 0 <= nodes <= 5*10^4, -10^5 <= Node.val <= 10^5
 * Follow up: O(n log n) time and O(1) memory?
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *   this.val = (val === undefined ? 0 : val);
 *   this.next = (next === undefined ? null : next);
 * }
 */

/**
 * Найти середину списка за один проход без доп. памяти — нужны fast и slow указатели:
 * slow шагает по 1, fast по 2; когда fast дойдёт до конца, slow в середине.
 * @param {ListNode} head
 * @returns {ListNode} узел перед серединой (чтобы разрезать список)
 */
function getMid(head) {
  let slow = head;
  let fast = head.next;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}

/**
 * Слить два отсортированных списка в один.
 * @param {ListNode} a
 * @param {ListNode} b
 * @returns {ListNode} голова объединённого списка
 */
function merge(a, b) {

  let dummy = new ListNode();
  let current = dummy;

  let first = a;
  let second = b;

  while(first && second) {
    if(first.val < second.val) {
      current.next = first;
      first = first.next;
    } else {
      current.next = second;
      second = second.next;
    }
    current = current.next;
  }

  current.next = first || second;

  return dummy.next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  if(!head || !head.next) {
    return head;
  }

  const mid = getMid(head);
  const rightHead = mid.next;
  mid.next = null;

  const left = sortList(head);
  const right = sortList(rightHead);

  return merge(left, right);
};
