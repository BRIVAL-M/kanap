const idLocations = window.location.search;
// recupère la chaîne de requête soit l'id unique des kanaps 
// ex: ?id=055743915a544fde83cfdfc904935ee7
const urlObjet = new URLSearchParams(idLocations);
// Le URLSearchParams()constructeur crée et retourne un nouvel URLSearchParamsobjet.
const id = urlObjet.get('id');
// rècupère URLSearchParamsobjet dans id

console.table({ id }) //<------------------ A DELETE

//////////////////////////////////juste pour moi///////////////////////////

fetch(`http://localhost:3000/api/products/${id}`)//<------------------ A DELETE
    .then(res => res.json())
    .then(response => console.table(response))

//////////////////////////////////////////////////////////////////////////


function kanapImg(imageUrl, altTxt) {

    const kanapImg = document.createElement("img");
    kanapImg.src = imageUrl;
    kanapImg.alt = altTxt;

    const imgSpot = document.querySelector(".item__img");
    imgSpot.appendChild(kanapImg);
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


fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then((res) => kanaps(res))

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

    if (colors == null || colors == "" || quantity == null || quantity == 0 || quantity == "") {// revoir les if color & quantity + (max100)
        alert("Pourriez-vous nous indiquer la couleur et le nombre de Kanaps que vous souhaitez commander s'il vous plaît 🙏")// si rien n'est sélectionné message 
        
        return // il stop

    }

    //////////////////////////// localStorage /////////////////////////////////////

    const addKanaps = () => { //"addKanaps" va reprendre les données de kanapData et les transformer en chaine json
       
        itemStored.push(kanapData);
        localStorage.setItem("userOrder", JSON.stringify(itemStored))
       //localStorage.setItem(id, JSON.stringify(itemsStorage));;// Pour les enregistrer dans le localStorage avec la clef "kanapOrderData" <--------------------A REMETTRE AU CAS OU 
    }

    let kanapData = { id, colors, quantity };// "kanapData" contient les données des Kanaps
  
let itemStored = JSON.parse(localStorage.getItem("userOrder"));
   //let itemsStorage = JSON.parse(localStorage.getItem(id));// récupère les données de "kanapOrderData" en objet JS <--------------------A REMETTRE AU CAS OU
 
    
    if (itemStored) {// Si il y a déjà des items dans le localStorage
        // changer ici pour incrémenter quantité
       
        
        addKanaps()



        
        console.log(itemStored)// <--------------- A delete
    }

    else {

        itemStored = [];

        addKanaps()
       
    }
})