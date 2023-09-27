const api = 'https://jsonplaceholder.typicode.com/posts'
const loadingElements = document.querySelector("#loading")
const postsContainer = document.querySelector("#posts-container")

const postPage = document.querySelector('#post')
const postContainer = document.querySelector('#post-container')
const commentsContainer = document.querySelector('#comments-container')

/* Seleção de elementos do formulário */
const commentForm = document.querySelector('#comment-form')
const titleInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const bodyInput = document.querySelector('#body')

//Get id from URL
const urlSearchParams = new URLSearchParams(window.location.search)
const postId = urlSearchParams.get('id')

//Get all postis
async function getAllPosts() {
    const response = await fetch(api)

    const data = await response.json()
    
    console.log(data)

    loadingElements.classList.toggle('hide')

    data.map(post => {
        const div = document.createElement('div')
        const title = document.createElement('h2')
        const body = document.createElement('p')
        const link = document.createElement('a')
        const postId = document.createElement('a')

        title.innerText = post.title
        body.innerText = post.body
        link.innerText = `Ler o post ${post.id}`
        link.setAttribute('href', `./post.html?id=${post.id}`)
        link.setAttribute('title', `Clique neste botão para ler o post ${post.id} individualmente.`)
        postId.setAttribute('href', `./post.html?id=${post.id}`)
        postId.setAttribute('title', `Clique neste botão para ler o post ${post.id} individualmente.`)
        postId.classList.add('btnPostId')
        postId.innerText = `${post.id}`

        title.appendChild(postId)
        div.appendChild(title)

        div.appendChild(body)
        div.appendChild(link)
        postsContainer.appendChild(div)
    })
}

// Get individual posts
async function getPost(id){
    const responsePost = await fetch(api)
    const data = await responsePost.json()
    const post = data[id-1]
    
    console.log(post)

    loadingElements.classList.toggle('hide')
    postPage.classList.toggle('hide')

    const div = document.createElement('div')
    const title = document.createElement('h2')
    const body = document.createElement('p')


    title.innerText = post.title
    body.innerText = post.body
    div.appendChild(title)
    div.appendChild(body)
    postContainer.appendChild(div)

    const responseComments = await fetch(`${api}/${id}/comments`)

    const comments = await responseComments.json()
    comments.map(comment => {

        createCommente(comment)

    })

}

// Função para criar um comentário

function createCommente(comment) {
    const div =  document.createElement('div')
        const commentTitle =  document.createElement('h3')
        const commentBody =  document.createElement('p')
        const email = document.createElement('h5')

        commentTitle.innerText = comment.name /* Título*/
        email.innerText = comment.email /* E-mail de quem fez o comentário */
        commentBody.innerText = comment.body /* Corpo do comentário*/ 

        div.appendChild(commentTitle)
        div.appendChild(email)
        div.appendChild(commentBody)
        commentsContainer.appendChild(div)
}
//Função para limpar os campos após o comentário ser postado

function clearCommentsInputFields() {
    titleInput.value = "";
    emailInput.value = "";
    bodyInput.value = "";
}
// Função Postar um comentário
// Quando se trabalha com um método diferente de GET que é o padrão do fetch, como por exemplo os métodos (post, put, patch, delete) - precisamos usar os headers ou até mesmo o body para configurar a requisição
async function postComment(comment){
    const response = await fetch(`${api}/${postId}/comments`, {
        method: 'post',
        body: comment,
        headers: {
            'Content-type': "application/json; charset=UTF-8",
        }
    })

    const data = await response.json()
    createCommente(data)
}
// Se não estiver na pagina post.html o id não poderá ser pego na url, isso significa que está na página index.html e então deve pegar todos os posts, caso contrário, deve está na pagina post.html e deve mostrar o post do id expecífico.

if(!postId){
    getAllPosts()
} else {
    getPost(postId)

    /* Adicionar evento para o formulário de comentário*/
    commentForm.addEventListener('submit', e => {
        e.preventDefault()

        /* Criação de um objeto para armazenar os dados provenientes do formulario */
        let comment = {
            name: titleInput.value,
            email: emailInput.value,
            body: bodyInput.value

        }
        // console.log(comment)
        clearCommentsInputFields()
        comment = JSON.stringify(comment)
        postComment(comment)

    })
}