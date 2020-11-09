const apiBaseUrl = "https://api.punkapi.com/v2/beers";
let page = 1;
let searchValue;
const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('#searchInput');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');



const beerList = (name, id) => {
    const beerElement = document.createElement('li');
    const infoLink = document.createElement('a');
    infoLink.setAttribute('href', 'info.html?id=' + id);
    infoLink.innerHTML = name;
    beerElement.appendChild(infoLink);
    document.querySelector('.beer-list').appendChild(beerElement);
};

const fetchBeer = () => {

    fetch(`${apiBaseUrl}?page=${page}&per_page=10&beer_name=${searchValue}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.beer-list').innerHTML = "";
            for(let beer of data){
                beerList(beer.name, beer.id);
                console.log(beer);
            }
        })
}

searchButton.addEventListener('click', (target) => {
    target.preventDefault();
    searchValue = searchInput.value;
    page = 1;
    fetchBeer();
})

nextButton.addEventListener('click',() => {
    page++;
    fetchBeer();
})

prevButton.addEventListener('click',() => {
    if(page > 1) {
        page--;
        fetchBeer();
    }
})