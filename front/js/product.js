const idLocations = window.location.search;//
// Recupère la chaîne de requête soit l'id unique des kanaps
// Retrieves the query string or the unique id of the kanaps 
// ex: ?id=055743915a544fde83cfdfc904935ee7
const urlObjet = new URLSearchParams(idLocations);
// Le URLSearchParams()constructeur crée et retourne un nouvel URLSearchParamsobjet.
// The URLSearchParams() constructor creates and returns a new URLSearchParams object.
const id = urlObjet.get('id');
// Récupère URLSearchParamsobjet dans id
// Retrieves URLSearchParamsobject in id

// Crée une image et son altTxt et l'affiche dans le DOM
// Creates an image and its altTxt and displays it in the DOM 
function kanapImg(imageUrl, altTxt) {

    const kanapImg = document.createElement("img");
    kanapImg.src = imageUrl;
    kanapImg.alt = altTxt;

    const imgDisplay = document.querySelector(".item__img");
    imgDisplay.appendChild(kanapImg);
}
// Affiche le nom du produit dans le DOM
// Displays the name of the product in the DOM
function kanapName(name) {

    const kanapName = document.querySelector("#title");
    kanapName.textContent = name;
}
// Affiche le prix du produit dans le DOM
// Displays the price of the product in the DOM
function kanapPrice(price) {

    const kanapPrice = document.querySelector("#price");
    kanapPrice.textContent = price;
}
// Affiche la description du produit dans le DOM
// Displays the description of the product in the DOM
function kanapDescript(description) {

    const kanapDescript = document.querySelector("#description");
    kanapDescript.textContent = description;
}
// Affiche les couleurs du produit dans le DOM
// Displays the colors of the product in the DOM
function kanapColor(colors) {

    const choice = document.querySelector("#colors");

    colors.forEach((choices) => {

        const option = document.createElement("option");
        option.value = choices;
        option.textContent = choices;
        choice.appendChild(option);
    })

}
// Affiche un message d'erreur dans le DOM si la requête n'a pas abouti
// Displays an error message in the DOM if the request has not succeeded
function displayError() {

    const error = document.createElement("p");
    error.textContent = " OUPS ! Une erreur est survenue, veuillez réessayer ultérieurement. Si le problème persiste contactez-nous par téléphone au : 01 23 45 67 89 ou par mail : support@name.com ";
    error.style.textAlign = "center";
    const oups = document.querySelector(".item__img");
    oups.appendChild(error);
}

// Va chercher les données du produit dans le fichier JSON à l'aide de l'id unique
// Gets the data of the product in the JSON file using the unique id
fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then((res) => kanaps(res))

    .catch(() => {
        displayError();
    })

// Affichage des données du produit dans le DOM
//  Displays the data of the product in the DOM 
function kanaps(productPage) {

    const { imageUrl, altTxt, name, price, description, colors } = productPage;
   
    kanapImg(imageUrl, altTxt)
    kanapName(name)
    kanapPrice(price)
    kanapDescript(description)
    kanapColor(colors)


}
///////////////////////BUTTON//////////////////////////


// Selectionne le bouton "ajouter au panier"
// Selects the "add to cart" button
const button = document.getElementById('addToCart')

// Ecoute l'événement click sur le bouton
// Listens for the click event on the button
button.addEventListener("click", () => {

    const colors = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;

    if (colors == null || colors == "" || quantity == null || quantity == "" || quantity > 100 || quantity < 1) {
        alert("Pourriez-vous nous indiquer une couleur et une quantité entre 1 et 100 pour poursuivre votre commande s'il vous plaît 🙏")

        return
    }

    //////////////////////////// localStorage /////////////////////////////////////

    // Ajoute le produit au panier
    // Adds the product to the cart
    const addKanaps = () => {

        let kanapData = {
            id: id,
            colors: colors,
            quantity: Number(quantity),

        };
        divAlert()

        // Vérifie si le produit est déjà dans le panier
        // Check if the product is already in the cart
        const findKanap = itemStored.find(item => item.id === kanapData.id && item.colors === kanapData.colors);

        if (findKanap) {

            findKanap.quantity = Number(findKanap.quantity);
            findKanap.quantity = +quantity;

        } else {

            itemStored.push(kanapData);

        }

        localStorage.setItem("userOrder", JSON.stringify(itemStored))

    }

    let itemStored = JSON.parse(localStorage.getItem("userOrder"));

    if (itemStored) {

        addKanaps();
      

    }

    else {

        itemStored = [];
        addKanaps()
        
    }
    totalQuantity(itemStored)
})

/////////////////// Last addings //////////////////
function totalQuantity(itemStored) {

    let totalQuantity = 0;
    for (let i = 0; i < itemStored.length; i++) {
        totalQuantity += +itemStored[i].quantity;
    }
    
   const total = document.querySelector(".alert");
     total.textContent = "Votre ajout a bien été pris en compte !" ;
     setTimeout(() => {
            total.textContent = "Votre panier contient " + totalQuantity + " article(s)" + " 🛒" ;
        }, 2500);
}

function divAlert() {

    const divAlert = document.createElement("div");
   
    divAlert.style.marginTop = "20px";
    divAlert.style.paddingTop = "10px";
    divAlert.style.paddingBottom = "10px";
    divAlert.style.borderRadius = "15px";
    divAlert.style.backgroundColor = "rgba(0,0,0,0.5)";
    divAlert.style.textAlign = "center";
    divAlert.style.color = "white";
    divAlert.style.fontSize = "20px";
   
    divAlert.classList.add("alert");
    const alert = document.querySelector(".item__content__settings");
    alert.appendChild(divAlert);
    setTimeout(() => {
        divAlert.remove();
    }, 5500);
}





