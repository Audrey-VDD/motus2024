document.addEventListener("DOMContentLoaded", () => {
  // Pour garder les scores aux rafraîchissements de pages
  let scoreVictoire = parseInt(localStorage.getItem("victoire")) || 0;
  let scoreDefaite = parseInt(localStorage.getItem("defaite")) || 0;
  let totalEssais = parseInt(localStorage.getItem("totalEssais")) || 0;
  let totalMotsTrouves = parseInt(localStorage.getItem("totalMotsTrouves")) || 0;

  // Récupérer les éléments du HTML pour afficher les scores
  let victoire = document.getElementById("scoreVictoire");
  let defaite = document.getElementById("scoreDefaite");
  let moyenne = document.getElementById("scoreMoyenne");

  // Mettre à jour l'affichage des scores
  victoire.textContent = scoreVictoire;
  defaite.textContent = scoreDefaite;

  // Fonction pour mettre à jour la moyenne des essais
  function mettreAJourMoyenne() {
    if (totalMotsTrouves > 0) {
      let moyenneEssais = totalEssais / totalMotsTrouves;
      moyenne.textContent = Math.round(moyenneEssais); // Arrondir à l'unité
    } else {
      moyenne.textContent = 0;
    }
  }

  // Initialiser la moyenne au chargement
  mettreAJourMoyenne();

  // Ajoute l'événement pour réinitialiser les scores
  const resetButton = document.getElementById("resetScores");
  resetButton.addEventListener("click", () => {
    // Réinitialiser les scores dans localStorage
    localStorage.setItem("victoire", 0);
    localStorage.setItem("defaite", 0);
    localStorage.setItem("totalEssais", 0);
    localStorage.setItem("totalMotsTrouves", 0);

    // Réinitialiser les scores à zéro
    scoreVictoire = 0;
    scoreDefaite = 0;
    totalEssais = 0;
    totalMotsTrouves = 0;

    // Mettre à jour l'affichage des scores
    victoire.textContent = 0;
    defaite.textContent = 0;
    moyenne.textContent = 0;

    alert("Les scores et la moyenne seront remis à zéro !");
  });

  // Utilisation de l'API pour obtenir un mot aléatoire de minimum 5 lettres et maximum 8 lettres
  fetch("https://trouve-mot.fr/api/sizemin/5/8")
    .then((response) => response.json())
    .then((words) => {
      let motAffiche = words[0].name; // Assigne le premier mot récupéré à motAffiche

      // Suppression des accents et caractères spéciaux
      let motSansAccents = motAffiche
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      // le mot cherche pour cacher la première lettre du mot
      let motCherche = motSansAccents.replace(motSansAccents[0], "");
      console.log(motSansAccents); // Afficher le mot sans accents pour vérification

      // split le mot choisi et masquer toutes les lettres sauf la première
      let motAfficheMasque = motSansAccents
        .split("")
        .map((lettre, index) => (index === 0 ? lettre : "-"))
        .join("");

      // nbre tentatives = nbre lignes
      const nombreTentatives = 6;
      const supprimer = document.getElementById("btnSuppr");
      const valider = document.getElementById("btnValider");
      const tableau = document.getElementById("myTable");

      // Ouverture de la page, alerte :
      alert(
        "Devinez le bon mot. \n \n Rouge = lettre bien placée. \n Orange = lettre présente mais mal placée. \n Gris = lettre non présente dans le mot. \n \n Bonne chance !"
      );

      // Création d'un tableau pour les lignes
      const lignes = [];
      const lettresBienPlacees = Array(motSansAccents.length).fill(null);

      // Affichage de notre tableau tr et td
      for (let u = 0; u < nombreTentatives; u++) {
        const ligne = document.createElement("tr");
        motAfficheMasque.split("").forEach((caractere, index) => {
          const cellule = document.createElement("td");
          cellule.textContent = index === 0 ? caractere : "-";
          ligne.appendChild(cellule);
        });

        // Touche jouer fait apparaître le tableau
        let jouer = document.getElementById("jouer");
        jouer.addEventListener("click", () => {
          tableau.appendChild(ligne);
        });

        lignes.push(ligne);
      }

      let essaisJeu = 0; // Nombre d'essais pour le jeu en cours
      let choixJoueur = 0;
      let positionLigne = 1;

      function saisi(lettre) {
        const ligne = lignes[choixJoueur];
        const cellules = ligne.getElementsByTagName("td");

        if (positionLigne < cellules.length) {
          if (positionLigne > 0) {
            cellules[positionLigne].textContent = lettre;
          }
          positionLigne++;
        }
      }

      valider.addEventListener("click", () => {
        const ligne = lignes[choixJoueur];
        const cellules = ligne.getElementsByTagName("td");

        // Vérifier chaque lettre
        for (let i = 1; i < cellules.length; i++) {
          const lettre = cellules[i].textContent.toLowerCase();
          const lettreClavier = document.querySelector(`.letter[data-letter="${lettre}"]`);

          if (lettre === motSansAccents[i]) {
            cellules[i].classList.add("bien-place");
            lettresBienPlacees[i] = lettre;

            if (lettreClavier) {
              lettreClavier.classList.remove("mal-place", "incorrect");
              lettreClavier.classList.add("bien-place");
            }
          } else if (motCherche.includes(lettre)) {
            cellules[i].classList.add("mal-place");

            if (lettreClavier) {
              lettreClavier.classList.remove("bien-place", "incorrect");
              lettreClavier.classList.add("mal-place");
            }
          } else {
            cellules[i].classList.add("incorrect");

            if (lettreClavier) {
              lettreClavier.classList.remove("bien-place", "mal-place");
              lettreClavier.classList.add("incorrect");
            }
          }
        }

        if (positionLigne === cellules.length) {
          choixJoueur++;
          positionLigne = 1;

          if (choixJoueur < nombreTentatives) {
            lignes[choixJoueur].querySelectorAll("td").forEach((cellule, index) => {
              cellule.textContent = lettresBienPlacees[index] || (index === 0 ? motSansAccents[index] : "-");
            });
          }
        }

        let rouge = ligne.getElementsByClassName("bien-place");
        if (rouge.length + 1 === motSansAccents.length) {
          // Victoire
          scoreVictoire++;
          totalMotsTrouves++;
          totalEssais += essaisJeu + 1; // Ajouter le nombre d'essais effectués pour ce mot

          localStorage.setItem("victoire", scoreVictoire);
          localStorage.setItem("totalEssais", totalEssais);
          localStorage.setItem("totalMotsTrouves", totalMotsTrouves);

          victoire.textContent = scoreVictoire;
          mettreAJourMoyenne();

          let modal = document.getElementById("myModal");
          let span = document.getElementsByClassName("close")[0];
          modal.style.display = "block";
          span.addEventListener("click", () => {
            modal.style.display = "none";
            location.reload(); // Recharger la page pour recommencer
          });
        } else if (choixJoueur === nombreTentatives) {
          // Défaite
          scoreDefaite++;
          totalEssais += nombreTentatives; // Ajouter le nombre d'essais effectués pour ce mot

          localStorage.setItem("defaite", scoreDefaite);
          localStorage.setItem("totalEssais", totalEssais);
          localStorage.setItem("totalMotsTrouves", totalMotsTrouves);

          defaite.textContent = scoreDefaite;
          mettreAJourMoyenne();

          alert("Vous avez perdu, le mot à deviner était : " + motSansAccents);
          location.reload();
        }

        essaisJeu++; // Incrémenter le nombre d'essais pour le jeu en cours
      });

      function supprimerDerniereLettre() {
        const ligne = lignes[choixJoueur];
        const cellules = ligne.getElementsByTagName("td");
        if (positionLigne > 1) {
          positionLigne--;
          cellules[positionLigne].classList.remove("bien-place", "mal-place", "incorrect");
          cellules[positionLigne].textContent = "-";
        }
      }

      supprimer.addEventListener("click", () => {
        supprimerDerniereLettre();
      });

      const letter = document.getElementsByClassName("letter");
      for (let i = 0; i < letter.length; i++) {
        letter[i].addEventListener("click", () => {
          const lettre = letter[i].innerText.toLowerCase();
          saisi(lettre);
        });
      }

      document.addEventListener("keydown", (e) => {
        const keybord = e.key.toLowerCase();
        if (keybord.length === 1 && keybord.match(/[a-z]/)) {
          saisi(keybord);
        } else if (keybord === "backspace" || keybord === "delete") {
          supprimerDerniereLettre();
        } else if (keybord === "enter") {
          valider.click();
        }
      });
    });
});

