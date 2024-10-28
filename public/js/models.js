class Product {
	id;
	nom_produit;
	prix;
	description;
	image;
	caracteristics;

	constructor(id, nom_produit, prix, description, image, caracteristiques) {
		this.id = id;
		this.nom_produit = nom_produit;
		this.prix = prix;
		this.description = description;
		this.image = image;
		this.caracteristics = caracteristiques;
	}
}

class Caracteristics {
	resolution;
	zoom;
	connectivite;
	ecran;
	impression;

	constructor(resolution, zoom, connectivite, ecran, impression) {
		this.resolution = resolution;
		this.zoom = zoom;
		this.connectivite = connectivite;
		this.ecran = ecran;
		this.impression = impression;
	}
}

const productMap = new Map();
const jsonPath = '/public/data/produits.json';

async function importJson(path) {
	const response = await fetch(jsonPath);
	const jsonData = await response.json();

	return jsonData;
}

async function importProducts() {
	let count = 1;
	const jsonData = await importJson(jsonPath);
	jsonData.map((product) => {
		productMap.set(
			count,
			new Product(
				count,
				product.nom_produit,
				product.prix,
				product.descriptif,
				product.image,
				new Caracteristics(
					product.caracteristiques.résolution,
					product.caracteristiques.zoom,
					product.caracteristiques.connectivité,
					product.caracteristiques.écran,
					product.caracteristiques.impression
				)
			)
		);
		count++;
	});
}

await importProducts();

export { productMap };
