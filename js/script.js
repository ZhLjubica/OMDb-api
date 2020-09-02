let button = document.getElementById('button');
const iconHeart = document.getElementById('iconHeart');
const favouriteMovieDiv = document.getElementById('favouriteMovieDiv')

async function searchMovie() {
    let search = document.getElementById('search').value;
    const apiKey = '742443a4';
    let URL = `http://www.omdbapi.com/?apikey=${apiKey}&s=${search}&plot=full`
        ;

    // fetch(URL)
    // .then(response => response.json())
    // .then(data => console.log(data))

    const categoryInfo = await fetch(URL);
    const categoryJSON = await categoryInfo.json();
    const movieArray = await categoryJSON.Search;
    console.log(movieArray);

    let container = document.getElementById('container');

    if (typeof movieArray == "undefined" && movieArray == null) {
        container.innerHTML = null;
        container.innerHTML += `
                <p class="noResult">There is no match with your search!</p>
            `
    } else {
        container.innerHTML = null;
        movieArray.forEach(data => {
            container.innerHTML += `
                <div class="movie" id="movie">
                    <div class="poster" id="poster"><img src="${data.Poster}" alt="${data.Title}" onerror=this.src="img/noImageAvailable.jpg">
                    <div class="iconHeart">
                    <a href="#/" class="icon" id="iconHeart" onclick="favouriteMovie()">
                        <i class="fas fa-heart"></i>
                    </a>
                    </div>
                    </div>
                    <div class="movieText">
                        <h2 id="title" class="title">${data.Title}</h2>
                        <p id="type" class="type">${data.Type.charAt(0).toUpperCase() + data.Type.slice(1)}, ${data.Year}</p>
                        <span><a href="https://www.imdb.com/title/${data.imdbID}/" target="_blank"><i class="fab fa-imdb"></i></a></span>
                    </div>
            </div>`
        })
    }


}


//fade in quotes

$(window).on("load",function() {
    $(window).scroll(function() {
      var windowBottom = $(this).scrollTop() + $(this).innerHeight();
      $(".fade-in").each(function() {
        /* Check the location of each desired element */
        var objectBottom = $(this).offset().top + $(this).outerHeight();
        
        /* If the element is completely within bounds of the window, fade it in */
        if (objectBottom < windowBottom) { //object comes into view (scrolling down)
          if ($(this).css("opacity")==0) {$(this).fadeTo(500,1);}
        } 
        else { //object goes out of view (scrolling up)
          if ($(this).css("opacity")==1) {$(this).fadeTo(500,0);}
        }
      });
    }).scroll(); //invoke scroll-handler on page-load
  });


// sidebar
function openSidebar() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("sidebar").style.width = "25%";
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("star").style.display = "none";
}
function closeSidebar() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("star").style.display = "inline-block";
}

//favourite movies

let favouriteArr = [];
function favouriteMovie() {
    favouriteArr.indexOf(event.target.parentNode.parentNode.parentNode.childNodes[0].getAttribute('alt')) === -1 ?
    favouriteArr.push(event.target.parentNode.parentNode.parentNode.childNodes[0].getAttribute('alt')) : console.log('This movie already exist in array!');
    console.log(favouriteArr);
//appending movies from array to favourite movie sidebar


    favouriteMovieDiv.innerHTML = "";
    favouriteArr.forEach(elem=>{
        favouriteMovieDiv.innerHTML += `
            <a href="#">${elem}</a>
            
        `
    })
}

//event listeners
button.addEventListener('click', searchMovie);