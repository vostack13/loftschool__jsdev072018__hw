import './index.scss'
import {renderHeaderComp} from './components/header/header.js';
import {auth, logout, getLoginStatus} from './js/vk-api.js';
import {renderMenuComp} from './components/menu/menu.js';
import {renderFriendsComp} from './components/friends/friends.js';

// Контейнеры для компонентов страницы
const containerNavMenu = document.querySelector('.nav-menu-container')
const containerHeader = document.querySelector('.header-container')
const containerMain = document.querySelector('.main-container')

renderHeaderComp(containerHeader)
renderMenuComp(containerNavMenu)
renderFriendsComp(containerMain)

document.addEventListener("DOMContentLoaded", (async () => {
    try {
        // Смотрим авторизован ли пользователь
        let status = await getLoginStatus()
        if (status) {
            renderHeaderComp(containerHeader, true)
            renderFriendsComp(containerMain, true)
        }
    } catch (e) {
        console.error(e)
    }
})())

export {
    containerMain
}