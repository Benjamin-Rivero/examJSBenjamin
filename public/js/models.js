class Product {
	id;
	nom_produit;
	prix;
	description;
	image;

	constructor(id, nom_produit, prix, description, image) {
		this.id = id;
		this.nom_produit = nom_produit;
		this.prix = prix;
		this.description = description;
		this.image = image;
	}
}

class Caracteristics {
	resolution;
	zoom;
	connectivite;
	ecran;
	impression;

	constructor() {}
}

const productMap = new Map();
const jsonPath = '/public/data/produits.json';

async function importJson(path) {
	const response = await fetch(jsonPath);
	const jsonData = await response.json();

	return jsonData;
}

async function importProducts() {
	let count = 0;
	const jsonData = await importJson(jsonPath);
	jsonData.map((product) => {
		productMap.set(
			count,
			new Product(
				count,
				product.nom_produit,
				product.prix,
				product.descriptif,
				product.image
			)
		);
		count++;
	});
}

await importProducts();

export { productMap };
