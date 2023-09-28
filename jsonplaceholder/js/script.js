const api = 'https://jsonplaceholder.typicode.com/posts'
const loading = document.querySelector('#loading')
const loadingComments = document.querySelector('#loading-comments')
const postsContainer = document.querySelector('#posts-container')
const commentForm = document.querySelector('#comment-form')
const commentContainer = document.querySelector('#comments-container')

//Pegar o id da url caso exista (o id só irá existir se estiver navegando na pagina post.html)
const urlSearchParams = new URLSearchParams(window.location.search)
const postId = urlSearchParams.get('id')


//Função assincrona para pegar todos os postos usando fetch (lembre-se que se não colocar nenhuma configuração, por padrão ele fará uma requisição do tipo GET)

async function getAllPosts(url) {
    const response = await fetch(url)
    const data = await response.json()

    console.log(data)

    // Criei uma forma para que os dados sejam exibidos após um determinado tempo
    const tempo = [1]
    setInterval(() => {
        loading.innerText = `Organizando os posts e exibindo em: ${tempo[0]}s.`
        if(tempo[0]>0){
            tempo[0]--
            console.log(tempo)
        } else {
            clearInterval() //serve para dá um stop no setInterval, caso contrário fica rodando infinitamente
        }

    }, 1000);

    setTimeout(() => {
        loading.classList.toggle('hide')
        postsContainer.classList.toggle('hide')
    }, `${tempo*1200} `);

    data.map(post => {
        createAllPosts(post)
    })

}


//Função para criar todos os posts

function createAllPosts(post) {
    const div = document.createElement('div')
    const title = document.createElement('h2')
    const body = document.createElement('p')
    const link = document.createElement('a')
    
    title.innerText = post.title
    body.innerText = post.body
    link.innerText = `Ler o post`
    link.setAttribute('href',`/post.html?id=${post.id}`)

    div.appendChild(title)
    div.appendChild(body) 
    div.appendChild(link)

    postsContainer.appendChild(div)
}

// Função para pegar apenas o post específico de cada id
async function getPost(id) {
    const responsePost = await fetch(api)
    const data = await responsePost.json()
    const post = data[id - 1]

    loading.classList.toggle('hide')
    postsContainer.classList.toggle('hide')
    createPost(post)
    commentForm.classList.toggle('hide')
}

 //Função para criar um post individual 
function createPost(post){
    const div = document.createElement('div')
    const title = document.createElement('h2')
    const body = document.createElement('p')

    title.innerText = post.title
    body.innerText = post.body

    div.appendChild(title)
    div.appendChild(body)
    postsContainer.appendChild(div)

}

// Função para pegar os comentários
async function getComments(postId) {
    const responseComments = await fetch(`${api}/${postId}/comments`)
    const comments = await responseComments.json()

    comments.map(comment => {
        createComment(comment)
    })
    
}

//Função criar comentários
function createComment(comment){
    const div = document.createElement('div')
    const commentTitle = document.createElement('h3')
    const commentBody = document.createElement('p')
    const email = document.createElement('h5')
    const linhaHorizontal = document.createElement('hr')

    commentTitle.innerText = comment.name
    commentBody.innerText = comment.body
    email.innerText = comment.email

    div.appendChild(commentTitle)
    div.appendChild(email)
    div.appendChild(commentBody)
    div.appendChild(linhaHorizontal)
    commentContainer.appendChild(div)
    
    loadingComments.classList.toggle('hide')
    commentContainer.classList.toggle('hide')
    
}

if(!postId){
    getAllPosts(api)
    }else{
        getPost(postId)
        getComments(postId)
    }