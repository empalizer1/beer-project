const apiBaseUrl = "https://api.punkapi.com/v2/beers";
let page = 1;
let searchValue;
const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('#searchInput');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

const fetchBeer = () => {
    fetch(`${apiBaseUrl}?page=${page}&per_page=10&beer_name=${searchValue}`)
        .then(response => response.json())
        .then(data => {
            /* CREATE HTML LIST */
            console.log(data);
            for(let beer of data){
                console.log(beer.name);
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