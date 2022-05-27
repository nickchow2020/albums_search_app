const cardDisplayArea = document.querySelector("[data-cards-display-area]")
const searchForm = document.querySelector("[data-albums-search-form]")
const searchInput = document.querySelector("[data-albums-search-input]")

let searchResult = []

async function getJSON(name){
  let  URL = `https://itunes.apple.com/search?term=${name}&media=music&entity=album&attribute=artistTerm&limit=200`
  try{
      const albumsList  = await fetch(URL);
      return albumsList.json();
  }catch(err){
      throw err
  }
}


searchForm.addEventListener("submit", e => {
  e.preventDefault()

  const searchValue = searchInput.value

  getJSON(searchValue)
  .then(data => {
    searchResult = data
    render()
  })

  searchValue.value = ""
})


function render() {
  const allCard = searchResult.results.map( obj => cardTemplate(obj)).join("")

  cardDisplayArea.innerHTML = allCard
}




function cardTemplate(data){
  let template = 
  `
  <div class="card" id=${data.artistId}>
    <div class="card__cover">
      <img src="${data.artworkUrl100}" alt="image">
    </div>

    <div class="card__album">
      <p>
        ${data.collectionCensoredName}
      </p>
    </div>
  </div>
  
  `

  return template
}



getJSON()
.then(data => {
  searchResult = data
  console.log(searchResult)
  render()
})
.catch(err => console.log("Error :",err))



