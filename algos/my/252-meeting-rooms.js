/**
 * 252. Meeting Rooms
 * @param {number[][]} intervals - [start_i, end_i]
 * @returns {boolean} - true если можно посетить все встречи без пересечений
 */
function canAttendMeetings(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  for(let i = 1; i < intervals.length; i++) {
    const prev = intervals[i-1];
    const current = intervals[i];
    if(current[0] < prev[1]) {
      return false;
    }
  }
  
  return true;
}

module.exports = { canAttendMeetings };
