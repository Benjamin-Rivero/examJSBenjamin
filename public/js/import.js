const header = document.querySelector('header');
header.innerHTML =
	`<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/list">Phish</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/list">Liste de produits</a>
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
