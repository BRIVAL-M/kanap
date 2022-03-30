

     /*fetch("http://localhost:3000/api/products")
    .then(firstRes => firstRes.json())
    .then((kanapData) => {
        console.log(kanapData)

        let itemStored  = JSON.parse(localStorage.getItem("userOrder"));
        console.log(itemStored)
        //loop items from localStorage
        for (let k = 0; k < itemStored.length; k++) {
            //match itemsStorage with kanapData 
    
        //if itemsStorage[k] == kanapData[k].id     
          
       
       // console.log(itemsStorage[k])

        //make cart with kanapData id of itemsStorage

        kanapData.find(_item => _item.id == itemStored[k]) 
          let { _id, imageUrl, altTxt, name, description }=kanapData
      //trouvera l'id du produit dans le tableau kanapData
      

        

        cart (k,kanapData,itemStored)
    }
  
    function cart (k, kanapData,itemStored) {
        
        
        const cartItems = document.createElement("article");
       
        cartItems.dataset.id = 
       cartItems.dataset.id = itemStored[k].id; 
      cartItems.dataset.colors = itemStored[k].colors;
        cartItems.classList.add("cart__item")

  const cartPlace = document.querySelector("#cart__items");

  cartPlace.appendChild(cartItems);

  const divImg = document.createElement("div");
 divImg.classList.add("cart__item__img")

  cartItems.appendChild(divImg);

  const img = document.createElement("img");
 img.src = kanapData[k].imageUrl;
divImg.appendChild(img);

  const divContent = document.createElement("div");
  cartItems.appendChild(divContent);
  divContent.classList.add("cart__item__content")

  const divDescript = document.createElement("div");
  divContent.appendChild(divDescript);
  divDescript.classList.add("cart__item__descript")

  const name = document.createElement("h2");
  name.innerHTML = kanapData[k].name;
  divDescript.appendChild(name);

  const description = document.createElement("p")
  description.innerHTML = kanapData[k].description;
  divDescript.appendChild(description);

  const price = document.createElement("p");
  price.innerHTML = kanapData[k].price; 
  divDescript.appendChild(price);

  const divContentSettings = document.createElement("div")
  cartItems.appendChild(divContentSettings);
    divContentSettings.classList.add("cart__item__settings")

  const divSettingsQuantity = document.createElement("div");
  divContentSettings.appendChild(divSettingsQuantity);
    divSettingsQuantity.classList.add("cart__item__settings__quantity")

  const quantity = document.createElement("p");
  quantity.innerHTML = "Quantity"
  divSettingsQuantity.appendChild(quantity);

  const quantityChoice = document.createElement("input");
  divSettingsQuantity.appendChild(quantityChoice);
 // quantityChoice.value = 1;

  const divSettingsDelete = document.createElement("div");
  cartItems.appendChild(divSettingsDelete);

  const deleteItem = document.createElement("p");
  deleteItem.innerHTML = "Supprimer"
  divSettingsDelete.appendChild(deleteItem);
  deleteItem.classList.add("cart__item__settings__delete")

    } 
    })*/


/*
fetch("http://localhost:3000/api/products")
.then(firstRes => firstRes.json())
.then((kanapData) => {
   //récupérer tout les element de kanapData
    //console.log(kanapData)
    //récupérer tout les element de localStorage
    let itemStored  = JSON.parse(localStorage.getItem("userOrder"));
    console.log(itemStored)
    //loop items from localStorage
    for (let k = 0; k < itemStored.length; k++) {
       //match itemsStorage id with kanapData _id
        kanapData.find(_item => _item._id == itemStored[k].id)
        

        cart.push(kanapData)
       
        let { _id, imageUrl, altTxt, name, description, colors }=kanapData
        // id de itemsStorage == kanapData _id crée un article avec les données de kanapData
        //créer un article
       
        

        cart ()



        
    }

})

function cart (){
    const cartItems = document.createElement("article");
    cartItems.dataset.id = itemStored[k].id; 
    cartItems.dataset.colors = itemStored[k].colors;
    cartItems.classList.add("cart__item")

    const cartPlace = document.querySelector("#cart__items");

    cartPlace.appendChild(cartItems);

    const divImg = document.createElement("div");
    divImg.classList.add("cart__item__img")

    cartItems.appendChild(divImg);

    const img = document.createElement("img");
    img.src = kanapData[k].imageUrl;
    divImg.appendChild(img);

    const divContent = document.createElement("div");
    cartItems.appendChild(divContent);
    divContent.classList.add("cart__item__content")

    const divDescript = document.createElement("div");
    divContent.appendChild(divDescript);
    divDescript.classList.add("cart__item__descript")

    const name = document.createElement("h2");
    name.innerHTML = kanapData[k].name;
    divDescript.appendChild(name);

    const description = document.createElement("p")
    description.innerHTML = kanapData[k].description;
    divDescript.appendChild(description);

    const price = document.createElement("p");
    price.innerHTML = kanapData[k].price; 
    divDescript.appendChild(price);

    const divContentSettings = document.createElement("div")
    cartItems.appendChild(divContentSettings);
      divContentSettings.classList.add("cart__item__settings")

    const divSettingsQuantity = document.createElement("div");
    divContentSettings.appendChild(divSettingsQuantity);
      divSettingsQuantity.classList.add("cart__item__settings__quantity")

    const quantity = document.createElement("p");
    quantity.innerHTML = "Quantity"
    divSettingsQuantity.appendChild(quantity)
}*/

/**  Mickael doit récupérer tous les produits par la requête fetch 
 * comme la page d'accueil et avec le tableau stocké sur le localStorage, 
 * il doit boucler et récupérer l'id pour trouver le bon id sur le tableau 
 * obtenu par la requête fetch et le construire dans le html.*/

fetch("http://localhost:3000/api/products")
.then(firstRes => firstRes.json())
.then((kanapData) => {
let itemStored  = JSON.parse(localStorage.getItem("userOrder"));

for (let k = 0; k < itemStored.length; k++) {

  kanapData.find(_item => _item._id == itemStored[k].id)
 
  
 

  newFunction(itemStored, k, kanapData);
  

}

})
function newFunction(itemStored, k, kanapData) {

  const cartItems = document.createElement("article");
  cartItems.dataset.id = itemStored[k].id;
  cartItems.dataset.colors = itemStored[k].colors;
  cartItems.classList.add("cart__item");
  const cartDisplay = document.querySelector("#cart__items");
  cartDisplay.appendChild(cartItems);

  const divImg = document.createElement("div");
  divImg.classList.add("cart__item__img");
  cartItems.appendChild(divImg);

  const img = document.createElement("img");
  img.src = kanapData[k].imageUrl;
  divImg.appendChild(img);

  const divContent = document.createElement("div");
  cartItems.appendChild(divContent);
  divContent.classList.add("cart__item__content");

  const divDescript = document.createElement("div");
  divContent.appendChild(divDescript);
  divDescript.classList.add("cart__item__content__description");

  const Kname = document.createElement("h2");
  Kname.innerHTML = kanapData[k].name;
  divDescript.appendChild(Kname);

  const descr = document.createElement("p");
  descr.innerHTML = kanapData[k].colors;
  divDescript.appendChild(descr);

  const price = document.createElement("p");
  price.innerHTML = kanapData[k].price  + " €";
  divDescript.appendChild(price);


  const divContentSettings = document.createElement("div");
  divDescript.appendChild(divContentSettings);
  divContentSettings.classList.add("cart__item__settings");

  const divSettingsQuantity = document.createElement("div");
  divContentSettings.appendChild(divSettingsQuantity);
  divSettingsQuantity.classList.add("cart__item__settings__quantity");

  const quantity = document.createElement("p");
  quantity.innerHTML = "Quantity";
  divSettingsQuantity.appendChild(quantity);


  const quantityChoice = document.createElement("input");
  divSettingsQuantity.appendChild(quantityChoice);

  const divSettingsDelete = document.createElement("div");
  divDescript.appendChild(divSettingsDelete);
  divSettingsDelete.classList.add("cart__item__settings__delete");

  const deleteItem = document.createElement("p");
  deleteItem.innerHTML = "Supprimer";
  divSettingsDelete.appendChild(deleteItem);
}

////////////FORM////////////////////////////////


/*const orderBtn = document.querySelector("#order");
orderBtn.addEventListener("click", (e) => subForm(e));

function subForm (e){
 e.preventDefault();
 if (itemStored.length === 0) alert ("merci de remplir les champs suivants : ")
 const form = document.querySelector(".cart__order__form");
 
 console.log(form.elements);
 console.log(form);
 
}*/