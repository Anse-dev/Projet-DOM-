document.addEventListener("DOMContentLoaded", function () {
  // Récupération des éléments du DOM
  const panier = document.getElementById("cart");
  const totalElement = document.getElementById("total");

  // Ajout d'un écouteur d'événement sur le panier
  panier.addEventListener("click", function (event) {
    const cible = event.target;

    // Vérification de la classe de l'élément cliqué
    if (cible.classList.contains("plus-btn") || cible.classList.contains("minus-btn")) {
      // Mise à jour de la quantité
      mettreAJourQuantite(cible);
      // Mise à jour du total
      mettreAJourTotal();
    } else if (cible.classList.contains("heart")) {
      // Basculement de l'état du cœur
      basculerCoeur(cible);
    } else if (cible.classList.contains("remove-btn")) {
      // Suppression de l'élément du panier
      supprimerElement(cible.parentElement);
      // Mise à jour du total
      mettreAJourTotal();
    }
  });

  // Fonction pour mettre à jour la quantité d'un article
  function mettreAJourQuantite(btn) {
    const article = btn.parentElement;
    const elementQuantite = article.querySelector(".quantity");
    let quantite = parseInt(elementQuantite.textContent);

    // Incrémentation ou décrémentation de la quantité en fonction du bouton cliqué
    if (btn.classList.contains("plus-btn")) {
      quantite++;
    } else if (btn.classList.contains("minus-btn") && quantite > 1) {
      quantite--;
    }

    // Mise à jour de l'élément de quantité dans le DOM
    elementQuantite.textContent = quantite;
  }

  // Fonction pour basculer l'état du cœur (ajout ou retrait de l'aimé)
  function basculerCoeur(coeur) {
    coeur.classList.toggle("clicked");
  }

  // Fonction pour supprimer un article du panier
  function supprimerElement(element) {
    element.remove();
  }

  // Fonction pour mettre à jour le prix total du panier
  function mettreAJourTotal() {
    const articles = panier.querySelectorAll(".item");
    let prixTotal = 0;

    // Calcul du prix total en parcourant tous les articles du panier
    articles.forEach((article) => {
      const quantite = parseInt(article.querySelector(".quantity").textContent);
      const prix = parseInt(article.getAttribute("data-price"));
      prixTotal += quantite * prix;
    });

    // Mise à jour de l'élément affichant le prix total dans le DOM
    totalElement.textContent = "Total : " + prixTotal + " Fcfa";
  }
});
