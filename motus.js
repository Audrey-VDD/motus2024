document.addEventListener("DOMContentLoaded", () => {
    const tableauMots = [
        "cache",
        "codes",
        "liens",
        "octets",
        "cookie",
        "emuler",
        "binaire",
        "curseur",
        "domaine",
        "logiciel",
        "protocol",
        "terminal",
    ];

    const generateurMot = Math.floor(Math.random() * tableauMots.length);
    let motAffiche = tableauMots[generateurMot];

    // Initialisation du mot masqué
    let motAfficheMasque = motAffiche
        .split("")
        .map((lettre, index) => (index === 0 ? lettre : "-"))
        .join("");

    const nombreTentatives = 6;
    const supprimer = document.getElementById("btnSuppr");
    const valider = document.getElementById("btnValider");
    const tableau = document.getElementById("myTable");

    alert(
        "Deviner le bon mot. \n \n Rouge = lettre bien placée. \n Orange = lettre présente mais mal placée. \n Gris = lettre non présente dans le mot. \n \n Bonne chance !"
    );

    console.log(motAffiche);

    // Créer le tableau pour les essais
    const lignes = [];
    const lettresBienPlacees = Array(motAffiche.length).fill(null); // Tableau pour stocker les lettres bien placées
    for (let u = 0; u < nombreTentatives; u++) {
        const ligne = document.createElement("tr");
        motAfficheMasque.split("").forEach((caractere, index) => {
            const cellule = document.createElement("td");
            cellule.textContent = index === 0 ? caractere : "-"; // Affiche la lettre bien placée ou le caractère masqué
            ligne.appendChild(cellule);
        });
        let jouer = document.getElementById("jouer");
        jouer.addEventListener("click", () => {
            tableau.appendChild(ligne);
        });

        lignes.push(ligne); // Ajouter la ligne à un tableau pour une utilisation future
    }

    let choixJoueur = 0;
    let positionLigne = 1;

    function saisi(lettre) {
        const ligne = lignes[choixJoueur];
        const cellules = ligne.getElementsByTagName("td");
        const motActuel = motAffiche.split("");

        console.log(lettre);

        if (positionLigne < cellules.length) {
            if (positionLigne > 0) {
                // Ne pas modifier la première cellule
                cellules[positionLigne].textContent = lettre; // Insère la lettre dans la cellule courante

                // Vérifier si la lettre est correcte
                if (lettre === motAffiche[positionLigne]) {
                    cellules[positionLigne].classList.add("bien-place");

                    lettresBienPlacees[positionLigne] = lettre; // Conserver la lettre bien placée
                } else if (motAffiche.includes(lettre)) {
                    cellules[positionLigne].classList.add("mal-place");
                } else {
                    cellules[positionLigne].classList.add("incorrect");
                }
            }

            positionLigne++;
        }
        valider.addEventListener("click", () => {
            if (positionLigne === cellules.length) {
                // Passer à la ligne suivante
                choixJoueur++;
                positionLigne = 1;

                if (choixJoueur < nombreTentatives) {
                    // Réinitialiser le tableau pour la prochaine ligne avec les lettres bien placées
                    lignes[choixJoueur]
                        .querySelectorAll("td")
                        .forEach((cellule, index) => {
                            cellule.textContent =
                                lettresBienPlacees[index] ||
                                (index === 0 ? motAffiche[index] : "-");
                        });
                }
            }
        });
    }

    // fonction pour supprimer la dernière lettre saisie

    function supprimerDerniereLettre() {
        const ligne = lignes[choixJoueur];
        const cellules = ligne.getElementsByTagName("td");
        if (positionLigne > 1) {
            positionLigne--;
            cellules[positionLigne].classList.remove("bien-place");
            cellules[positionLigne].classList.remove("mal-place");
            cellules[positionLigne].classList.remove("incorrect");
            cellules[positionLigne].textContent = "-";
        }
    }

    supprimer.addEventListener("click", () => {
        supprimerDerniereLettre();
    });

    // Fonction pour les touches clavier html
    const letter = document.getElementsByClassName("letter");

    for (let i = 0; i < letter.length; i++) {
        letter[i].addEventListener("click", () => {
            const lettre = letter[i].innerText.toLowerCase();
            saisi(lettre);
        });
    }

    // Pour les touches clavier PC
    document.addEventListener("keydown", (e) => {
        const keybord = e.key.toLowerCase();
        if (keybord.length === 1 && keybord.match(/[a-z]/)) {
            saisi(keybord);
        } else if (keybord === "backspace") {
            supprimerDerniereLettre();
        } else if (keybord === "delete") {
            supprimerDerniereLettre();
        }
    });
});
