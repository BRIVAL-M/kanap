const idLocations = window.location.search;//
// recupère la chaîne de requête soit l'id unique des kanaps 
// ex: ?id=055743915a544fde83cfdfc904935ee7
const urlObjet = new URLSearchParams(idLocations);
// Le URLSearchParams()constructeur crée et retourne un nouvel URLSearchParamsobjet.
const id = urlObjet.get('id');
// récupère URLSearchParamsobjet dans id

console.table({ id }) //<------------------ A DELETE

//////////////////////////////////juste pour moi///////////////////////////

// fetch(`http://localhost:3000/api/products/${id}`)
//     .then(res => res.json())
//     .then(response => console.table(response))

//////////////////////////////////////////////////////////////////////////


function kanapImg(imageUrl, altTxt) {

    const kanapImg = document.createElement("img");
    kanapImg.src = imageUrl;
    kanapImg.alt = altTxt;

    const imgDisplay = document.querySelector(".item__img");
    imgDisplay.appendChild(kanapImg);
}

function kanapName(name) {

    const kanapName = document.querySelector("#title");
    kanapName.textContent = name;
}

function kanapPrice(price) {

    const kanapPrice = document.querySelector("#price");
    kanapPrice.textContent = price;
}

function kanapDescript(description) {

    const kanapDescript = document.querySelector("#description");
    kanapDescript.textContent = description;
}

function kanapColor(colors) {

    const choice = document.querySelector("#colors");

    colors.forEach((choices) => {

        const option = document.createElement("option");
        option.value = choices;
        option.textContent = choices;
        choice.appendChild(option);

        console.log(option); // <----------------------------- A delete
    })
}
function displayError() {
    const error = document.createElement("p");
    error.textContent = " OUPS ! Une erreur est survenue, veuillez réessayer ultérieurement. Si le problème persiste contactez-nous par téléphone au : 01 23 45 67 89 ou par mail : support@name.com ";
    error.style.textAlign = "center";
    const oups = document.querySelector(".item__img");
    oups.appendChild(error);
}


fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then((res) => kanaps(res))
   
    .catch(() => {
        displayError();
 })
  
function kanaps(productPage) {

    const { imageUrl, altTxt, name, price, description, colors } = productPage;

    kanapImg(imageUrl, altTxt)
    kanapName(name)
    kanapPrice(price)
    kanapDescript(description)
    kanapColor(colors)
   
   
}






///////////////////////BUTTON//////////////////////////

const button = document.getElementById('addToCart')// je selectionne le button dans le DOM

button.addEventListener("click", () => {// je lui demande d'écouter l'event au clic
    
    const colors = document.querySelector("#colors").value;// ici je lui demande la couleur et la quantité sélectionné
    const quantity = document.querySelector("#quantity").value;
    
    console.log(colors, quantity);// <------ A delete
    //si la couleur et id sont egale on increment la quantité
    
  
    
   
        
   

    if (colors == null || colors == "" || quantity == null || quantity == "" ||quantity > 100 || quantity < 1) {
        alert("Pourriez-vous nous indiquer une couleur et une quantité entre 1 et 100 pour poursuivre votre commande s'il vous plaît 🙏")
        // si rien n'est sélectionné message 
        return // il stop
       
        
}

    



    //////////////////////////// localStorage /////////////////////////////////////

    const addKanaps = () => { 
     
        
            const findKanap = itemStored.find(item => item.id === kanapData.id && item.colors === kanapData.colors);
            // ici je vérifie si le produit est déjà dans le panier


           if (findKanap) {
            
                findKanap.quantity = Number(findKanap.quantity);
                findKanap.quantity = +quantity;//
            } else {
                itemStored.push(kanapData);
            }
            localStorage.setItem("userOrder", JSON.stringify(itemStored))
        
        }
  
      let kanapData = { 
          id :id, 
          colors :colors, 
          quantity :Number(quantity), 
        };// "kanapData" contient les données des Kanaps
    
  let itemStored = JSON.parse(localStorage.getItem("userOrder"));
  // récupère les données de "kanapOrderData" en objet JS 
  //const add = addQuantity();
      
      if (itemStored) {// Si il y a déjà des items dans le localStorage
          
          
         
          addKanaps();
  

  
          
          console.log(itemStored)// <--------------- A delete
      }
  
      else {
  
          itemStored = [];
  
          addKanaps()
         
      }
  })
  
  
  


