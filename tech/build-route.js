/**
 * Построение маршрута (Озон, ВКонтакте, Тинькофф)
 *
 * Есть набор билетов вида { from, to }. Из них можно построить единственный
 * неразрывный маршрут. Петель и повторов в маршруте нет.
 * Нужно вернуть те же объекты билетов в порядке следования по маршруту.
 *
 * @param {{ from: string, to: string }[]} tickets - массив билетов (порядок произвольный)
 * @returns {{ from: string, to: string }[]} - билеты в порядке следования по маршруту
 */
function buildRoute(tickets) {
  const toCities = new Map();
  for (const ticket of tickets) {
    const toCity = ticket.to;
    toCities.set(toCity, 1);
  }

  let start;
  for (const ticket of tickets) {
    if (!toCities.has(ticket.from)) {
      start = ticket.from;
      break;
    }
  }

  const fromTo = new Map();
  for (const ticket of tickets) {
    fromTo.set(ticket.from, ticket);
  }

  const ticket = fromTo.get(start);
  fromTo.delete(ticket.from);

  const result = [ticket];
  while (fromTo.size) {
    const { to: nextFrom } = result[result.length - 1];

    const newTicket = fromTo.get(nextFrom);
    fromTo.delete(newTicket.from);
    result.push(newTicket);
  }

  return result;
}

// Решение
/*

Идея в том, что маршрут один и без циклов, значит:
Есть одна вершина, которая встречается только как from и ни разу как to — это начало маршрута.
Есть одна вершина только как to — конец маршрута.
Остальные города ровно один раз «откуда» и один раз «куда».
Поэтому достаточно:
Один проход по билетам — собрать множество всех городов, которые встречаются в to. Это «куда приезжаем».
Ещё один проход — найти город, который есть в каком-то from, но нет в этом множестве. Это старт.
Один проход — построить словарь from → билет (или from → to), чтобы по текущему городу сразу находить следующий билет.
Один проход — от старта идти по цепочке: старт → следующий город → следующий → … и складывать билеты в массив.
Итого: несколько линейных проходов по массиву билетов и по множеству городов, размер которых O(n). Никаких вложенных циклов «каждый с каждым» не требуется, сложность O(n) по времени и O(n) по памяти (множество городов + словарь).

*/

// Примеры:
// Input 1: [ { from: "C", to: "D" }, { from: "B", to: "C" }, { from: "A", to: "B" }, { from: "D", to: "E" } ]
// Output 1: [ { from: "A", to: "B" }, { from: "B", to: "C" }, { from: "C", to: "D" }, { from: "D", to: "E" } ]
//
// Input 2: [ { from: "London", to: "Moscow" }, { from: "NY", to: "London" }, { from: "Moscow", to: "SPb" } ]
// Output 2: [ { from: "NY", to: "London" }, { from: "London", to: "Moscow" }, { from: "Moscow", to: "SPb" } ]
//
// Input 3: [ { from: "London", to: "Moscow" }, { from: "Tokio", to: "NY" }, { from: "NY", to: "London" }, { from: "SPb", to: "Berlin" }, { from: "Moscow", to: "SPb" } ]
// Output 3: [ { from: "Tokio", to: "NY" }, { from: "NY", to: "London" }, { from: "London", to: "Moscow" }, { from: "Moscow", to: "SPb" }, { from: "SPb", to: "Berlin" } ]

module.exports = { buildRoute };
