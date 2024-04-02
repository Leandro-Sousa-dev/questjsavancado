import { baseUrl, repositoriesQuantity } from '/src/scripts/variables.js'

async function getRepositories(userName) {
    const userData = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`)
    return await userData.json()
}

export { getRepositories }
