let button = document.getElementById('button');
const iconHeart = document.getElementById('iconHeart');
const favouriteMovieDiv = document.getElementById('favouriteMovieDiv');
const header = document.getElementById('header');

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
                    </div>
                    <span class="imdb"><a href="https://www.imdb.com/title/${data.imdbID}/" target="_blank"><img
                        height="18"
                        width="40"
                        src="https://www.pngkey.com/png/full/343-3433435_facebook-imdb-icon.png"
                      /></a></span>
            </div>`
        })
    }


}


//fade in quotes

$(window).on("load", function () {
    $(window).scroll(function () {
        var windowBottom = $(this).scrollTop() + $(this).innerHeight();
        $(".fade-in").each(function () {
            /* Check the location of each desired element */
            var objectBottom = $(this).offset().top + $(this).outerHeight();

            /* If the element is completely within bounds of the window, fade it in */
            if (objectBottom < windowBottom) { //object comes into view (scrolling down)
                if ($(this).css("opacity") == 0) { $(this).fadeTo(500, 1); }
            }
            else { //object goes out of view (scrolling up)
                if ($(this).css("opacity") == 1) { $(this).fadeTo(500, 0); }
            }
        });
    }).scroll(); //invoke scroll-handler on page-load
});


// sidebar
let x = window.matchMedia("(max-width: 375px)");
let y = window.matchMedia("(max-width: 768px)");

function openSidebar() {
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("star").style.display = "none";
    if (x.matches) {
        document.getElementById("sidebar").style.width = "70%";
        document.getElementById("main").style.marginLeft = "100%";
    } else if (y.matches) {
        document.getElementById("sidebar").style.width = "40%";
        document.getElementById("main").style.marginLeft = "40%";
    } else {
        document.getElementById("sidebar").style.width = "25%";
        document.getElementById("main").style.marginLeft = "25%";
    }
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
    //add span 'movie added to the favourites' into header
    header.innerHTML = `<span id="paragraph" class="blink-me">Movie added to the favourites!<span>`;
    //dissapear after 2 sec
    setTimeout(function () {
        document.getElementById("paragraph").style.display = 'none';
        header.innerHTML = `<span>MovieLibrary</span>
            <div class="star" id="star">
                <img src="img/iconfinder_keditbookmarks_17999.png" alt="star" onclick="openSidebar()">
            </div>`;
    }, 2000);


    console.log(favouriteArr);
    //appending movies from array to favourite movie sidebar
    favouriteMovieDiv.innerHTML = "";
    favouriteArr.forEach(elem => {
        favouriteMovieDiv.innerHTML += `
            <div class="movieDiv" id="movieDiv">
            <a href="#">${elem}</a>
            <button class="close" id="close">&times;</button>
            </div>
        `;

    });
    let closeButton = document.querySelectorAll('.close');
    console.log(closeButton);
    closeButton.forEach(element => {
        element.addEventListener('click', removeMovie);
    });
}

function removeMovie() {
    let item = this.parentNode;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.childNodes[1].innerText;

    if (id === 'favouriteMovieDiv') {
        parent.removeChild(item);
        favouriteArr.splice(favouriteArr.indexOf(value), 1);
    }
    console.log(value);
    console.log(favouriteArr);
}


//event listeners
button.addEventListener('click', searchMovie);
