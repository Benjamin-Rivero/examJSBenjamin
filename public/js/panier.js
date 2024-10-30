const header = document.querySelector('header');
header.innerHTML =
	`<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Phish</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Liste de produits</a>
        </li>
		
      </ul>
	  <div>
			<button id="afficher-panier" class="btn btn-info">
				<i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>
			</button>
		</div>
    </div>
  </div>
</nav>` + header.innerHTML;
const footer = document.createElement('footer');
// footer.classList = 'm-auto';
footer.innerHTML = `<p>Non, aucun droit réservé, volez moi mon site</p>`;
const body = document.querySelector('body');
body.classList = ['d-flex flex-column'];
document.querySelector('html').classList = ['d-flex flex-column'];
body.appendChild(footer);

function addCartToPage() {
	body.innerHTML =
		`<div id="panier-modal" class="modal modal-lg">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h2 class="modal-title">Panier</h2>
						<span class="btn-close" id="fermer-modal"></span>
					</div>
					<div class="modal-body" id="panier-content">
					</div>
					<div class="modal-footer d-flex justify-content-between">
						<div class="total-price" id="prix-total">Total : 0 €</div>
						<button class="validate-btn btn btn-primary">Valider le panier</button>
					</div>
				</div>
			</div>
        </div>` + body.innerHTML;
}
let panier;
function showCart() {
	panier = JSON.parse(localStorage.getItem('panier')) || [];
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
                    <div class="d-flex justify-content-between gap-2">
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

	document.getElementById('panier-modal').style.display = 'block';
}

function changeQuantity(index, change) {
	panier[index].quantite += change;

	if (panier[index].quantite <= 0) {
		panier.splice(index, 1);
	}

	localStorage.setItem('panier', JSON.stringify(panier));

	showCart();
}

function deleteItem(index) {
	panier.splice(index, 1);

	localStorage.setItem('panier', JSON.stringify(panier));

	showCart();
}

addCartToPage();

const boutonAfficherPanier = document.getElementById('afficher-panier');
boutonAfficherPanier.addEventListener('click', showCart);

const fermerModalBtn = document.getElementById('fermer-modal');
fermerModalBtn.addEventListener('click', function () {
	document.getElementById('panier-modal').style.display = 'none';
});

window.onclick = function (event) {
	const modal = document.getElementById('panier-modal');
	if (event.target === modal) {
		modal.style.display = 'none';
	}
};

const boutonValiderPanier = document.querySelector('.validate-btn');
boutonValiderPanier.addEventListener('click', function () {
	if (panier.length != '0') window.location.href = '/confirmation';
	else alert('Votre panier est vide');
});
