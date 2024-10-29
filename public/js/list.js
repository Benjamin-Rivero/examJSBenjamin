import { productMap } from './models.js';
function addProductsToPage() {
	const divProducts = document.querySelector('.products');

	productMap.forEach((value, key) => {
		const divProduct = document.createElement('div');
		divProduct.className = 'product';
		divProduct.innerHTML = `<a class="product-card" href="/detail/${key}"><div class="card">
			<img src="/public/${value.image}" class="card-img-top" alt="Photo de l'appareil">
			<div class="card-body">
				<h5 class="card-title">${value.nom_produit}</h5>
				<p class="card-text">${value.description}</p>
				
			</div>
			<div class="card-footer d-flex"><p>${value.prix}</p></div>
	  	</div></a>`;
		divProducts.appendChild(divProduct);
	});
}

addProductsToPage();
