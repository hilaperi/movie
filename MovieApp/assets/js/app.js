// Initial Values


const searchButton = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSerch = document.querySelector('#movie-serch');
const moviecontainer = document.querySelector('#movie-container');

// const prev = document.getElementById('#prev');
// const next = document.getElementById('#next');
// const current = document.getElementById('#current');

const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const current = document.querySelector('#current');

var currentPage=1;
var nextPage=2;
var prevPage=3;
var lastUrl='';
var totalPage=100;



function movieSection(movies){
    return movies.map((movie)=>{
        if(movie.poster_path){
            return `<img src =${imageUrl+movie.poster_path} data-movie-id=${movie.id}/>`;
        }
    })
}

function moviePoster(movies){
    const movieElement=document.createElement('div');
    movieElement.setAttribute('class','movie');

    const template = `<section class="section">
            ${movieSection(movies)}
        </section>
        <div class ="content">
            <p id="content-close">X</p>
        </div>`;   
    movieElement.innerHTML = template;
    return movieElement;
}

function renderMovies(data){
    currentPage=data.page;
    nextPage=currentPage+1;
    console.log('nextPage111: ', nextPage);
    prevPage=currentPage-1;
    totalPage=data.total_pages;
    movieSerch.innerHTML="";
    const movies=data.results;
    const movieBlock= moviePoster(movies);
    movieSerch.appendChild(movieBlock);
    console.log('Data: ', data);
}

  next.onclick=function(){
    if(nextPage <= totalPage){
    console.log("nextPage: ",nextPage);
    pageCall(+nextPage);
    current.innerText = +nextPage;

}
  }

prev.onclick=function(){
    if(prevPage > 0){
    var nextPage1=--nextPage;
    pageCall(nextPage-1);
    console.log("prevPage: ",nextPage-1);
    current.innerText=--nextPage;
    }
}

function pageCall(page){
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length -1].split('=');
    if(key[0] != 'page'){
        let url = lastUrl + '&page='+page
        dynamicUrl1(url);

      }else{
        key[1] = page.toString();
        let a = key.join('=');
        queryParams[queryParams.length -1] = a;
        let b = queryParams.join('&');
        let url = urlSplit[0] +'?'+ b
        console.log("nextPageurl: ",url);
        dynamicUrl1(url);
      }

}


function renderMoviesOrg(data){
    const movies=data.results;
    const movieBlock= moviePoster(movies);
    movieSerch.appendChild(movieBlock);
    console.log('Data: ', data);
}



function generalError(error){
    console.log('Error: '+error);
} 


searchButton.onclick=function(event){
    
    event.preventDefault();
    const value =inputElement.value;
    srchMovie(value);
    inputElement.value="";
    console.log('Value: ',value);

}


function creatIframe(datail){
    const iframe=document.createElement('iframe');
    iframe.src=datail;
    iframe.width=300;
    iframe.height=300;
    iframe.allowFullscreen=true;
    return iframe;
}

function detailsframe(data,content,forDetailUrl){
     //TODO
     //Movie detail
    content.innerHTML="<p id=content-close>X</p>";
    const iframeContainer=document.createElement('div');
    console.log('DetailUrl: ',data);
    const iframe = creatIframe(forDetailUrl);
    iframeContainer.appendChild(iframe);
    content.appendChild(iframeContainer);
}


//Click on any image
document.onclick=function(event){
    console.log('Event',event)
    const target =event.target;
    
    if(target.tagName.toLowerCase()==='img'){
        const movieId=target.dataset.movieId;
        console.log('Movie id: ',movieId);

        //Movie id withput backSlash
        const movieIdOrg = movieId.slice(0, -1);  
        const section=event.target.parentElement;
        const content =section.nextElementSibling;
        content.classList.add('content-display')



        const path=`movie/${movieIdOrg}`;
        const forDetailUrl= dynamicUrl(path);
        console.log('forDetailUrl: ',forDetailUrl);

        //Movie details
        fetch(forDetailUrl)
            .then((res)=>res.json())
            .then((data)=>detailsframe(data,content,forDetailUrl))
            .catch((error)=>{
                console.log('Error: ',error)
            });

    }
    
    if(target.id==='content-close'){
        const content=target.parentElement;
        content.classList.remove('content-display')
    }
}

screeningMovie();
popularMovie();
//myFavMovie(111);

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


  function ButtonClicked() {
    var container = document.getElementById("Popular Movie");
    

  }
  