/* Javascript for Index Page */
const url = "https://api.punkapi.com/v2/beers/random";
const buttonElement = document.querySelector("button.btn1");
const divElement = document.querySelector("div.grid-item2");
const pTag = document.querySelector("div.grid-item2 > p");

let cardElement = document.createElement("div");
let imageContainer = document.createElement("div");
let imageElement = document.createElement("img");
let readMoreElement = document.createElement("a");
let nameElement = document.createElement("h3");

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


    divElement.classList.add("flex");
    pTag.remove();


    for (let i = 0; i < data.length; i++) {
        const beer = data[i];

        if (beer.image_url == null) {
            imageElement.setAttribute("src", 'bild_saknas.png');
        } else {
            imageElement.setAttribute("src", beer.image_url);
        }
        nameElement.textContent = beer.name;
        readMoreElement.textContent = "Läs mer";
        readMoreElement.setAttribute("name", beer.id);
        readMoreElement.addEventListener('click', onReadMoreClicked);

        cardElement.appendChild(imageContainer);
        imageContainer.classList.add("img");
        imageContainer.appendChild(imageElement);
        cardElement.appendChild(nameElement);
        cardElement.appendChild(readMoreElement);

        divElement.appendChild(cardElement);
        cardElement.classList.add("card");
    }
}

function onReadMoreClicked(evt) {
    const id = evt.target.getAttribute("name");
    const url = `./info.html?name=${id}`;
    document.location.href = url;
}