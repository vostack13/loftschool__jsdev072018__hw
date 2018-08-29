// import { resolve } from "path";

/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */

import {loadAndSortTowns as loadTowns} 
    from './index'

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    const subString = new RegExp(chunk, 'ig')

    return (subString.test(full)) ? true : false
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

// Кнопка для повторного запроса списка городов
const buttonReset = document.createElement('button')

buttonReset.addEventListener('click', () => {
    startLoadTowns()
})

// Массив для списка названий городов
let arrayAllTowns = [];
const fragment = document.createDocumentFragment()

filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия кливиш в текстовом поле
    filterResult.innerHTML = ''
    if (filterInput.value !== '') {
        for (const nameTown of arrayAllTowns) {
            if (isMatching(nameTown, filterInput.value)) {
                const div = document.createElement('div')
                
                div.textContent = nameTown
                fragment.appendChild(div);
            }
        }
        filterResult.appendChild(fragment)
    } else {
        filterResult.innerHTML = ''
    }

});

let startLoadTowns = () => {
    loadTowns()
        .then((resolve) => {
            loadingBlock.innerText = ''
            filterBlock.style.display = 'block'

            // Извлекаем названия городов в отдельный массив
            for (const town of resolve) {
                arrayAllTowns.push(town.name)
            }
        })
        .catch(() => {
            loadingBlock.innerText = 'Неудалось загрузить города '
            buttonReset.innerText = 'Повторить'
            loadingBlock.appendChild(buttonReset)
        })
}

startLoadTowns()

export {
    loadTowns,
    isMatching
};
