/* Javascript for Info Page */
const buttonElement = document.querySelector("button.btn1");
const divElement = document.querySelector("div.grid-item1");
const pTag = document.querySelector("div.grid-item1 > p");

const searchParams = new URLSearchParams(window.location.search);
const api = "https://api.punkapi.com/v2/beers";
const id = searchParams.get("name");
const url = `${api}/${id}`;
console.log(id);

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
    const name = beer.name;
    const brewers_tips = beer.brewers_tips;

    const h1Tag = document.createElement("h1");
    const pTag = document.createElement("p");

    h1Tag.textContent = name;
    pTag.textContent = brewers_tips;

    divElement.appendChild(h1Tag);
    divElement.appendChild(pTag);
}