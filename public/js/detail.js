import { productMap } from './models.js';

function addProductInfo() {
	console.log(productMap);
	const product = productMap.get(0);
	console.log(product);
	const divProduct = document.querySelector('.product');
	const title = document.createElement('h1');
	title.textContent = product.nom_produit;
	divProduct.appendChild(title);
}

addProductInfo();
