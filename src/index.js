import './index.scss'
// import './components/header/header.scss'
import {renderMenuComp} from './components/menu/menu.js';
import {renderHeaderComp} from './components/header/header.js';
import {renderFriendsComp} from './components/friends/friends.js';

// import render from './components/friends/friends.hbs';
// import {friendsInit} from './components/friends/friends.js';
// import { dnd, otherFunc } from './js/dnd';


// Контейнеры для компонентов страницы
const containerNavMenu = document.querySelector('.nav-menu-container')
const containerHeader = document.querySelector('.header-container')
const containerMain = document.querySelector('.main-container')

renderHeaderComp(containerHeader)
renderMenuComp(containerNavMenu)
renderFriendsComp(containerMain, false)


VK.init({ apiId: 6686757 });

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.getLoginStatus(date => {
            if (date.status === 'connected') {
                console.log(date.status)
                renderHeaderComp(containerHeader, true)
            } else {
                VK.Auth.login(data => {
                    (data.session) ? resolve() : reject(new Error('Не удалось авторизоваться'))
                }, 2)
            }
        })
    })
}

function callAPI(method, params) {
    params.v = '5.76'

    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error)
            } else {
                resolve(data.response)
            }
        })
    })
}

(async () => {
    try {
        await auth()
        renderHeaderComp(containerHeader, true)
    } catch (e) {
        console.error(e)
    }
})();


// dnd();
// otherFunc();

export {
    auth,
    callAPI
}