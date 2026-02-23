/**
 * 57. Insert Interval
 * intervals отсортирован по starti. Вставить newInterval и объединить перекрывающиеся.
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
function insertInterval(intervals, newInterval) {
  if (!intervals.length) intervals.push(newInterval);

  const res = [];
  for (let i = 0; i < intervals.length; i++) {
    const current = intervals[i];

    if (newInterval[1] < current[0]) {
      return [...res, newInterval, current, ...intervals.slice(i + 1)];
    } else if(newInterval[0] > current[1]) {
      res.push(current);
    } else {
      const start = Math.min(current[0], newInterval[0]);
      const end = Math.max(current[1], newInterval[1]);
      newInterval = [start, end];
    }
  }

  res.push(newInterval);

  return res;
}

module.exports = { insertInterval };
