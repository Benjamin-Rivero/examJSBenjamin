function afficherContenuPanier() {
	const panier = JSON.parse(localStorage.getItem('panier')) || [];
	const panierContent = document.getElementById('panier-content');
	const prixTotalElem = document.getElementById('prix-total');
	let prixTotal = 0;
	// Vider le contenu précédent de la modal
	panierContent.innerHTML = '';

	if (panier.length === 0) {
		// Message si le panier est vide
		panierContent.innerHTML = '<p>Votre panier est vide.</p>';
	} else {
		// Afficher chaque article du panier
		panier.forEach((item, index) => {
			const sousTotal = item.prix.replace('€', '') * 1 * item.quantite;
			prixTotal += sousTotal;
			panierContent.innerHTML += `
                <div class="cart-item">
                    <div class="d-flex justify-content-between gap-2 w-50">
						<p><strong>Nom :</strong> ${item.nom}</p>
						<p><strong>Prix :</strong> ${item.prix}</p>
						<div class="quantity-controls">
									<button class="btn btn-primary" onclick="modifierQuantite(${index}, -1)">-</button>
									<span><strong>Quantité :</strong> ${item.quantite}</span>
									<button class="btn btn-primary" onclick="modifierQuantite(${index}, 1)">+</button>
								</div>
                    </div>
                    <button class="btn btn-danger" onclick="supprimerArticle(${index})">Supprimer</button>
                </div>
            `;
		});
	}
	prixTotalElem.innerText = `Total : ${prixTotal.toFixed(2)} €`;
}

// Fonction pour modifier la quantité
function modifierQuantite(index, change) {
	let panier = JSON.parse(localStorage.getItem('panier')) || [];

	// Mettre à jour la quantité
	panier[index].quantite += change;

	// Si la quantité devient 0 ou moins, supprimer l'élément
	if (panier[index].quantite <= 0) {
		panier.splice(index, 1);
	}

	// Sauvegarder le panier dans le localStorage
	localStorage.setItem('panier', JSON.stringify(panier));
	// Réafficher le panier
	afficherContenuPanier();
}

// Fonction pour supprimer un article
function supprimerArticle(index) {
	let panier = JSON.parse(localStorage.getItem('panier')) || [];

	// Supprimer l'article à l'index donné
	panier.splice(index, 1);

	// Sauvegarder le panier dans le localStorage
	localStorage.setItem('panier', JSON.stringify(panier));

	// Réafficher le panier
	afficherContenuPanier();
}

afficherContenuPanier();

const boutonValidationCommande = document.querySelector('.validate');
boutonValidationCommande.addEventListener('click', function (e) {
	if (localStorage.getItem('panier')) {
		const commandForm = document.querySelector('.command-form form');
		commandForm.classList.toggle('d-flex');
	} else {
		alert('Votre panier est vide');
	}
});

window.addEventListener('submit', function (e) {
	e.preventDefault();
	const nom = document.querySelector('#nom').value;
	const email = document.querySelector('#email').value;
	const adresse = document.querySelector('#adresse').value;
	if (!nom) this.alert('Veuillez rentrer votre nom');
	else if (!email) this.alert('Veuillez rentrer votre email');
	else if (!adresse) this.alert('Veuillez rentrer votre adresse');
	else alert('Commande envoyée');

	window.location.href = '/';
	localStorage.clear();
});
