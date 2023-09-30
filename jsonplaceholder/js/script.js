const api = 'https://jsonplaceholder.typicode.com/posts'

const loading = document.querySelector('#loading')
const postsContainer = document.querySelector('#posts-container')
const postContainer = document.querySelector('#post-container')


const urlSearchParams = new URLSearchParams(document.location.search)
console.log(`UrlSearchParams = ${urlSearchParams.get('id')}`)
const postId = urlSearchParams.get('id')
async function getAllPosts(url) {
    const data = await fetch(url)
    if(data.ok){
        console.log(`Peguei os dados, bora trabalhar!!!`)
        loading.classList.toggle('hide')
        postsContainer.classList.toggle('hide')
        const posts = await data.json()
        console.log(posts)
        
        posts.map(post => createPost(post)) 

        /*
        const caixas = document.querySelectorAll('#posts-container > div')           
        caixas.forEach(caixa => {
            const es = document.createElement('a')
            es.innerText = 'Daniel Alves - GitHub'
            es.setAttribute('href','https://github.com/dannielfisico')
            caixa.appendChild(es) 
        })*/
    } else {
        console.log(`Falhou`)

    }
    
}

function createPost(post){
    const div = document.createElement('div')
    const section = document.createElement('section')
    const postId = document.createElement('span')
    const postTitle = document.createElement('h2')
    const postBody = document.createElement('p')
    const btnLerPost = document.createElement('a')

    postId.innerText = `${post.id}`
    postTitle.innerText = `${post.title}`
    postBody.innerText = `${post.body}`
    btnLerPost.innerText = `Ler Post`
    btnLerPost.setAttribute('href', `./post.html?id=${post.id}`)
    
    section.appendChild(postId)
    section.appendChild(postTitle)

    
    div.appendChild(section)
    div.appendChild(postBody)
    div.appendChild(btnLerPost)
    postsContainer.appendChild(div)    

}

async function createPost(id) {

}

if(!postId){
    getAllPosts(api)

} else {
    console.log(postId)
}



