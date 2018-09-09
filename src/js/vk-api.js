import {renderFriendsComp, logoutFrends} from '../components/friends/friends.js';
import {containerMain} from '../index.js';

VK.init({ apiId: 6686757 });

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                console.log('Авторизация прошла успешно')
                renderFriendsComp(containerMain, true)
                resolve()  
            } else {
                reject(new Error('Не удалось авторизоваться'))
            }
        }, 2)
    })
}

function getLoginStatus() {
    return new Promise((resolve, reject) => {
        VK.Auth.getLoginStatus(date => {
            if (date.status === 'connected') {
                resolve(true)
            } else {

                resolve(false)
            }
        })
    })
}

function logout() {
    return new Promise((resolve, reject) => {
        VK.Auth.logout(data => {
            if (data.session) {
                reject(new Error('Не удалось выйти'))
            } else {
                console.log('Выход выполнен')
                logoutFrends()
                resolve()
            }
        }, 2)
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

export {
    auth,
    callAPI,
    logout,
    getLoginStatus
}