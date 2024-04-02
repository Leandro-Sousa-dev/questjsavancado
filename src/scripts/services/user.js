import { baseUrl } from '/src/scripts/variables.js'

async function getUser(userName) {
    const userData = await fetch(`${baseUrl}/${userName}`)
    return await userData.json()
}

export { getUser }