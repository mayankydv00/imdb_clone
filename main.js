const getMovie = async(title) => {
    let currentPage = 1;
    let totalPages;

    const getMovieInfo = async(page = 1 ) => {
        const res = await fetch(`https://www.omdbapi.com/?s=${title}&page=${page}&apikey=ef546c6`);
    
        let mainContainer = document.getElementById('listContainer');
        const list = await res.json();

        mainContainer.innerHTML = "" ;
        totalPages = Math.ceil(list["totalResults"] / 10);

        for(let i = 0; i < list["Search"].length; i++){

            let container = document.createElement('div');
            container.classList.add('movieContainer');
            let title = document.createElement('div');
            title.classList.add('movieTitle');
            let poster = document.createElement('img');
            poster.classList.add('moviePoster');
            title.innerHTML = list["Search"][i].Title;
            poster.src = list["Search"][i].Poster;

            poster.addEventListener('error', function() {
            poster.src = 'images/alternate_img.jpg';
            });
            
            poster.alt = "images/alternate_img.jpg";
            // poster.alt = "images/alternate_img.jpg";
            container.append(title);
            container.append(poster);
            container.setAttribute('data-movie-title',list["Search"][i].Title);
            container.onclick = function() {getMovieDetails(list["Search"][i].imdbID)} ; // 
            mainContainer.append(container);
            
        }
    }

    function setupPagination() {
        const pagination = document.querySelector('.pagination-container');
        pagination.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const link = document.createElement("a");
            link.href = "#";
            link.innerText = i;

            if (i === currentPage) {
                link.classList.add("active");
            }

            link.addEventListener("click", (event) => {
                event.preventDefault();
                currentPage = i;
                getMovieInfo(currentPage , i);

                const currentActive = pagination.querySelector(".active");
                currentActive.classList.remove("active");
                link.classList.add("active");
            });

            pagination.appendChild(link);
        }
    }

    await getMovieInfo(currentPage);
    setupPagination();
}

const getMovieDetails = async(movieId) => {
    // const uri = `http://www.omdbapi.com/?t=${title}&plot=full`;
    let res = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=ef546c6`);
    res = await res.json();
    console.log(res);

    let container = document.createElement("div");
    container.classList.add("movieDetailContainer");
    
    let title = document.createElement('div');
    title.classList.add('movieTitleClicked');

    let poster = document.createElement('img');
    poster.classList.add('moviePosterClicked');

    title.innerHTML = res.Title;//
    poster.src = res.Poster ;

    poster.addEventListener('error', function() {
    poster.src = 'images/alternate_img.jpg';
    });

    

    let actors = document.createElement('div');
    actors.classList.add('movieActor');
    actors.innerHTML = "Actors : "+  res.Actors;

    let boxOffice = document.createElement('div');
    boxOffice.classList.add('movieBoxOffice');
    boxOffice.innerHTML = "Box Office Collection : " + res.BoxOffice ;
    
    let director = document.createElement('div');
    director.classList.add('movieDirector');
    director.innerHTML ="Director : " + res.Director;


    let ReleaseDate = document.createElement('div');
    ReleaseDate.classList.add('ReleaseDate');
    ReleaseDate.innerHTML= "ReleaseDate : " + res.Released;
    
    let Duration = document.createElement('div');
    Duration.classList.add('Duration');
    Duration.innerHTML= "Runtime : " + res.Runtime;

    let Plot = document.createElement('div');
    Plot.classList.add('Plot');
    Plot.innerHTML="Plot : " + res.Plot;

    let imdbRating = document.createElement('div');
    imdbRating.classList.add('imdbRating');
    imdbRating.innerHTML= "imdbRating : " + res.imdbRating;

    let Language = document.createElement('div');
    Language.classList.add('Language');
    Language.innerHTML= "Language : " + res.Language;


    let crossButton = document.createElement("button");
    crossButton.innerHTML = "close";
    crossButton.classList.add("crossButton");
    crossButton.onclick = function(){ 
        let box = document.getElementsByClassName("movieDetailContainer");

        box[0].remove();
        // box.innerHTML = "sdhh";
        

     };

    container.append(crossButton);
    container.append(title);
    container.append(poster);
    // container.append(Language);

    container.append(imdbRating);
    

    container.append(Plot);

    container.append(Duration);

    
    container.append(ReleaseDate);
    
    container.append(actors);
    container.append(boxOffice);
    container.append(director);

    document.getElementById("listContainer").append(container);
} 

function searchMovie(){
    let title = document.getElementById("searchValue").value;
    // console.log("title = " + title);
    getMovie(title);
}

window.onload = getMovie('marvel');
