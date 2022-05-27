const cardDisplayArea = document.querySelector("[data-cards-display-area]")
const searchForm = document.querySelector("[data-albums-search-form]")
const searchInput = document.querySelector("[data-albums-search-input]")
const resultSummary = document.querySelector("[data-results-summary]")

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

  if (searchValue === "" || searchValue === null) {
    alert("search box can not be empty");
    return;
  }

  resultSummary.innerHTML = "<h3>loading...</h3>"

  getJSON(searchValue)
  .then(data => {
    searchResult = data
    render(searchValue)
  })
  .catch(err => console.log("Error :",err))

  searchInput.value = ""
})


function displayHeadline(count="hello",key="yes"){
  let template = 
  `
  <p>${count} results for "${key}"</p>
  `
  return template;
}


function render(key="") {
  const allCard = searchResult.results.map( obj => cardTemplate(obj)).join("")

  cardDisplayArea.innerHTML = allCard

  resultSummary.innerHTML= displayHeadline(searchResult.resultCount,key)
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



// getJSON()
// .then(data => {
//   searchResult = data
//   console.log(searchResult)
// })
// .catch(err => console.log("Error :",err))



