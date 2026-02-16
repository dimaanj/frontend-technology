const { calculator } = require('./calculator');

describe('calculator', () => {
  beforeEach(() => {
    calculator.value = 0;
  });

  describe('add', () => {
    it('увеличивает value', () => {
      calculator.add(5);
      expect(calculator.value).toBe(5);
      calculator.add(3);
      expect(calculator.value).toBe(8);
    });
  });

  describe('div', () => {
    it('делит value на число', () => {
      calculator.value = 10;
      calculator.div(2);
      expect(calculator.value).toBe(5);
    });

    it('бросает ошибку при делении на 0', () => {
      calculator.value = 10;
      expect(() => calculator.div(0)).toThrow('Division by zero');
      expect(calculator.value).toBe(10);
    });
  });

  describe('magic', () => {
    it('magic(div)(2)(0)(3) — деление на 0 не меняет value', () => {
      calculator.value = 6;
      calculator.magic(calculator.div)(2)(0)(3);
      // 6/2=3, /0 пропускаем (остаётся 3), 3/3=1
      expect(calculator.value).toBe(1);
    });

    it('magic(div) с несколькими нулями подряд', () => {
      calculator.value = 10;
      calculator.magic(calculator.div)(2)(0)(0)(5);
      // 10/2=5, /0 пропуск, /0 пропуск, 5/5=1
      expect(calculator.value).toBe(1);
    });

    it('magic(add) применяет сложение по цепочке', () => {
      calculator.value = 0;
      calculator.magic(calculator.add)(1)(2)(3);
      expect(calculator.value).toBe(6);
    });
  });
});
