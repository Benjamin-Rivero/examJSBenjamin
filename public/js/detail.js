import { productMap } from './models.js';
const curPage = document.URL.split('/').reverse()[0];
const product = productMap.get(~~curPage);
function addProductInfo() {
	const divProduct = document.querySelector('.product');
	divProduct.innerHTML =
		`<div class="row">` +
		`<div class="d-flex gap-1">
			<a href="/" class="btn btn-secondary"><i class="fa-solid fa-right-to-bracket"></i></a>
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
		addToCart(product);
	});
}
document.querySelector('title').textContent = product.nom_produit;
function addToCart(product) {
	let panier = JSON.parse(localStorage.getItem('panier')) || [];

	const produit = panier.find((item) => item.nom === product.nom_produit);

	if (produit) {
		produit.quantite += 1;
	} else {
		panier.push({
			nom: product.nom_produit,
			prix: product.prix,
			quantite: 1,
		});
	}

	localStorage.setItem('panier', JSON.stringify(panier));

	alert('Produit ajouté au panier !');
}

addProductInfo();
