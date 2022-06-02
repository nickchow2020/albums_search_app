const cardDisplayArea = document.querySelector("[data-cards-display-area]")
const searchForm = document.querySelector("[data-albums-search-form]")
const searchInput = document.querySelector("[data-albums-search-input]")
const resultSummary = document.querySelector("[data-results-summary]")
const addMoreBtn = document.querySelector("[data-add-more]")



let searchResult = []
let defaultResult = []
let defaultValue = 20

let addon = 50

let key = ""

async function getJSON(name){
  let  URL = `https://itunes.apple.com/search?term=${name}&media=music&entity=album&attribute=artistTerm&limit=200`
  try{
      const albumsList  = await fetchJsonp(URL);
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

  key = searchValue

  resultSummary.innerHTML = "<h3>loading...</h3>"

  getJSON(searchValue)
  .then(data => {
    searchResult = data
    let needData = searchResult.results.slice(0,defaultValue)

    defaultResult = {
      resultCount : needData.length,
      results: needData
    }

    render(key)

  })
  .catch(err => console.log("Error :",err))

  searchInput.value = ""
})


function displayHeadline(count="",key=""){
  let template = 
  `
  <p>${count} results for "${key}"</p>
  `
  return template;
}


function render(key="") {
  const allCard = defaultResult.results.map( obj => cardTemplate(obj)).join("")

  cardDisplayArea.innerHTML = allCard

  resultSummary.innerHTML= displayHeadline(defaultResult.resultCount,key)
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




addMoreBtn.addEventListener("click", e => {
  
  defaultValue += addon

  let newData = searchResult.results.slice(0,defaultValue)

  defaultResult = {
    resultCount : newData.length,
    results: newData
  }

  console.log(defaultResult)

  render(key)
})







// getJSON()
// .then(data => {
//   searchResult = data
//   console.log(searchResult)
// })
// .catch(err => console.log("Error :",err))



