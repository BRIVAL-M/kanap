
fetch("http://localhost:3000/api/products")
  .then(firstRes => firstRes.json())
  .then((kanapData) => {
    console.log(kanapData)

    let itemStored = JSON.parse(localStorage.getItem("userOrder"));
    console.log(itemStored)

    if (itemStored === null) {

      emptyMsg();// si le panier est vide affiche le message
    }

    for (let k = 0; k < itemStored.length; k++) {

      const myKanap = kanapData.find(_item => _item._id == itemStored[k].id)


      if (myKanap) {

        cart(itemStored, k, myKanap);
        totalQuantity(itemStored);
        totalPrice(itemStored, kanapData)
        deleteProduct(itemStored, k);
      }
    }


  })

function emptyMsg() {
  const emptyBasket = document.createElement("h2");
  emptyBasket.textContent = " Votre panier est vide, n'hésitez pas à consulter notre site afin de trouver le KANAP de vos rêves !";
  emptyBasket.style.textAlign = "center";

  const emptyPlace = document.querySelector("#cart__items");
  emptyPlace.appendChild(emptyBasket);
}



// calcul le nombre de produit total dans le panier
function totalQuantity(itemStored) { // <<<<<<<<<<<<<<<<<<<<<<< ca marche (sans le input) !
  let totalQuantity = 0;
  for (let i = 0; i < itemStored.length; i++) {
    totalQuantity += itemStored[i].quantity;
  }
  const total = document.querySelector("#totalQuantity");
  total.textContent = totalQuantity;
}

//fonction pour calculer le prix total du panier
function totalPrice(itemStored, kanapData) {

  let totalPrice = 0;
  for (let i = 0; i < itemStored.length; i++) {
    const myKanap = kanapData.find(_item => _item._id === itemStored[i].id)
    totalPrice += myKanap.price * itemStored[i].quantity;
  }
  const total = document.querySelector("#totalPrice");
  total.textContent = totalPrice;
}




//fonction pour Supprimer un produit du panier
function deleteProduct(itemStored, k) {
  const deleteBtn = document.querySelectorAll(".deleteItem");
  deleteBtn[k].addEventListener("click", () => {
    itemStored.splice(k, 1);// on delete 1 produit de la liste a l'index k
    localStorage.setItem("userOrder", JSON.stringify(itemStored));

    // si le itemStored est vide affiche le message  emptyMsg()
    /*if (itemStored.length === 0) { // <<<<< ne fonctionne pas :/
      emptyMsg();
    }*/
    alert("Ce Kanap vient d'être supprimé de votre panier");
    window.location.reload();
  });
}

function cart(itemStored, k, kanapData) {

  const cartItems = displayArticle();

  displayImg();

  const { divDescript, divContent } = displayDivContent();

  displayDescription();

  const divContentSettings = displayDivSetting();

  const divSettingsQuantity = displayDivQuantity();

  const quantity = displayQuantity();

  input();

  const divSettingsDelete = displayDivDelete();

  deleteBtn();

  function deleteBtn() {
    const deleteItem = document.createElement("p");
    deleteItem.textContent = "Supprimer";
    divSettingsDelete.appendChild(deleteItem);
    deleteItem.classList.add("deleteItem");
  }

  function displayDivDelete() {
    const divSettingsDelete = document.createElement("div");
    divContentSettings.appendChild(divSettingsDelete);
    divSettingsDelete.classList.add("cart__item__content__settings__delete");
    return divSettingsDelete;
  }

  function input() {
    const quantityChoice = document.createElement("input");
    quantityChoice.style.marginLeft = "10px";
    quantity.appendChild(quantityChoice);
    quantityChoice.classList.add("itemQuantity");
    quantityChoice.name = "itemQuantity";
    quantityChoice.type = "number";
    quantityChoice.min = "1";
    quantityChoice.max = "100";
    quantityChoice.value = itemStored[k].quantity;
    




    quantityChoice.addEventListener("change", () => {

      itemStored[k].quantity = quantityChoice.value;
      localStorage.setItem("userOrder", JSON.stringify(itemStored));
      // totalQuantity(itemStored);
      // totalPrice(itemStored, kanapData);
      window.location.reload();
    });
  }

  function displayQuantity() {
    const quantity = document.createElement("p");
    quantity.textContent = "Qté :";
    divSettingsQuantity.appendChild(quantity);
    return quantity;
  }

  function displayDivQuantity() {
    const divSettingsQuantity = document.createElement("div");
    divContentSettings.appendChild(divSettingsQuantity);
    divSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    return divSettingsQuantity;
  }

  function displayDivSetting() {
    const divContentSettings = document.createElement("div");
    divContent.appendChild(divContentSettings);
    divContentSettings.classList.add("cart__item__content__settings");
    return divContentSettings;
  }

  function displayDescription() {
    const Kname = document.createElement("h2");
    Kname.textContent = kanapData.name;
    divDescript.appendChild(Kname);

    const descr = document.createElement("p");
    descr.textContent = itemStored[k].colors;
    divDescript.appendChild(descr);

    const price = document.createElement("p");
    price.textContent = itemStored[k].quantity * kanapData.price + " €";
    divDescript.appendChild(price);
  }

  function displayDivContent() {
    const divContent = document.createElement("div");
    cartItems.appendChild(divContent);
    divContent.classList.add("cart__item__content");
    const divDescript = document.createElement("div");
    divContent.appendChild(divDescript);
    divDescript.classList.add("cart__item__content__description");
    return { divDescript, divContent };
  }

  function displayImg() {
    const divImg = document.createElement("div");
    divImg.classList.add("cart__item__img");
    cartItems.appendChild(divImg);
    const img = document.createElement("img");
    img.src = kanapData.imageUrl;
    img.alt = kanapData.altTxt;
    divImg.appendChild(img);
  }

  function displayArticle() {
    const cartItems = document.createElement("article");
    cartItems.dataset.id = itemStored[k].id;
    cartItems.dataset.colors = itemStored[k].colors;
    cartItems.classList.add("cart__item");
    const cartDisplay = document.querySelector("#cart__items");
    cartDisplay.appendChild(cartItems);
    return cartItems;
  }
}

///////formulaire de commande ///////////////

const orderBtn = document.querySelector("#order");
orderBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (localStorage.length === 0) {
    alert("Votre panier est vide");
    return;
  }

  if (formController()) return;
  if (emailController()) return;

  const form = document.querySelector(".cart__order__form");
  const user = userData();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),


  })
    .then((response) => response.json())
    .then((data) => {
      const orderId = data.orderId;
      console.log(data);
      alert("Votre commande a bien été prise en compte");
      localStorage.clear();

      window.location.href = "confirmation.html" + "?orderId=" + orderId;
    });

  console.log(form.elements);
});

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
  return data;

}
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

    else {

      input.classList.remove("error");
      // input.nextElementSibling.textContent = "";// Ne fonctionne pas

    }
  });
  return error;
}

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

function getKanapId() {
  const itemStored = JSON.parse(localStorage.getItem("userOrder"));
  const kanapId = [];
  for (let i = 0; i < itemStored.length; i++) {
    kanapId.push(itemStored[i].id);
  }
  return kanapId;
}

