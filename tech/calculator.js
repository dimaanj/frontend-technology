/**
 * Калькулятор: value, add, div. div бросает ошибку при делении на 0.
 * magic(fn) возвращает каррированную функцию; при вызове через magic
 * деление на 0 не меняет value (ошибка перехватывается).
 */
const calculator = {
  value: 0,

  add(x) {
    this.value += x;
    return this;
  },

  div(x) {
    if (x === 0) {
      throw new Error('Division by zero');
    }
    this.value /= x;
    return this;
  },

  magic(fn) {
    const self = this;
    return function curried(x) {
      try {
        fn.call(self, x);
      } catch (e) {
        // деление на 0 — не меняем value
      }
      return function next(y) {
        try {
          fn.call(self, y);
        } catch (e) {
          // деление на 0 — не меняем value
        }
        return next;
      };
    };
  },
};

module.exports = { calculator };
