let button = document.getElementById('button');

async function searchMovie(){
    let search = document.getElementById('search').value;
    const apiKey = '742443a4';
    let URL =`http://www.omdbapi.com/?apikey=${apiKey}&s=${search}&plot=full`
    ;
    
        // fetch(URL)
        // .then(response => response.json())
        // .then(data => console.log(data))

        const categoryInfo = await fetch(URL);
        const categoryJSON = await categoryInfo.json();   
        const movieArray = await categoryJSON.Search;
        console.log(movieArray);

        let container = document.getElementById('container');
        if  (typeof movieArray == "undefined" && movieArray == null) {
            container.innerHTML = null;
            container.innerHTML += `
                <p class="noResult">There is no match with your search!</p>
            `
        }else{
            container.innerHTML = null;
            movieArray.forEach(data=>{
                container.innerHTML += `
                <div class="movie" id="movie">
                    <div class="poster" id="poster"><img src="${data.Poster}" alt="${data.Title}" onerror=this.src="img/movie.jpg"></div>
                    <div class="movieText">
                        <h2 id="title" class="title">${data.Title}</h2>
                        <p id="type" class="type">${data.Type.charAt(0).toUpperCase() + data.Type.slice(1)}, ${data.Year}</p>
                        <a href="https://www.imdb.com/title/${data.imdbID}/" target="_blank"><i class="fab fa-imdb"></i></a>
                    </div>
            </div>`
    })
        }
            
     
        
        
}

button.addEventListener('click', searchMovie);
