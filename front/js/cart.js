let kanaps;

// Va chercher les données des produits dans l'API
// Fetch product data from the API
fetch("http://localhost:3000/api/products")
    .then(firstRes => firstRes.json())
    .then((kanapData) => {
        kanaps = kanapData;
        let itemStored = JSON.parse(localStorage.getItem("userOrder"));

        if (itemStored === null) {

            emptyMsg();
            return
        }

        for (let k = 0; k < itemStored.length; k++) {

            const myKanap = kanapData.find(_item => _item._id == itemStored[k].id)
            console.log("console.log de myKanap :", myKanap)

            console.log("console.log de itemStored :", itemStored)
            if (myKanap) {

                cart(itemStored, k, myKanap);
                totalQuantity(itemStored);
                totalPrice(itemStored, kanaps)
                deleteProduct(itemStored, k);
            }
        }

    }).catch(() => {
        displayError();

    })
// Affichage un message si la requête a échoué
// Displays a message if the request failed
function displayError() {
    const error = document.createElement("p");
    error.textContent = " OUPS ! Une erreur est survenue, veuillez réessayer ultérieurement. Si le problème persiste contactez-nous par téléphone au : 01 23 45 67 89 ou par mail : support@name.com ";
    error.style.textAlign = "center";

    const oups = document.querySelector("#cart__items");
    oups.appendChild(error);
}
// Affiche un message si le panier est vide
// Displays a message if the cart is empty
function emptyMsg() {
    const emptyBasket = document.createElement("h2");
    emptyBasket.textContent = " Votre panier est vide, n'hésitez pas à consulter notre site afin de trouver le KANAP de vos rêves !";
    emptyBasket.style.textAlign = "center";

    const emptyPlace = document.querySelector("#cart__items");
    emptyPlace.appendChild(emptyBasket);
}

// Calcule le nombre de produit total dans le panier
// Calcule the total number of products in the cart
function totalQuantity(itemStored) {

    let totalQuantity = 0;
    for (let i = 0; i < itemStored.length; i++) {
        totalQuantity += +itemStored[i].quantity;
    }
    const total = document.querySelector("#totalQuantity");

    total.textContent = totalQuantity;

}

// Calcule le prix total
// Calculate the total price
function totalPrice(itemStored, kanapData) {

    let totalPrice = 0;
    for (let i = 0; i < itemStored.length; i++) {

        const myKanap = kanapData.find(_item => _item._id === itemStored[i].id)
        totalPrice += myKanap.price * itemStored[i].quantity;
    }

    const totalP = document.querySelector("#totalPrice");
    totalP.textContent = totalPrice;
}

// Supprime un produit du panier
// Delete a product from the cart
function deleteProduct(itemStored, k) {

    const deleteBtn = document.querySelectorAll(".deleteItem");

    deleteBtn[k].addEventListener("click", () => {
        itemStored.splice(k, 1);// on delete 1 produit de la liste à l'index k
        localStorage.setItem("userOrder", JSON.stringify(itemStored));
        if (itemStored.length === 0) {
            localStorage.clear();
        }

        alert("Ce Kanap vient d'être supprimé de votre panier");
        window.location.reload();
    });
}
// Affiche un article
// Displays an article
function displayArticle(itemStored, k) {
    const cartItems = document.createElement("article");
    cartItems.dataset.id = itemStored[k].id;
    cartItems.dataset.colors = itemStored[k].colors;
    cartItems.classList.add("cart__item");
    const cartDisplay = document.querySelector("#cart__items");
    cartDisplay.appendChild(cartItems);
    return cartItems;
}
// Affiche une image
// Displays an image
function displayImg(cartItems, kanapData) {
    const divImg = document.createElement("div");
    divImg.classList.add("cart__item__img");
    cartItems.appendChild(divImg);
    const img = document.createElement("img");
    img.src = kanapData.imageUrl;
    img.alt = kanapData.altTxt;
    divImg.appendChild(img);
}
// crée une div
// Displays a div
function displayDivDescriptContent(cartItems) {
    const divContent = document.createElement("div");
    cartItems.appendChild(divContent);
    divContent.classList.add("cart__item__content");
    const divDescript = document.createElement("div");
    divContent.appendChild(divDescript);
    divDescript.classList.add("cart__item__content__description");
    return { divDescript, divContent };
}
// Affiche le nom du produit la couleur et le prix
// Displays the product name, color and price
function displayNameColorsPrice(kanapData, divDescript, itemStored, k) {
    const Kname = document.createElement("h2");
    Kname.textContent = kanapData.name;
    divDescript.appendChild(Kname);

    const descr = document.createElement("p");
    descr.textContent = itemStored[k].colors;
    divDescript.appendChild(descr);

    const price = document.createElement("p");
    price.textContent = kanapData.price + " €";
    divDescript.appendChild(price);
}
// Crée une div et un paragraphe qui affiche la quantité
// Displays a div and a paragraph which displays the quantity
function displayDivQuantityP(divContent) {
    const divContentSettings = document.createElement("div");
    divContent.appendChild(divContentSettings);
    divContentSettings.classList.add("cart__item__content__settings");

    const divSettingsQuantity = document.createElement("div");
    divContentSettings.appendChild(divSettingsQuantity);
    divSettingsQuantity.classList.add("cart__item__content__settings__quantity");

    const quantity = document.createElement("p");
    quantity.textContent = "Qté :";
    divSettingsQuantity.appendChild(quantity);
    return { divSettingsQuantity, divContentSettings };
}
// Crée une input qui permet de modifier la quantité
// Displays an input which allows to modify the quantity
function displayInputAndSelect(divSettingsQuantity, itemStored, k) {
    const quantityChoice = document.createElement("input");
    divSettingsQuantity.appendChild(quantityChoice);
    quantityChoice.classList.add("itemQuantity");
    quantityChoice.name = "itemQuantity";
    quantityChoice.type = "number";
    quantityChoice.min = "1";
    quantityChoice.max = "100";
    quantityChoice.value = itemStored[k].quantity;
    quantityChoice.addEventListener("change", () => selectUrQuantity());

    // Enregristre la quantité choisie et recalcule le prix total ainsi que le nombre de produit total
    // Saves the selected quantity and recalculates the total price and the total number of products
    function selectUrQuantity() {

        if (quantityChoice.value > 100) {
            alert("Vous ne pouvez pas acheter plus de 100 Kanaps");
            quantityChoice.value = 100;
        }
        else if (quantityChoice.value < 1) {
            alert("Vous ne pouvez pas acheter moins de 1 Kanap");
            quantityChoice.value = 1;
        }

        itemStored[k].quantity = Number(quantityChoice.value);
        localStorage.setItem("userOrder", JSON.stringify(itemStored));

        totalQuantity(itemStored);
        totalPrice(itemStored, kanaps);
    }
}
// Crée une div et un paragraphe pour le bouton supprimer
// Displays a div and a paragraph for the delete button
function displayDivBtnDelete(divContentSettings) {
    const divSettingsDelete = document.createElement("div");
    divContentSettings.appendChild(divSettingsDelete);
    divSettingsDelete.classList.add("cart__item__content__settings__delete");

    const deleteItem = document.createElement("p");
    deleteItem.textContent = "Supprimer";
    divSettingsDelete.appendChild(deleteItem);
    deleteItem.classList.add("deleteItem");
}

// Crée les articles dans le DOM et les affichages
// Create the articles in the DOM and displays them
function cart(itemStored, k, kanapData) {

    const cartItems = displayArticle(itemStored, k);

    displayImg(cartItems, kanapData);

    const { divDescript, divContent } = displayDivDescriptContent(cartItems);

    displayNameColorsPrice(kanapData, divDescript, itemStored, k);

    const { divSettingsQuantity, divContentSettings } = displayDivQuantityP(divContent);

    displayInputAndSelect(divSettingsQuantity, itemStored, k);

    displayDivBtnDelete(divContentSettings);
}

///////Order form ///////////////

const orderBtn = document.querySelector("#order");
orderBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (localStorage.length === 0) {
        alert("Votre panier est vide");
        return;
    }

    if (formController()) return;
    if (emailController()) return;


    const user = userData();

    fetch("http://localhost:3000/api/products/order", {
        method: "POST",// sert à définir la méthode d'envoi de la requête
        headers: {
            Accept: "application/json",//sert à dire que le serveur va recevoir du json
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),//sert à envoyer les données au serveur


    })
        .then((response) => response.json())
        .then((data) => {// récupère l'id de la commande 
            const orderId = data.orderId;

            alert("Votre commande a bien été prise en compte, vous allez être redirigé vers la page de confirmation, KANAP vous remercie ");
            localStorage.clear();

            window.location.href = "confirmation.html" + "?orderId=" + orderId;//redirige vers la page de confirmation avec l'id de la commande

        });


});
// Récupère les données du formulaire et les saugarde dans un data
// Gets the data from the form and saves it in a data
function userData() {

    const form = document.querySelector(".cart__order__form");
    const firstName = form.elements.firstName.value;
    const lastName = form.elements.lastName.value;
    const address = form.elements.address.value;
    const city = form.elements.city.value;
    const email = form.elements.email.value;

    const data = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
        },

        products: getKanapId(),

    }
    return data;//retourne les données du formulaire
}

// Controle le formulaire
// Controlls the form
function formController() {

    const form = document.querySelector(".cart__order__form");
    const inputs = form.querySelectorAll("input");
    let error = false;
    inputs.forEach((input) => {
        if (input.value === "") {
            input.classList.add("error");
            input.nextElementSibling.textContent = "Ce champ est obligatoire";
            error = true;
        }
        if (address.value.length < 5) {
            input.classList.add("error");
            address.nextElementSibling.textContent = "Ce champ est obligatoire et votre adresse doit contenir au moins 5 caractères";
            error = true;
        }
        
        if (input.name === "firstName" || input.name === "lastName") {
            if (!/^[a-zA-Z]+$/.test(input.value)) {
                input.classList.add("error");
                input.nextElementSibling.textContent = "Ce champ est obligatoire et ne peut contenir que des lettres";
                error = true;
            }
        }

        else {

            input.classList.remove("error");
            // input.nextElementSibling.textContent = "";

        }
    });
    return error;
}
// Controle le formulaire email
// Controlls the form email
function emailController() {

    const form = document.querySelector(".cart__order__form");
    const email = form.elements.email.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    let error = false;
    if (!emailRegex.test(email)) {
        form.elements.email.classList.add("error");
        form.elements.email.nextElementSibling.textContent =
            "Veuillez entrer un email valide";
        error = true;
    } else {
        form.elements.email.classList.remove("error");
        form.elements.email.nextElementSibling.textContent = "";
    }
    return error;
}
// Récupère les id des "kanap" dans le localStorage et les retourne dans un tableau [KanapId]
// Gets the id of the "kanap" in the localStorage and returns it in an array [KanapId]
function getKanapId() {
    const itemStored = JSON.parse(localStorage.getItem("userOrder"));
    const kanapId = [];
    for (let i = 0; i < itemStored.length; i++) {
        kanapId.push(itemStored[i].id);//récupère l'id de chaque produit
    }
    console.log(kanapId);
    return kanapId;
}

