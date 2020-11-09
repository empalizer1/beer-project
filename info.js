/* Javascript for Info Page */


const searchParams = new URLSearchParams(window.location.search);
const api = "https://api.punkapi.com/v2/beers";
const id = searchParams.get("name");
const url = `${api}/${id}`;
console.log(id);

let imageContainer = document.querySelector(".beer-img");
let imageElement = document.createElement("img");

let beerName = document.querySelector('.beer-name');
let description = document.querySelector('.description');

let alcohol = document.querySelector('.alcohol');
let volume = document.querySelector('.volume');
let brewersTips = document.querySelector('.brewers-tips');

let foodPairing = document.querySelector('.food-pairing');
let food = "";


let ingredients = document.querySelector('.ingredients');

let hops = document.querySelector('.hops');




getData(url, render);
function getData(url, callback) {

    fetch(url)
        .then(res => res.json())
        .then(data => {
            callback(data);
        })
        .catch(error => console.log(error));
}

function render(data) {
    console.log(data);
    const beer = data[0];


    if (beer.image_url == null) {
        imageElement.setAttribute("src", 'bild_saknas.png');
    } else {
        imageElement.setAttribute("src", beer.image_url);
    }

    imageContainer.appendChild(imageElement);

    beerName.textContent = beer.name;
    description.textContent = beer.description;

    alcohol.textContent += beer.abv + '%';
    volume.textContent += beer.volume.value + beer.volume.unit;



    for (let i = 0; i < beer.food_pairing.length; i++) {

        if (i != (beer.food_pairing.length - 1)) {
            food += beer.food_pairing[i] + ', ';
        } else {
            food += beer.food_pairing[i]
        }
    }

    foodPairing.textContent += food;

    let ingredientsArray = Object.keys(beer.ingredients);

    let allIngredients = "";


    for (let i = 0; i < ingredientsArray.length; i++) {

        if (i != (ingredientsArray.length - 1)) {
            allIngredients += ingredientsArray[i] + ', ';
        } else {
            allIngredients += ingredientsArray[i];
        }

    }

    ingredients.textContent += allIngredients;

    brewersTips.textContent += beer.brewers_tips;

    let allHops = "";

    let hopsArray = Object.values(beer.ingredients)[1];

    for (let i = 0; i < hopsArray.length; i++) {

        if (i != (hopsArray.length - 1)) {
            allHops += hopsArray[i].name + ', ';
        } else {
            allHops += hopsArray[i].name;
        }
    }


    hops.textContent += allHops;
}