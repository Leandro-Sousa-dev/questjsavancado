import { getUser } from '/src/scripts/services/user.js'
import { getRepositories } from '/src/scripts/services/repositories.js'
import { getEvents } from '/src/scripts/services/events.js'

import { user } from '/src/scripts/objects/user.js'
import { screen } from '/src/scripts/objects/screen.js'

import { eventsQuantity } from '/src/scripts/variables.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(verifyEmptyField(userName)) return

    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = document.getElementById('input-search').value
    if(verifyEmptyField(userName)) return

    const key = e.which || e.keyCode
    if (key === 13) {
        getUserData(userName)
    }
})

function verifyEmptyField(userName){
    if(userName.length === 0){
        window.alert('Digite um nome de usuário')
        return true
    }
}

async function getUserData(userName) {
    const userResponse = await getUser(userName)
    if(userResponse.message == 'Not Found'){
        screen.renderUserNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    console.log(repositoriesResponse)
    
    const eventsResponse = await getEvents(userName)
    const filtredEvents = eventsFilter(eventsResponse)
    user.setEvents(filtredEvents)

    screen.renderUser(user)
}

function eventsFilter(eventsList) {
    let eventsCreatePush = eventsList.filter(ev =>{
        if(ev.type == 'CreateEvent' || ev.type == 'PushEvent') return ev
    })

    if(eventsCreatePush.length -1 > eventsQuantity){
        eventsCreatePush = eventsCreatePush.slice(0, eventsQuantity)
    }
    return eventsCreatePush
}