// Affiche un message d'erreur dans le DOM si la requête n'a pas abouti
// Displays an error message in the DOM if the request has not succeeded
function displayError() {
    const error = document.createElement("p");
    error.textContent = " OUPS ! Une erreur est survenue, veuillez réessayer ultérieurement. Si le problème persiste contactez-nous par téléphone au : 01 23 45 67 89 ou par mail : support@name.com ";
    error.style.textAlign = "center";

    const oups = document.querySelector("#items");
    oups.appendChild(error);
}

// Crée les articles dans le DOM et les affiche
// Creates the articles in the DOM and displays them
function kanapCards(cards) {
    const { _id, imageUrl, altTxt, name, description } = cards;
    const items = document.querySelector("#items");
    const link = document.createElement("a");
    const card = document.createElement("article");
    const titleCard = document.createElement("h3");
    const kanapImg = document.createElement("img");
    const descriptCard = document.createElement("p");

    link.href = "./product.html?id=" + _id;
    card.appendChild(link);
    kanapImg.src = imageUrl;

    kanapImg.alt = altTxt;
    kanapImg.appendChild(card);

    titleCard.classList.add('productName');
    titleCard.textContent = name;
    titleCard.appendChild(card);

    descriptCard.classList.add('productDescription');
    descriptCard.textContent = description;
    descriptCard.appendChild(card);

    items.appendChild(link);
    link.appendChild(card);
    card.appendChild(kanapImg);
    card.appendChild(titleCard);
    card.appendChild(descriptCard);
}

// Va chercher les données necessaires à la création des articles dans le fichier JSON
// Retrieves the data necessary to create the articles in the JSON file
fetch("http://localhost:3000/api/products")
    .then(firstRes => firstRes.json())
    .then((kanapData) => {

        kanapData.forEach((cards) => {

            kanapCards(cards);

        })

    }).catch(() => {
        displayError();
    })





