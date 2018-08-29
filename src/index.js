// import { resolve } from "dns";

/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise (resolve => {
        setTimeout(() => resolve(), seconds*1000)
    })
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    return new Promise ((resolve, reject) => {
        const myXhr = new XMLHttpRequest()

        myXhr.open('GET', 'https://raw.githubusercontent.com/vostack13/js__other-tasks/master/js__task-01/jsdev-072018/cities.json')
        myXhr.responseType = 'json'
        myXhr.send()
        myXhr.addEventListener('load', () => {
            if (myXhr.status < 400) {
                resolve(myXhr.response.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (a.name < b.name) {
                        return -1
                    }
                    
                    return 0
                }))
            } else {
                reject()
            }
        })
    })
}

export {
    delayPromise,
    loadAndSortTowns
};
