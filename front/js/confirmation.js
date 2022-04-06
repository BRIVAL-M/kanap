 
const queriesString = window.location.search;
const urlObjet = new URLSearchParams(queriesString);
const orderId = urlObjet.get('orderId');
console.log(orderId);


const displayId = document.querySelector("#orderId");
displayId.style.display = "block";
//displayId.style.textAlign = "center";
displayId.style.marginTop = "10px";
displayId.style.fontWeight = "bold";
displayId.style.color = "#3498DB"
displayId.textContent = orderId;
/////////////////////////////////////////////////////////////////
blink(displayId); // a delete juste pour le fun

function blink(displayId) { 

	if (displayId.style.visibility == "visible" ) 

	{ displayId.style.visibility = "hidden"; } 
    

	else 

	{ displayId.style.visibility = "visible"; } 
    

}

	setInterval("blink(displayId)",500); 


    
