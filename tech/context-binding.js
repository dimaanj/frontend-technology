/**
 * Потеря контекста this при копировании метода объекта
 */

const person = {
  name: 'Jason',
  logName: function (surname) {
    console.log(this.name + ' ' + surname);
  },
};

// Проблема: this теряется при вызове через logName
const logName = person.logName;
logName('Statham'); // undefined Statham (или ошибка в strict mode)

// Решение 1: вызывать напрямую у объекта
person.logName('Statham'); // Jason Statham

// Решение 2: bind
const logNameBound = person.logName.bind(person);
logNameBound('Statham'); // Jason Statham

// Решение 3: call / apply
person.logName.call(person, 'Statham'); // Jason Statham
person.logName.apply(person, ['Statham']); // Jason Statham
