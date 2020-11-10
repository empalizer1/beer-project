const apiBaseUrl = "https://api.punkapi.com/v2/beers";
let page = 1;
const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('#searchInput');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const hopsInput = document.querySelector('#searchHops');
const searchMalt = document.querySelector('#searchMalt');
const brewedBefore = document.querySelector('#brewedBefore');
const brewedAfter = document.querySelector('#brewedAfter');
const avbGreaterThan = document.querySelector('#avbGreaterThan');
const avbLessThan = document.querySelector('#avbLessThan');

const beerList = (name, id) => {
    const beerElement = document.createElement('li');
    const infoLink = document.createElement('a');
    infoLink.setAttribute('href', 'info.html?name=' + id);
    infoLink.innerHTML = name;
    beerElement.appendChild(infoLink);
    document.querySelector('.beer-list').appendChild(beerElement);
};

const fetchBeer = () => {
    let searchParams = "";
    if(searchInput.value.length > 0) {
        searchParams += '&beer_name=' + searchInput.value;
    }
    if(hopsInput.value.length > 0) {
        searchParams += '&hops=' + hopsInput.value;
    }
    if(searchMalt.value.length > 0) {
        searchParams += '&malt=' + searchMalt.value;
    }
    if(brewedBefore.value.length > 0) {
        searchParams += '&brewed_before=' + brewedBefore.value;
    }
    if(brewedAfter.value.length > 0) {
        searchParams += '&brewed_after=' + brewedAfter.value;
    }
    if(avbGreaterThan.value.length > 0) {
        searchParams += '&abv_gt=' + avbGreaterThan.value;
    }
    if(avbLessThan.value.length > 0) {
        searchParams += '&abv_lt=' + avbLessThan.value;
}

    fetch(`${apiBaseUrl}?page=${page}&per_page=10${searchParams}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.beer-list').innerHTML = "";
            for(let beer of data){
                beerList(beer.name, beer.id);
            }
        })
}

searchButton.addEventListener('click', (target) => {
    target.preventDefault();
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