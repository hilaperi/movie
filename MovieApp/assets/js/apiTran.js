const API_KEY="2c46288716a18fb7aadcc2a801f3fc6b"
const url="https://api.themoviedb.org/3/search/movie?api_key=2c46288716a18fb7aadcc2a801f3fc6b"
const popularMovieurl= "https://api.themoviedb.org/3/discover/movie?api_key=2c46288716a18fb7aadcc2a801f3fc6b&sort_by=popularity.desc";
const deatilsMovieurl="https://api.themoviedb.org/3/movie/46992?api_key=2c46288716a18fb7aadcc2a801f3fc6b";
const imageUrl = 'https://image.tmdb.org/t/p/w500';
var currentPage=1;
var nextPage=2;
var prevPage=3;
var lastUrl='';
var totalPage=100;

function dynamicUrl(path){
    const url=`https://api.themoviedb.org/3/${path}?api_key=2c46288716a18fb7aadcc2a801f3fc6b`;
    return url;
}

function dynamicUrl1(path){   
    reqMovie(path,renderMovies,generalError); 
    return path;
}

function reqMovie(url,complete,error){
    lastUrl=url;
    fetch(url)
        .then((res)=>res.json())
        .then(complete)
        .catch(error);
}


function srchMovie(value){
    const path= "search/movie";
    const forSearchUrl= dynamicUrl(path) + '&query=' + value;
    reqMovie(forSearchUrl,renderMovies,generalError);   
}


function popularMovie(value){
    const path= "discover/movie";
    const forSearchUrl= dynamicUrl(path) + '&sort_by=popularity.desc';
    reqMovie(forSearchUrl,renderMovies,generalError);   
}

 
function screeningMovie(){
    const path= "movie/now_playing";
    const forSearchUrl= dynamicUrl(path);
    reqMovie(forSearchUrl,renderMovies,generalError);   
}


function myFavMovie(value){
    const path= "account";
    const path1=`https://api.themoviedb.org/3/account/${value}/favorite/movies?api_key=2c46288716a18fb7aadcc2a801f3fc6b`
    const forSearchUrl= dynamicUrl(path) + value + '/favorite/movie';
    reqMovie(path1,renderMovies,generalError);   
}