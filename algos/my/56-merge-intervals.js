/**
 * 56. Merge Intervals
 * @param {number[][]} intervals - [start_i, end_i]
 * @returns {number[][]} - неперекрывающиеся интервалы, покрывающие все входные
 */
function mergeIntervals(intervals) {
  if (!intervals.length) return [];

  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    const current = intervals[i];

    if (current[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], current[1]);
    } else if (current[0] > prev[1]) {
      merged.push(current);
    }
  }

  return merged;
}

module.exports = { mergeIntervals };
