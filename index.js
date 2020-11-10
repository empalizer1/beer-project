/* Javascript for Index Page */
const url = "https://api.punkapi.com/v2/beers/random";
const buttonElement = document.querySelector(".btn1");
const randomBeerDiv = document.querySelector("random-beer");

let card = document.querySelector(".card");
let imageContainer = document.querySelector(".beer-img");
let imageElement = document.createElement("img");



let readMore = document.querySelector(".read-more");
let beerName = document.querySelector(".beer-name");


// Function getData
function getData(url, callback) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            callback(data);
        });
}

buttonElement.addEventListener("click", onClick);

// Function OnClick
function onClick(evt) {
    getData(url, render);
    evt.preventDefault();
}

// Function render
function render(data) {

    for (let i = 0; i < data.length; i++) {
        const beer = data[i];

        card.classList.add('white-background');

        beerName.textContent = beer.name;


        if (beer.image_url == null) {
            imageElement.setAttribute("src", 'bild_saknas.png');
        } else {
            imageElement.setAttribute("src", beer.image_url);
        }


        imageContainer.appendChild(imageElement);

        readMore.textContent = "READ MORE";

        readMore.setAttribute("name", beer.id);

        readMore.addEventListener('click', onReadMoreClicked);




    }
}

function onReadMoreClicked(evt) {
    const id = evt.target.getAttribute("name");
    const url = `./info.html?name=${id}`;
    document.location.href = url;
}