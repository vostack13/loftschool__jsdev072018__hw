import './scss/main.scss'
import render from './templates/friends.hbs';
// import { dnd, otherFunc } from './js/dnd';

const container = document.querySelector('.container');

const items = [
    { name: 'Иван', last_name: 'Иванов' },
    { name: 'Олег', last_name: 'Петров' },
    { name: 'Денис', last_name: 'Кузнецов' },
    { name: 'Игорь', last_name: 'Ширяяев' }
];

container.innerHTML = render({ items });

// dnd();
// otherFunc();