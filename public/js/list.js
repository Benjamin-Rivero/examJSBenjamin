import { productMap } from './models.js';
function addProductsToPage() {
	console.log(productMap);
	const divProducts = document.querySelector('.products');

	productMap.forEach((value, key) => {
		const divProduct = document.createElement('div');
		divProduct.className = 'product';
		divProduct.innerHTML =
			'<a href="/detail/' + value.id + '" >Lien' + value.id + '</a>';
		divProducts.appendChild(divProduct);
	});
}

addProductsToPage();
