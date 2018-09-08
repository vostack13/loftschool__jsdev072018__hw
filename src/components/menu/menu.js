import renderMenu from './menu.hbs';
import './menu.scss'
import './menu.scss'
import logoImg from './img/friends.svg';

function renderMenuComp (container) {
    container.innerHTML = renderMenu();
}

export {
    renderMenuComp
}