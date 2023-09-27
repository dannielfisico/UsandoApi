const api = 'https://jsonplaceholder.typicode.com/posts'
const loading = document.querySelector('#loading')

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
    }, 6000);

}

