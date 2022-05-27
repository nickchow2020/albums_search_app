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



getJSON("gaga")
.then(data => {
  searchResult = data
  console.log(searchResult)
})
.catch(err => console.log("Error :",err))



