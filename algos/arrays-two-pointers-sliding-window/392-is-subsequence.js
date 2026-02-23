/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  if (s === '') return true;

  let idx = 0;

  for (let i = 0; i < t.length; i++) {
    if (s[idx] === t[i]) {
      if (idx === s.length - 1) {
        return true;
      }

      idx = idx + 1;
    }
  }

  return false;
};

module.exports = { isSubsequence };
