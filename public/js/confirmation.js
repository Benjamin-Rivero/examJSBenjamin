let panier = JSON.parse(localStorage.getItem('panier')) || [];
function showCartContent() {
	const panierContent = document.getElementById('panier-content');
	const prixTotalElem = document.getElementById('prix-total');
	let prixTotal = 0;

	panierContent.innerHTML = '';

	if (panier.length === 0) {
		panierContent.innerHTML = '<p>Votre panier est vide.</p>';
	} else {
		panier.forEach((item, index) => {
			const sousTotal = item.prix.replace('€', '') * 1 * item.quantite;
			prixTotal += sousTotal;
			panierContent.innerHTML += `
                <div class="cart-item">
                    <div class="d-flex justify-content-between gap-2 w-50">
						<p><strong>Nom :</strong> ${item.nom}</p>
						<p><strong>Prix :</strong> ${item.prix}</p>
						<div class="quantity-controls">
									<button class="btn btn-primary" onclick="changeQuantity(${index}, -1)">-</button>
									<span><strong>Quantité :</strong> ${item.quantite}</span>
									<button class="btn btn-primary" onclick="changeQuantity(${index}, 1)">+</button>
								</div>
                    </div>
                    <button class="btn btn-danger" onclick="deleteItem(${index})">Supprimer</button>
                </div>
            `;
		});
	}
	prixTotalElem.innerText = `Total : ${prixTotal.toFixed(2)} €`;
}

function changeQuantity(index, change) {
	panier[index].quantite += change;

	if (panier[index].quantite <= 0) {
		panier.splice(index, 1);
	}

	localStorage.setItem('panier', JSON.stringify(panier));

	showCartContent();
}

function deleteItem(index) {
	panier.splice(index, 1);

	localStorage.setItem('panier', JSON.stringify(panier));

	showCartContent();
}

showCartContent();

const boutonValidationCommande = document.querySelector('.validate');
boutonValidationCommande.addEventListener('click', function (e) {
	if (panier.length != '0') {
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
	else {
		alert('Commande envoyée');
		window.location.href = '/';
		localStorage.removeItem('panier');
	}
});
