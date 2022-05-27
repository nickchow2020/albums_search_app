const cardDisplayArea = document.querySelector("[data-cards-display-area]")



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



getJSON("gaga")
.then(data => {
  searchResult = data
  console.log(searchResult)
  render()
})
.catch(err => console.log("Error :",err))



