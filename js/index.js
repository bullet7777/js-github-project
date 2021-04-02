document.addEventListener('DOMContentLoaded', () => {
    userNameGit()
})

function userNameGit() {
    let newForm = document.getElementById('github-form')
    newForm.addEventListener('submit', searchUser)
    function searchUser(event) {
        event.preventDefault()
        let newName = document.getElementById('search')
        let value = newName.value
        fetch(`https://api.github.com/search/users?q=${value}`, {

            headers:
            {
                Accept: "application/vnd.github.v3+json"
            }

        })
            .then(resp => resp.json())
            .then(data => {
                let list = document.getElementById('user-list')

                data.items.forEach(user => {
                    let newLi = document.createElement('li')
                    let hOne = document.createElement('h1')
                    let image = document.createElement('img')
                    let anchor = document.createElement('a')
                    let button = document.createElement('button')
                    hOne.innerHTML = user.login
                    image.src = user.avatar_url
                    anchor.href = user.html_url
                    anchor.innerHTML = 'Link'


                    newLi.append(hOne)
                    newLi.append(image)
                    newLi.append(anchor)
                    newLi.append(button)

                    hOne.addEventListener('click', repos)

                    function repos() {

                        fetch(`https://api.github.com/users/${user.login}/repos`)
                            .then(resp => resp.json())
                            .then(data => {
                                let reposList = document.getElementById('repos-list')
                               
                               
                               data.forEach(repo => {
                                newLi=document.createElement('li')
                                newLi.innerHTML=repo.full_name
                                reposList.appendChild(newLi)

                               }) 
                            })
                    }
                    






                    list.appendChild(newLi)

                }
                )






            })







    }

}

