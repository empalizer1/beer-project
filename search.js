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
const adSearch = document.querySelector('#adSearch');
const advancedSearch = document.querySelector('#advancedSearch');

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
    let validation = true;
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
        if(!brewedBefore.value.includes("-") || brewedBefore.value.split('-')[0].length != 2 || brewedBefore.value.split('-')[1].length != 4 ){
            document.querySelector('#brewedBeforeValidation').innerHTML = "Date format: MM-YYYY"
            validation = false;
        }   else {
            searchParams += '&brewed_before=' + brewedBefore.value;
        }
    }
    
    if(brewedAfter.value.length > 0) {
        if(!brewedAfter.value.includes("-") || brewedAfter.value.split('-')[0].length != 2 || brewedAfter.value.split('-')[1].length != 4 ){
            document.querySelector('#brewedAfterValidation').innerHTML = "Date format: MM-YYYY"
            validation = false;
        }   else {
            searchParams += '&brewed_after=' + brewedAfter.value;
        }
    }

    if(avbGreaterThan.value.length > 0) {   
        if(avbGreaterThan.value || avbGreaterThan.value < 1 || avbGreaterThan.value > 50) {
            document.querySelector('#avbGreaterThanValidation').innerHTML = "The value must be between 1-50";
            validation = false;
        }   else {
            searchParams += '&abv_gt=' + avbGreaterThan.value;
        }   
    }

    if(avbLessThan.value.length > 0) {
        if(avbLessThan.value || avbLessThan.value < 1 || avbLessThan.value > 50) {
            document.querySelector('#avbLessThanValidation').innerHTML = "The value must be between 1-50";
            validation = false; 
        }   else {
            searchParams += '&abv_lt=' + avbLessThan.value;
        } 
    }

    if(validation){
        fetch(`${apiBaseUrl}?page=${page}&per_page=10${searchParams}`)
            .then(response => response.json())
            .then(data => {
                document.querySelector('.beer-list').innerHTML = "";
                for(let beer of data){
                    beerList(beer.name, beer.id);
                }
            })
    }
}

searchButton.addEventListener('click', (target) => {
    target.preventDefault();
    page = 1;
    fetchBeer();
})

adSearch.addEventListener('click', (target) => {
    if(advancedSearch.classList.contains('open')){
        adSearch.classList.remove('close');
        advancedSearch.classList.remove('open');
    } else {
        adSearch.classList.add('close');
        advancedSearch.classList.add('open');
    }
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