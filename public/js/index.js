function ajouterPanierAPage() {
	const body = document.querySelector('body');

	body.innerHTML =
		`<!-- Modal pour afficher le contenu du panier -->
        <div id="panier-modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Panier</h2>
                    <span class="close-btn" id="fermer-modal">&times;</span>
                </div>
                <div class="modal-body" id="panier-content">
                </div>
                <div class="total-price" id="prix-total">Total : 0 €</div>
                <div class="modal-footer">
                    <button class="validate-btn">Valider le panier</button>
                </div>
            </div>
        </div>` + body.innerHTML;
}

// Fonction pour afficher le contenu du panier
function afficherPanier() {
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
                    <div>
                    <p><strong>Nom :</strong> ${item.nom}</p>
                    <p><strong>Prix :</strong> ${item.prix}</p>
                    <div class="quantity-controls">
                                <button class="quantity-btn" onclick="modifierQuantite(${index}, -1)">-</button>
                                <span><strong>Quantité :</strong> ${item.quantite}</span>
                                <button class="quantity-btn" onclick="modifierQuantite(${index}, 1)">+</button>
                            </div>
                    </div>
                    <button class="delete-btn" onclick="supprimerArticle(${index})">Supprimer</button>
                </div>
            `;
		});
	}
	prixTotalElem.innerText = `Total : ${prixTotal.toFixed(2)} €`;

	// Afficher la modal
	document.getElementById('panier-modal').style.display = 'flex';
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
	afficherPanier();
}

// Fonction pour supprimer un article
function supprimerArticle(index) {
	let panier = JSON.parse(localStorage.getItem('panier')) || [];

	// Supprimer l'article à l'index donné
	panier.splice(index, 1);

	// Sauvegarder le panier dans le localStorage
	localStorage.setItem('panier', JSON.stringify(panier));

	// Réafficher le panier
	afficherPanier();
}

ajouterPanierAPage();
// Bouton pour afficher le panier
const boutonAfficherPanier = document.getElementById('afficher-panier');
boutonAfficherPanier.addEventListener('click', afficherPanier);

// Bouton pour fermer la modal
const fermerModalBtn = document.getElementById('fermer-modal');
fermerModalBtn.addEventListener('click', function () {
	document.getElementById('panier-modal').style.display = 'none';
});

// Fermer la modal en cliquant à l'extérieur du contenu
window.onclick = function (event) {
	const modal = document.getElementById('panier-modal');
	if (event.target === modal) {
		modal.style.display = 'none';
	}
};

const boutonValiderPanier = document.querySelector('.validate-btn');
boutonValiderPanier.addEventListener('click', function () {
	if (localStorage.getItem('panier')) window.location.href = '/confirmation';
	else alert('Votre panier est vide');
});
