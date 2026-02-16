const { getMinPrice } = require('./min-price-coupons');

/**
 * Задача: минимальная цена товаров с купонами
 *
 * Есть массив цен товаров и ограниченное количество купонов.
 * Один купон применяется к одному товару и даёт фиксированную скидку
 * (цена не может стать меньше 0).
 *
 * Нужно применить купоны так, чтобы итоговая сумма была минимальной.
 * Оптимально: тратить купоны на самые дорогие товары.
 */
describe('Min Price with Coupons', () => {
    test('Example: prices [5, 13, 10, 8, 3], 4 coupons, discount 7', () => {
        expect(getMinPrice([5, 13, 10, 8, 3], 4, 7)).toBe(13);
    });

    test('Coupons more than items - use all items with discount', () => {
        expect(getMinPrice([10, 5], 5, 3)).toBe(9);
    });

    test('No coupons - sum of all prices', () => {
        expect(getMinPrice([1, 2, 3, 4, 5], 0, 10)).toBe(15);
    });

    test('Discount larger than prices - price goes to 0', () => {
        expect(getMinPrice([3, 2, 1], 3, 10)).toBe(0);
    });

    test('Single item, one coupon', () => {
        expect(getMinPrice([10], 1, 7)).toBe(3);
    });

    test('Single item, discount equals price', () => {
        expect(getMinPrice([7], 1, 7)).toBe(0);
    });

    test('Empty prices', () => {
        expect(getMinPrice([], 5, 7)).toBe(0);
    });

    test('Coupons equal items count', () => {
        expect(getMinPrice([10, 10, 10], 3, 5)).toBe(15);
    });
});
