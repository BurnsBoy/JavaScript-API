const GetSearchResults = async() => {
    let term = document.getElementById('search-term').value
    let response = await axios.get(`https://api.artic.edu/api/v1/artworks/search?q=${term}`)
    console.log(term)
    console.log(response.data)
    return response.data
}

const Search = async() =>{
    clearData()
    let results = await GetSearchResults()
    for (result of results.data){
        let fullResult = await axios.get(`https://api.artic.edu/api/v1/artworks/${result.id}`)
        let imageData = fullResult.data
        createList(imageData.config.iiif_url, imageData.data.image_id, imageData.data.title, result.id)
    }
    
}
const DOM_Elements = {
    artworkList: '.artworks'
}

const createList = (endpoint, image_id, title, id) => {
    const html = `<a class="gallery-image" href="https://www.artic.edu/artworks/${id}" target="_blank"><img src="${endpoint}/${image_id}/full/843,/0/default.jpg" id="${image_id}"><h2>${title}</h2></a>`
    document.querySelector(DOM_Elements.artworkList).insertAdjacentHTML('beforeend', html)
}

const clearData = () => {
    document.querySelector(DOM_Elements.artworkList).innerHTML = ''
}


