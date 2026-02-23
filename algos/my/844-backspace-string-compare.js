/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  let i = s.length - 1;
  let j = t.length - 1;

  let skip1 = 0;
  let skip2 = 0;

  // abm##c
  // abm##

  // c

  while (i >= 0 && j >= 0) {
    while (i >= 0) {
      if (s[i] === "#") {
        skip1++;
        i--;
      } else if (skip1 > 0) {
        skip1--;
        i--;
      } else {
        break;
      }
    }

    while (j >= 0) {
      if (t[j] === "#") {
        skip2++;
        j--;
      } else if (skip2 > 0) {
        skip2--;
        j--;
      } else {
        break;
      }
    }

    if (s[i] !== t[j]) return false;

    i--;
    j--;
  }
  return true;
};

module.exports = { backspaceCompare };
