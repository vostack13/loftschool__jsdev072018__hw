import renderHeader from './header.hbs';
import './header.scss'
import logoImg from './img/loftschool-logo.png';
import arrowIcon from './img/arrow.svg';
import {auth, callAPI} from '../.././index.js'


function renderHeaderComp (container, state) {
    container.innerHTML = renderHeader();
    const headerUser = document.querySelector('.header__user')
    const buttonUserLogin = document.querySelector('#header__user-btn-login')
    const buttonUserLogout = document.querySelector('#header__user-btn-logout')
    const headerUserName = document.querySelector('.header__user-name')
    const headerUserPic = document.querySelector('.header__user-img-pic')
    
    if (state) {
        (async () => {
            try {
                const [me] = await callAPI('users.get', {fields: 'photo_100'})
                headerUserName.textContent = `${me.first_name} ${me.last_name}`
                headerUserPic.src = me.photo_100
                headerUser.classList.toggle('hide')
                buttonUserLogin.classList.toggle('hide')

            } catch (e) {
                console.error(e)
            }
        })();
    }

    // const buttonLogout = document.querySelector('.header__user-btn')

    function logout() {
        return new Promise((resolve, reject) => {
            VK.Auth.logout(data => {
                if (data.session) {
                    reject(new Error('Не удалось выйти'))
                } else {
                    console.log('Выход выполнен')
                    resolve()
                }
            }, 2)
        })
    }

    buttonUserLogout.addEventListener('click', (e) => {
        (async () => {
            try {
                await logout()
                headerUser.classList.toggle('hide')
                buttonUserLogin.classList.toggle('hide')
            } catch (e) {
                console.error(e)
            }
        })();
    })

    buttonUserLogin.addEventListener('click', (e) => {
        (async () => {
            try {
                await auth()
                headerUser.classList.toggle('hide')
                buttonUserLogin.classList.toggle('hide')
            } catch (e) {
                console.error(e)
            }
        })();
    })
}


export {
    renderHeaderComp
}