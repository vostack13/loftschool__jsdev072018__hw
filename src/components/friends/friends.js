import './friends.scss'
import renderContainer from './friends-container.hbs';
import renderList from './friends-list.hbs';
import {callAPI} from '../../js/vk-api.js';
import addIcon from './img/add.svg';
import removeIcon from './img/remove.svg';
import searchIcon from './img/search.svg';
import {authorizationId} from '../header/header.js';

let frendsComp = {}
let arrayStorageFilter = {}
let friendsAllList = { items: []}
let friendsMyList = { items: []}

function renderFriendsComp(container, authorization) {
    if (authorization) {
        renderFriendsLayout(container)
    }
}

function renderFriendsLayout(container) {
    container.innerHTML = renderContainer();

    frendsComp.blockFrend = document.querySelector('.frends')
    frendsComp.listFrendsAll = document.querySelector('#friends__list-all')
    frendsComp.listFrendsMy = document.querySelector('#friends__list-my')
    frendsComp.inputSearchAll = document.querySelector('.frends-search__frends-all')
    frendsComp.inputSearchMy = document.querySelector('.frends-search__frends-my')
    frendsComp.titleCountAll = document.querySelector('.frends-col__title-count-all')
    frendsComp.titleCountMy = document.querySelector('.frends-col__title-count-my')
    frendsComp.buttonSave = document.querySelector('.frends__btn-save')

    // Событие по кнопке "Сохранить"
    frendsComp.buttonSave.addEventListener('click', (e) => {
        saveObjCookies(friendsAllList, friendsMyList)
        alert('Список друзей сохранен')
    })

    frendsComp.blockFrend.addEventListener('click', (e) => {
        if (e.target.classList.contains("button-add")) {
            console.log(e.target.parentElement)
            moveFrends (frendsComp.listFrendsAll, frendsComp.listFrendsMy, e.target.parentElement, e.target.parentElement.id)
        } else if (e.target.classList.contains("button-del")) {
            moveFrends (frendsComp.listFrendsMy, frendsComp.listFrendsAll, e.target.parentElement, e.target.parentElement.id)
        }
    })

    renderFriendsList()
};

function renderFriendsList() {
    (async () => {
        try {
            // Получаем всех друзей пользователя
            const friends = await callAPI('friends.get', { fields: 'photo_100'})

            // Считываем информацию о друзьях, сохраненных в localStorage
            if (localStorage[authorizationId]) {
                arrayStorageFilter = JSON.parse(localStorage[authorizationId])
            }
            createFrendsLists(friends, arrayStorageFilter)

            frendsComp.titleCountAll.textContent = friendsAllList.items.length
            frendsComp.titleCountMy.textContent = friendsMyList.items.length
            frendsComp.listFrendsAll.innerHTML = renderList(friendsAllList)
            frendsComp.listFrendsMy.innerHTML = renderList(friendsMyList)

            
            const itemsAdd = frendsComp.listFrendsMy.querySelectorAll('#button-add')
            const itemsDel = frendsComp.listFrendsMy.querySelectorAll('#button-del')
            for (let item of itemsAdd) {
                item.classList.toggle('hide')
            }
            for (let item of itemsDel) {
                item.classList.toggle('hide')
            }
            
            frendsComp.inputSearchAll.addEventListener('keyup', (e) => { 
                frendsComp.listFrendsAll.innerHTML = renderList(filterRender(friendsAllList,  frendsComp.inputSearchAll.value))
            });
            
            frendsComp.inputSearchMy.addEventListener('keyup', (e) => { 
                frendsComp.listFrendsMy.innerHTML = renderList(filterRender(friendsMyList,  frendsComp.inputSearchMy.value))
            });


            dragAndDrop([frendsComp.listFrendsAll, frendsComp.listFrendsMy])
            
        } catch (e) {
            console.error(e)
        }
    })();
}

function createFrendsLists(objFrends, objfilter) {
    for (let frend of objFrends.items) {
        if (objfilter[frend.id] === 'my') {
            friendsMyList.items.push(frend)
        } else {
            friendsAllList.items.push(frend)
        }
    }
}

function saveObjCookies(arr_all, arr_my)  {
    for (let item of arr_all.items) {
        arrayStorageFilter[item.id] = 'all'
    }

    for (let item of arr_my.items) {
        arrayStorageFilter[item.id] = 'my'
    }
    
    localStorage[authorizationId] = JSON.stringify(arrayStorageFilter)
}

function dragAndDrop(zones) {
    let currentDrag;
    
    zones.forEach(zone => {
        zone.addEventListener('dragstart', (e) => {
            currentDrag = {source: zone, node: e.target, id: e.target.id};
        })

        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
        })

        zone.addEventListener('drop', (e) => {
            if (currentDrag) {
                e.preventDefault()

                if(currentDrag.source !== zone) {
                    moveFrends(currentDrag.source, zone, currentDrag.node, currentDrag.id)
                }
                currentDrag = null
            }
        })
    })
}

function moveFrends (zoneRemove, zonePast, node, curentId) {
    let frend
    let indexArray

    const buttonAdd = node.querySelector('#button-add')
    const buttonDel = node.querySelector('#button-del')

    buttonAdd.classList.toggle('hide')
    buttonDel.classList.toggle('hide')

    if (frendsComp.listFrendsAll === zoneRemove) {
        frend = friendsAllList.items.find((element, index, array) => {
            if (element.id == curentId) {
                indexArray = index
                return true
            }
        })
        friendsAllList.items.splice(indexArray, 1)
        friendsMyList.items.push(frend)
        
    } else {
        frend = friendsMyList.items.find((element, index, array) => {
            if (element.id == curentId) {
                indexArray = index
                return true
            }
        })
        friendsMyList.items.splice(indexArray, 1)
        friendsAllList.items.push(frend)
    }
    
    frendsComp.titleCountAll.textContent = friendsAllList.items.length
    frendsComp.titleCountMy.textContent = friendsMyList.items.length

    zonePast.insertBefore(node, zonePast.firstChild)

}

function filterRender(obj = {}, filterString) {
    let resultObj = {
        items: []
    }

    if (filterString !== '') {
        const subString = new RegExp(filterString, 'ig')

        for (let friend of obj.items) {
            
            if (subString.test(friend.first_name) || subString.test(friend.last_name)) {
                resultObj.items.push(friend) 
            }
        }
    } else {
        resultObj = obj
    }
    
    return resultObj
}

function logoutFrends() {
    frendsComp.blockFrend.innerHTML = '';
}

export {
    renderFriendsComp,
    logoutFrends
}
