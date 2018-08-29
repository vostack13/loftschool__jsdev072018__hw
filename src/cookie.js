/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let objCookies = {}

// Создание объекта куков из браузерной глобальной переменной document.cookie
function getObjCookies() {
    return document.cookie.split('; ').reduce((prev, current) => {
        let [name, value] = current.split('=')

        prev[name] = value

        return prev
    }, {})
}

// Фильтрация объекта с куками (возвращает полученную функцию)
function filterObjCookies (obj, filterString) {
    const subString = new RegExp(filterString, 'ig')
    let resultObj = {}
    
    if (filterString !== '') {
        for (let cookie in obj) {
            if (subString.test(cookie) || subString.test(obj[cookie]) ) {
                resultObj[cookie] = obj[cookie]
            }
        }
    } else {
        resultObj = obj
    }

    return resultObj
}

// Вывод в таблицу куков
function updateListTable(obj) {
    const fragmentTableBody = document.createDocumentFragment()

    listTable.innerHTML = ''
    const filterObj = filterObjCookies(obj, filterNameInput.value)
    
    for (let cookieName in filterObj) {
        if (filterObj.hasOwnProperty(cookieName)) {
            const tr = document.createElement('tr')
            const tdName = document.createElement('td')
            const tdValue = document.createElement('td')
            const tdremove = document.createElement('td')
            const removeButton = document.createElement('button')
    
            tdName.innerText = cookieName
            fragmentTableBody.appendChild(tdName)

            tdValue.innerText = filterObj[cookieName]
            fragmentTableBody.appendChild(tdValue)

            removeButton.innerText = 'Удалить'
            tdremove.appendChild(removeButton)
            fragmentTableBody.appendChild(tdremove)
            
            tr.appendChild(fragmentTableBody)
            listTable.appendChild(tr)
        }
    }
}

// Добавление куков
function addObjCookies(cookieNameInput, cookieValueInput) {
    if (cookieNameInput.value && cookieValueInput.value) {
        document.cookie = `${cookieNameInput.value}=${cookieValueInput.value}`

        // обнуляем значения и внешний вид инпутов
        cookieNameInput.style.borderColor = '#ccc';
        cookieValueInput.style.borderColor = '#ccc';
        cookieNameInput.value = ''
        cookieValueInput.value = ''
    } else {    
        // стилизуем валиидацию инпутов
        (!cookieNameInput.value)
            ? cookieNameInput.style.borderColor = 'red'
            : cookieNameInput.style.borderColor = '#ccc';

        (!cookieValueInput.value)
            ? cookieValueInput.style.borderColor = 'red'
            : cookieValueInput.style.borderColor = '#ccc';
    }
    
    updateListTable(getObjCookies())
}

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    updateListTable(getObjCookies())
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    addObjCookies(addNameInput, addValueInput)
});

// Обработчки события по клику на кнопку "Удалить"
listTable.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        const cookieName = e.target.parentElement.parentElement.firstChild.innerText

        document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        updateListTable(getObjCookies())
    }
})

window.onload = updateListTable(getObjCookies())


