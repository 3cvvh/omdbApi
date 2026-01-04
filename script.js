//http://www.omdbapi.com/?s=${searchInp.value}&apikey=9d0ed2de
// `    <div class="group cursor-pointer w-48 flex-shrink-0">
// <div class="relative aspect-[2/3] rounded-lg overflow-hidden mb-3 bg-surface-dark shadow-lg transition-transform duration-300 group-hover:scale-105 ring-1 ring-white/10">
// <div class="w-full h-full bg-cover bg-center" data-alt="Dark moody movie poster with red accents" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAwq2tpubhsWsmhr6CnPtNE0mXGpTn4dX_fFwCCHXZfdLY3Cf32Dce7kWAUD0OvIef3ErTJJNzC8LEP0UN5UiwS7IsMTjTwuzSPsIuWIrFJv9Vyu4aKCZM_E9A4RSO13rRkBecokBc3vg2sg6OOxp5PttJwQ0XIlmVPRbLXmcyQM1_p7FZeWIT8-R1gwM5XFFa_OQD7dd_M3wQZ6N6FaocQtJ2HWEBWxzlFr6f7t401I6pfQijdl9s6e2m7uzMvvf9-djdqho_3lUc");'></div>
// <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
// <span class="material-symbols-outlined text-white text-5xl bg-primary/80 rounded-full p-2">play_arrow</span>
// </div>
// </div>
// <h3 class="text-white font-semibold truncate text-lg">The Dark Knight</h3>
// <div class="flex items-center gap-2 text-sm text-gray-400 mt-1">
// <span class="flex items-center text-yellow-400 gap-0.5"><span class="material-symbols-outlined text-[16px] fill-1">star</span> 9.0</span>
// <span>•</span>
// <span>2008</span>
// </div>
// </div>`
let searchBtn = document.getElementById('search');

searchBtn.addEventListener("keyup",async (e) => {
if(e.key == "Enter"){
  try{
    let film = await fetchData('http://www.omdbapi.com/?','apikey=9d0ed2de',`s=${searchBtn.value}`)
    document.getElementById('loop').innerHTML = film.Search.map(f => {
        return card(f)
    } ).join('')
  }catch(err){
    console.log(err)
  }
}
})

let fetchData =  (endPoint,...params) =>{
    let url  =`${endPoint}`
    url += params.map(p => p ).join('&')
    let data = fetch(url)
        .then(respone => {
          if(respone.ok == false){
            throw new Error("error" + respone)
          }
          return respone.json()
        })
        .then(respone => {
          if(respone.Response == "False"){
            throw new Error("err:"+respone.Error)
          }
          return respone
        })
        .catch(err => { console.log("gagal", err); return [] })
    return data
}
function card(data){
return `<div class="group cursor-pointer w-48 flex-shrink-0">
<div class="relative aspect-[2/3] rounded-lg overflow-hidden mb-3 bg-surface-dark shadow-lg transition-transform duration-300 group-hover:scale-105 ring-1 ring-white/10">
<div class="w-full h-full bg-cover bg-center" data-alt="Dark moody movie poster with red accents" style='background-image: url("${data.Poster}");'></div>
<div data-id=${data.imdbID} class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
<span data-id=${data.imdbID} class="material-symbols-outlined text-white text-5xl bg-primary/80 rounded-full p-2">play_arrow</span>
</div>
</div>
<h3 class="text-white font-semibold truncate text-lg">${data.Title}</h3>
<div class="flex items-center gap-2 text-sm text-gray-400 mt-1">
<span>${data.Year}</span>
</div>
</div>`
}
async function randFilm(){
  let rand = Math.random() * 100 / 2
  let pembulatan = Math.round(rand)
  let hasil = ``
  if(pembulatan  >= 1 && pembulatan <= 15){
    hasil = "A silent voice"
  }else if(pembulatan >= 20 && pembulatan <= 25){
    hasil = "naruto"
  }else if(pembulatan >= 26)
    {
      hasil =  "spy family"
    }
    try{
  // let hasi2 =  await fetch(`http://www.omdbapi.com/?apikey=9d0ed2de&s=${hasil}`).then(res => {
  //   if(res.ok == false){
  //     throw new Error("err")
  //   }
  //   return res.json()
  // }).then(res => {
  //   if(res.Response == "False"){
  //     throw new Error(`err:${res.Error}`)
  //   }
  //   return res
  // })
  let hasi2 = await fetchData('http://www.omdbapi.com/?','apikey=9d0ed2de',`s=${hasil}`)
 document.getElementById('loop').innerHTML = hasi2.Search.map((c) => {
      return card(c)
  }) 

}catch(err){

  console.log(err)
}
    
}
randFilm()
document.body.addEventListener('click',async e => {
    if(e.target.dataset.id){
        try{
            let resp = await fetch(`http://www.omdbapi.com/?i=${e.target.dataset.id}&apikey=9d0ed2de`)
            let data = await resp.json()
            if(data.imdbID === "tt5323662"){
                data = {
                    "Title": "A Silent Voice: The Movie",
                    "Year": "2016",
                    "Rated": "Not Rated",
                    "Released": "17 Sep 2016",
                    "Runtime": "130 min",
                    "Genre": "Animation, Drama",
                    "Director": "Naoko Yamada",
                    "Writer": "Yoshitoki Ôima, Reiko Yoshida",
                    "Actors": "Miyu Irino, Saori Hayami, Aoi Yûki",
                    "Plot": "A deaf girl, Shoko, is bullied by the popular Shoya. As Shoya continues to bully Shoko, the class turns its back on him. Shoko transfers and Shoya grows up as an outcast. Alone and depressed, the regretful Shoya finds Shoko to mak...",
                    "Language": "Japanese, Japanese Sign , English",
                    "Country": "Japan",
                    "Awards": "6 wins & 9 nominations total",
                    "Poster": "https://m.media-amazon.com/images/M/MV5BOTFiNzRiOWEtYTQwNy00NmRiLWE0ZWYtNTE0YjExZjFmZjkwXkEyXkFqcGc@._V1_SX300.jpg",
                    "Ratings": [
                        { "Source": "Internet Movie Database", "Value": "8.2/10" },
                        { "Source": "Metacritic", "Value": "78/100" }
                    ],
                    "Metascore": "78",
                    "imdbRating": "8.2",
                    "imdbVotes": "133,611",
                    "imdbID": "tt5323662",
                    "Type": "movie",
                    "DVD": "N/A",
                    "BoxOffice": "$1,079,689",
                    "Production": "N/A",
                    "Website": "N/A",
                    "Response": "True"
                }
            }

            document.body.innerHTML = `
<!DOCTYPE html>
<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${data.Title} - Details</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
</head>
<body class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased min-h-screen">
<header class="px-6 py-4 border-b">
  <a href="#" onclick="location.reload()" class="text-primary font-bold">← Back</a>
</header>
<main class="p-6 max-w-5xl mx-auto">
  <div class="flex flex-col md:flex-row gap-6">
    <div class="w-full md:w-1/3">
      <img src="${data.Poster || ''}" alt="${data.Title}" class="w-full rounded-lg shadow" />
    </div>
    <div class="flex-1">
      <h1 class="text-3xl font-bold mb-2">${data.Title} <span class="text-sm text-gray-400">(${data.Year || ''})</span></h1>
      <div class="text-sm text-text-secondary mb-4">
        ${data.Genre || ''} • ${data.Runtime || ''} • Rated: ${data.Rated || 'N/A'}
      </div>
      <p class="mb-4">${data.Plot || ''}</p>
      <div class="grid grid-cols-2 gap-2 text-sm text-text-secondary">
        <div><strong>Director:</strong> ${data.Director || ''}</div>
        <div><strong>Writer:</strong> ${data.Writer || ''}</div>
        <div><strong>Actors:</strong> ${data.Actors || ''}</div>
        <div><strong>Language:</strong> ${data.Language || ''}</div>
        <div><strong>Country:</strong> ${data.Country || ''}</div>
        <div><strong>Awards:</strong> ${data.Awards || ''}</div>
        <div><strong>BoxOffice:</strong> ${data.BoxOffice || 'N/A'}</div>
        <div><strong>IMDB:</strong> ${data.imdbRating || ''} (${data.imdbVotes || '0 votes'})</div>
      </div>
      <div class="mt-4">
        ${(data.Ratings || []).map(r => `<div class="text-sm"><strong>${r.Source}:</strong> ${r.Value}</div>`).join('')}
      </div>
    </div>
  </div>
</main>
</body></html>`
        }catch(error)
        {
            console.log(error)
        }
    }
})