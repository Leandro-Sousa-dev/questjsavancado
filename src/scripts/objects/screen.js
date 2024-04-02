const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        const userInfo = `<div class="info">
                          <img src="${user.avatarUrl}" alt="imagem do usuário"/>
                          <div class="data">
                                <h1>${user.name ?? 'Usuário sem nome cadstrado.'}</h1>
                                <p>${user.bio ?? 'Usuário sem descrição'}</p>
                                <ul class='followers'>
                                    <li><p>👥seguidores</p> <h3>${user.followers}</h3></li>
                                    <li><p>👤seguindo</p> <h3>${user.following}</h3></li>
                                </ul>
                          </div>
                          </div>`
        this.userProfile.innerHTML = userInfo

        let repositoriesItens = ""

        user.repositories.forEach(repoInfo => {
            repoInfo = `<li>
                            <a href="${repoInfo.html_url}" target="_blank">
                                <p>${repoInfo.name}</p>
                                <div>
                                    <span>🍴${repoInfo.forks_count}</span>
                                    <span>⭐${repoInfo.stargazers_count}</span>
                                    <span>👀${repoInfo.watchers}</span>
                                    <span>👨‍💻${repoInfo.language ?? '❌'}</span>
                                </div>
                            </a>
                        </li>`
            repositoriesItens += repoInfo
        });

        if (user.repositories.length > 0) {

            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                           </div>`
        }

        let eventsItens = ""

        user.events.forEach(evInfo => {
            const commitList = evInfo.payload.commits
            evInfo = `<li>  
                            <h3>${evInfo.repo.name}</h3>
                            <p>-${evInfo.payload.commits[commitList.length -1].message}</p>
                      </li>`
            eventsItens += evInfo
        });

        if (user.events.length > 0) {

            this.userProfile.innerHTML += `<div class="events">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                           </div>`
        }
    },
    renderUserNotFound() {
        this.userProfile.innerHTML = `<h3>Usuário não encontrado</h3>`
    }
}

export { screen }