/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let myDiv = document.createElement('div');

    var elemStyle = {
        color: '000000',
        width: 0,
        height: 0,
        top: 0,
        left: 0
    }
    
    function setElemStyle() {
        const clientWidth = document.documentElement.clientWidth
        const clientHidth = document.documentElement.clientHeight
        
        elemStyle.color += Math.floor(Math.random() * 0xFFFFFF).toString(16)
        elemStyle.color = '#' + elemStyle.color.substr(-6)

        elemStyle.width = Math.floor(Math.random() * (clientWidth))
        elemStyle.height = Math.floor(Math.random() * (clientHidth))
        
        elemStyle.left = Math.floor(Math.random() * (clientWidth - elemStyle.width)) + 'px'
        elemStyle.top = Math.floor(Math.random() * (clientHidth - elemStyle.height)) + 'px'
        
        elemStyle.width += 'px'
        elemStyle.height += 'px'
    }

    setElemStyle()

    myDiv.className = 'draggable-div'
    myDiv.style.position = 'absolute'
    myDiv.style.backgroundColor = elemStyle.color
    myDiv.style.width = elemStyle.width
    myDiv.style.height = elemStyle.height
    myDiv.style.top = elemStyle.top
    myDiv.style.left = elemStyle.left

    return myDiv
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {

    let moving = false,
        posX,
        posY

    target.addEventListener('mousedown', (e) => {
        moving = true
        
        posY = e.offsetY
        posX = e.offsetX               
    })
    
    document.addEventListener('mousemove', (e) => {
        if (moving) {
            target.style.top = e.clientY - posY + 'px'
            target.style.left = e.clientX - posX + 'px'
        }
    })

    target.addEventListener('mouseup', () => {
        moving = false
    })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
