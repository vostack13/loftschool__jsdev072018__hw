import './scss/main.scss'
import render from './templates/friends.hbs';
// import { dnd, otherFunc } from './js/dnd';

const container = document.querySelector('.container')

VK.init({
    apiId: 6677762
  });

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve()
            } else {
                reject(new Error('Не удалось авторизоваться'))
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

// auth()
//     .then(() => {
//         return callAPI('users.get',{ name_case: 'gen'})
//     })
//     .then(([me]) => {
//         const headerInfo = document.querySelector('#page-title')
//         headerInfo.textContent = `Друзья на странице ${me.first_name} ${me.last_name}`

//         return callAPI('friends.get', { fields: 'city, country, photo_100' })
//     })
//     .then(friends => {
//         container.innerHTML = render(friends);

//     })

(async () => {
    try {
        await auth()
        const [me] = await callAPI('users.get',{ name_case: 'gen'})
        const headerInfo = document.querySelector('#page-title')
        headerInfo.textContent = `Друзья на странице ${me.first_name} ${me.last_name}`

        const friends = await callAPI('friends.get', { fields: 'city, country, photo_100' })
        container.innerHTML = render(friends);

    } catch (e) {
        console.error(e)
    }
})();

// dnd();
// otherFunc();