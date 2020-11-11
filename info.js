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

let ingredientsList = document.querySelector('.ingredients-list')






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
    alcohol.textContent += 'ABV ' + beer.abv + '%';


    description.textContent = beer.description;

    
    volume.innerHTML += beer.volume.value + ' ' + beer.volume.unit;


    let ingredientsArray = Object.keys(beer.ingredients);

    for (let index = 0; index < ingredientsArray.length; index++) {
        let listItem = document.createElement("LI");
        let nameOfIngredients = document.createTextNode(ingredientsArray[index]);
        listItem.appendChild(nameOfIngredients);
        ingredientsList.appendChild(listItem);
        listItem.classList.add('list-item' + (index + 1));
    }


    let malt = document.querySelector('.list-item1');

    let newMalt = "";

    firstToUpperCase(malt, newMalt);


    let allMalt = "";

    let maltArray = Object.values(beer.ingredients)[0];

    ingredientsStr(maltArray, allMalt, malt)



    let hops = document.querySelector('.list-item2');

    let newHops = "";

    firstToUpperCase(hops, newHops);

    let allHops = "";

    let hopsArray = Object.values(beer.ingredients)[1];

    ingredientsStr(hopsArray, allHops, hops)



    let yeast = document.querySelector('.list-item3');

    let newYeast = "";

    firstToUpperCase(yeast, newYeast);

    let yeastObject = Object.values(beer.ingredients)[2];

    yeast.innerHTML += ': ' + yeastObject;


    for (let i = 0; i < beer.food_pairing.length; i++) {

        if (i != (beer.food_pairing.length - 1)) {
            food += beer.food_pairing[i] + ', ';
        } else {
            food += beer.food_pairing[i]
        }
    }

    foodPairing.innerHTML += food;


    brewersTips.innerHTML += beer.brewers_tips;
}


function firstToUpperCase(str, newStr) {
    for (let i = 0; i < str.innerHTML.length; i++) {


        if (i == 0) {
            newStr += str.innerHTML[i].toUpperCase();

        } else {
            newStr += str.innerHTML[i]
        }
    }

    str.innerHTML = newStr;
}



function ingredientsStr(arr, str1, str2) {

    for (let i = 0; i < arr.length; i++) {

        if (i != (arr.length - 1)) {
            str1 += arr[i].name + ', ';
        } else {
            str1 += arr[i].name;
        }
    }

    str2.innerHTML += ': ' + str1;

}



