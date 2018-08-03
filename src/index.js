/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  let resultArray = []

  for (let i = 0; i < array.length; i++) {
    resultArray.push(fn(array[i], i, array));
  }
  return resultArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  var temp;

  if (initial === undefined) {
    temp = array[0];
    for (let i = 1; i < array.length; i++) {
      temp = fn(temp, array[i], i, array);
    }
  } else {
    temp = initial;
    for (let i = 0; i < array.length; i++) {
      temp = fn(temp, array[i], i, array);
    }
  }

  return temp;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  let result = [];

  for (let key in obj) {
   result.push(key.toUpperCase()); 
  }

  return result;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
	let result = [];

	if (from === undefined) {
		return array;
	}

	if (from + array.length < 0) {
		from = 0;
	}

	if (from < 0) {
		from = array.length + from;
	}

	if (from > array.length) {
		from = array.length;
	}

	if (to < 0) {
		to = array.length + to;
	}

	if (to === undefined || to > array.length) {
		to = array.length;
	}

	for (let i = from; i < to; i++) {
		result.push(array[i]);
	}

	return result;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
  forEach,
  map,
  reduce,
  upperProps,
  slice,
  createProxy
};
