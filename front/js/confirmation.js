// Récupère l'id dans l'url et l'affiche dans le DOM
// Retrieves the id in the url and displays it in the DOM
function confirmation() {
	const queriesString = window.location.search;
	const urlObjet = new URLSearchParams(queriesString);
	const orderId = urlObjet.get('orderId');
	const displayId = document.querySelector("#orderId");

	displayId.style.display = "block";
	displayId.style.marginTop = "10px";
	displayId.style.fontWeight = "bold";
	displayId.style.color = "#3498DB";
	displayId.textContent = orderId;
	return displayId;
}

confirmation()



