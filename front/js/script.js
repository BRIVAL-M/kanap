


/*altTxt: "Photo d'un canapé bleu, deux places"
colors: (3) ['Blue', 'White', 'Black']
description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
imageUrl: "http://localhost:3000/images/kanap01.jpeg"
name: "Kanap Sinopé"
price: 1849
_id: "107fb5b75607497b96722bda5b504926"*/


fetch("http://localhost:3000/api/products")
    .then(firstRes => firstRes.json())
    .then(kanapData => console.table(kanapData))

////////////////////////////////////////////////////////////////////////////



/*fetch("http://localhost:3000/api/products")
    .then(firstRes => firstRes.json())
    .then((kanapData) => {
        const id = kanapData._id;
        //const id = kanapData[0]._id;

        const link = document.createElement("a");
        link.href = "./product.html?id=" + id;
        //link.text ="link"

        const card = document.createElement("article");
        card.appendChild(link);

        const kanapImg = document.createElement("img");

        kanapImg.src = "http://localhost:3000/images/kanap01.jpeg";
        kanapImg.alt = "Photo d'un canapé bleu, deux places";

        kanapImg.appendChild(card);


        const items = document.querySelector("#items");
        items.appendChild(link);
        link.appendChild(card);
        card.appendChild(kanapImg);

    })*/



/*function image (imageUrl, altTxt) {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = altTxt;
    return image;
}
    function cards() {
        const articles = document.createElement("article");
        const imgs = image();
        const titles = title();
        articles.appendChild(link)
       
   }*/

/*fetch("http://localhost:3000/api/products")
    .then(firstRes => firstRes.json())
    .then((kanapData) => {
        const id = kanapData._id;


        const link = document.createElement("a");
        link.href = "./product.html?id=" + id;


        const card = document.createElement("article");
        card.appendChild(link);

        const kanapImg = document.createElement("img");
        kanapImg.src = kanapData[0].imageUrl;

        kanapImg.alt = kanapData[0].altTxt;
        kanapImg.appendChild(card);


        const titleCard = document.createElement("h3");
        titleCard.classList.add('productName');
        titleCard.innerHTML = kanapData[0].name;
        titleCard.appendChild(card);
       
      
        

        const descriptCard = document.createElement("p");
        descriptCard.classList.add('productDescription');
        descriptCard.innerHTML = kanapData[0].description;
        descriptCard.appendChild(card);



        const items = document.querySelector("#items");
        items.appendChild(link);
        link.appendChild(card);
        card.appendChild(kanapImg);
        card.appendChild(titleCard);
        card.appendChild(descriptCard);

    })*/

fetch("http://localhost:3000/api/products")
    .then(firstRes => firstRes.json())
    .then((kanapData) => {
    

        kanapData.forEach((cards) => {

            newFunction(cards);

        })
      
}).catch(() => {
    newFunction_1();
})




function newFunction_1() {
    const error = document.createElement("p");
    error.textContent = " OUPS ! Une erreur est survenue, veuillez réessayer ultérieurement. Si le problème persiste contactez-nous par téléphone au : 01 23 45 67 89 ou par mail : support@name.com ";
    error.style.textAlign = "center";

    const oups = document.querySelector("#items");
    oups.appendChild(error);
}

function newFunction(cards) {
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

