import { productMap } from './models.js';
const curPage = document.URL.split('/').reverse()[0];
const product = productMap.get(~~curPage);
function addProductInfo() {
	const divProduct = document.querySelector('.product');
	divProduct.innerHTML =
		`<div class="row">` +
		`<div class="d-flex gap-1">
			<a href="/list" class="btn btn-secondary"><i class="fa-solid fa-right-to-bracket"></i></a>
			<h1 class="h-fit">${product.nom_produit}</h1>
		</div>` +
		`<span>${product.prix}</span>` +
		`<p>${product.description}</p>` +
		`<h2>Caractéristiques : </h2> <br>` +
		`<p><span class="label">Résolution :</span> ${product.caracteristics.resolution}</p>` +
		(product.caracteristics.zoom
			? `<p><span class="label">Zoom :</span> ${product.caracteristics.zoom}</p>`
			: '') +
		`<p><span class="label">Écran :</span> ${product.caracteristics.ecran}</p>` +
		`<p><span class="label">Connectivité :</span> ${product.caracteristics.connectivite}</p>` +
		(product.caracteristics.impression
			? `<p><span class="label">Impression :</span> ${product.caracteristics.impression}</p>`
			: '') +
		`<img class="product-img h-50" src="/public/${product.image}">` +
		`</div>`;
	document.querySelector('.ajoutPanier').addEventListener('click', function () {
		ajouterAuPanier(product);
	});
}
document.querySelector('title').textContent = product.nom_produit;
function ajouterAuPanier(product) {
	// Récupérer le panier existant depuis le localStorage
	let panier = JSON.parse(localStorage.getItem('panier')) || [];

	// Vérifier si le produit existe déjà dans le panier
	const produit = panier.find((item) => item.nom === product.nom_produit);

	if (produit) {
		// Si le produit existe déjà, augmenter la quantité
		produit.quantite += 1;
	} else {
		// Si le produit n'existe pas, l'ajouter avec une quantité de 1
		panier.push({
			nom: product.nom_produit,
			prix: product.prix,
			quantite: 1,
		});
	}

	// Stocker le panier mis à jour dans le localStorage
	localStorage.setItem('panier', JSON.stringify(panier));

	// Optionnel : Afficher une confirmation
	alert('Produit ajouté au panier !');
}

addProductInfo();
