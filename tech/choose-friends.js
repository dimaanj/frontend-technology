/**
 * Максимальное счастье Пети при выборе друзей на тусу.
 * Ограничение: никто с зарплатой меньше чем половина от максимальной в компании не приходит.
 * То есть для приглашённых: max(зп) <= 2 * min(зп).
 *
 * @param {[number, number][]} friends - [[w, h], ...] — зарплата и уровень счастья
 * @returns {number} — максимальная сумма счастья
 */
function chooseFriends(friends) {
  if (friends.length === 0) return 0;

  const bySalary = [...friends].sort((a, b) => a[0] - b[0]);
  const n = bySalary.length;

  const prefix = [0];
  for (let i = 0; i < n; i++) {
    prefix.push(prefix[i] + bySalary[i][1]);
  }

  let best = 0;
  let j = 0;

  for (let i = 0; i < n; i++) {
    j = Math.max(j, i);
    while (j < n && bySalary[j][0] <= 2 * bySalary[i][0]) {
      j++;
    }
    const sum = prefix[j] - prefix[i];
    if (sum > best) best = sum;
  }

  return best;
}

module.exports = { chooseFriends };
