import { baseUrl } from '/src/scripts/variables.js'

async function getEvents(userName) {
    const userData = await fetch(`${baseUrl}/${userName}/events`)
    return await userData.json()
}

export { getEvents }
