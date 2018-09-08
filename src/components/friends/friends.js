import './friends.scss'
import renderContainer from './friends-container.hbs';
import renderList from './friends-list.hbs';
import {callAPI} from '../.././index.js'


function renderFriendsComp(container) {
    container.innerHTML = renderContainer();
    
    (async () => {
        try {
            const listFrendsAll = document.querySelector('#friends__list-all')
            const inputSearchAll = document.querySelector('.frends-search__frends-all')
            const titleCountAll = document.querySelector('.frends-col__title-count-all')
            const fragmentListFrends = document.createDocumentFragment()
            
            const friends = await callAPI('friends.get', { fields: 'photo_100', order: 'name'})
            titleCountAll.textContent = friends.items.length
            listFrendsAll.innerHTML = renderList(friends);
    
            inputSearchAll.addEventListener('keyup', (e) => {

                listFrendsAll.innerHTML = renderList(filterRender(friends, inputSearchAll.value))
            });
            
        } catch (e) {
            console.error(e)
        }
    })();
};


function filterRender(obj = {}, filterString) {
    let resultObj = {
        items: []
    }

    if (filterString !== '') {
        const subString = new RegExp(filterString, 'ig')

        for (let friend of obj.items) {
            
            if (subString.test(friend.first_name)) {
                resultObj.items.push(friend) 
            }
        }
    } else {
        resultObj = obj
    }
    
    return resultObj
}

export {
    renderFriendsComp
}
