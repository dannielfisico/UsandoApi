const api = 'https://jsonplaceholder.typicode.com/posts'
const loading = document.querySelector('#loading')
const postsContainer = document.querySelector('#posts-container')

//Pegar o id da url caso exista (o id só irá existir se estiver navegando na pagina post.html)
const urlSearchParams = new URLSearchParams(window.location.search)
const postId = urlSearchParams.get('id')


//Função assincrona para pegar todos os postos usando fetch (lembre-se que se não colocar nenhuma configuração, por padrão ele fará uma requisição do tipo GET)

async function getAllPosts(url) {
    const response = await fetch(url)
    const data = await response.json()

    console.log(data)

    // Criei uma forma para que os dados sejam exibidos após um determinado tempo
    const tempo = [5]
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
    }, 6000);

    data.map(post => {
        createAllPosts(post)
    })

}


//Função para criar os posts

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


if(!postId){
    getAllPosts(api)
    }else{
        console.log(postId)
    }