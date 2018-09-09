import {auth, callAPI, logout, getLoginStatus} from '../../js/vk-api.js';
import renderHeader from './header.hbs';
import './header.scss'
import logoImg from './img/loftschool-logo.svg';
import arrowIcon from './img/arrow.svg';

var authorizationId = ''
let headerComp = {
    buttonUserLogin: '',
    buttonUserLogout: '',
    headerUser: '',
    headerUserName: '',
    headerUserPic: ''
}

function renderHeaderComp(container, authorization = false) {
    if (!authorization) {
        renderHeaderLayout(container)
    } else {
        udpadeHeaderState(true)
    }
}

function renderHeaderLayout (container) {
    container.innerHTML = renderHeader();

    headerComp.buttonUserLogin = document.querySelector('#header__user-btn-login')
    headerComp.buttonUserLogout = document.querySelector('#header__user-btn-logout')
    headerComp.headerUser = document.querySelector('.header__user')
    headerComp.headerUserName = document.querySelector('.header__user-name')
    headerComp.headerUserPic  = document.querySelector('.header__user-img-pic')

    headerComp.buttonUserLogin.addEventListener('click', (e) => {
        (async () => {
            try {
                udpadeHeaderState(false)
            } catch (e) {
                console.error(e)
            }
        })();
    })

    headerComp.buttonUserLogout.addEventListener('click', (e) => {
        (async () => {
            try {
                await logout()
                updateStateNodes ()
            } catch (e) {
                console.error(e)
            }
        })();
    })
}

function udpadeHeaderState (authorization) {
    (async () => {
        try {
            if (!authorization) {
                await auth()
            }
            // Ожидание данный о пользователе приложения
            const [me] = await callAPI('users.get', {fields: 'photo_100'})
            authorizationId = me.id

            updateHeaderUser({
                first_name: me.first_name,
                last_name: me.last_name, 
                photo: me.photo_100
            })
    
        } catch (e) {
            console.error('ошибка в renderHeaderComp-async —> ', e)
        }
    })();
}

function updateHeaderUser(obj = {}) {
    headerComp.headerUserName.textContent = `${obj.first_name} ${obj.last_name}`
    headerComp.headerUserPic.src = obj.photo
    updateStateNodes()
}

function updateStateNodes () {
    headerComp.headerUser.classList.toggle('hide')
    headerComp.buttonUserLogin.classList.toggle('hide')
}



export {
    renderHeaderComp,
    authorizationId
}