const cardDisplayArea = document.querySelector("[data-cards-display-area]")
const searchForm = document.querySelector("[data-albums-search-form]")
const searchInput = document.querySelector("[data-albums-search-input]")
const resultSummary = document.querySelector("[data-results-summary]")
const addMoreBtn = document.querySelector("[data-add-more]")


// variable to store the whole data for Web API
let searchResult = []

// variable to store needed data 
let defaultResult = []

// default display amount
let defaultValue = 20

// addon display amount
let addon = 50

// store the search key
let key = ""


// function to fetch data for API
async function getJSON(name){
  let  URL = `https://itunes.apple.com/search?term=${name}&media=music&entity=album&attribute=artistTerm&limit=200`
  try{
      const albumsList  = await fetchJsonp(URL);
      return albumsList.json();
  }catch(err){
      throw err
  }
}


// event Listener when user search
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

    const needData = sliceNeedDataFromSearchResult(defaultValue)

    formatData(needData)

    render(key)

  })
  .catch(err => console.log("Error :",err))

  searchInput.value = ""
})


// function to format the data we need to render
function formatData (data){
  defaultResult = {
    resultCount : data.length,
    results: data
  }
}

// get data from SearchResult function
function sliceNeedDataFromSearchResult(length){
  let needData = searchResult.results.slice(0,length)
  return needData
}


// function template for display search result
function displayHeadline(count="",key=""){
  let template = 
  `
  <p>${count} results for "${key}"</p>
  `
  return template;
}


// render function for display new data
function render(key="") {
  const allCard = defaultResult.results.map( obj => cardTemplate(obj)).join("")

  cardDisplayArea.innerHTML = allCard

  resultSummary.innerHTML= displayHeadline(defaultResult.resultCount,key)
}

// function template for albums card display
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



// event for add more button to add more data to display
addMoreBtn.addEventListener("click", e => {
  
  defaultValue += addon

  let newData = sliceNeedDataFromSearchResult(defaultValue)

  formatData(newData)

  render(key)
})







// getJSON()
// .then(data => {
//   searchResult = data
//   console.log(searchResult)
// })
// .catch(err => console.log("Error :",err))



