document.addEventListener("DOMContentLoaded", () => {
    // const tableauMots = [
    //     "cache",
    //     "codes",
    //     "liens",
    //     "octets",
    //     "cookie",
    //     "emuler",
    //     "binaire",
    //     "curseur",
    //     "domaine",
    //     "logiciel",
    //     "protocol",
    //     "terminal",
    // ];
    // const generateurMot = Math.floor(Math.random() * tableauMots.length);
    // let motAffiche = tableauMots[generateurMot];

    // Pour garder les scores aux raffraichissement de pages
    let scoreVictoire = parseInt(localStorage.getItem('victoire')) || 0;
    let scoreDefaite = parseInt(localStorage.getItem('defaite')) || 0;


    // Récupérer les éléments du  html pour afficher les scores
    let victoire = document.getElementById("scoreVictoire");
    let defaite = document.getElementById("scoreDefaite");

    // Mettre à jour l'affichage des scores
    victoire.textContent = scoreVictoire;
    defaite.textContent = scoreDefaite;

    // Ajoute l'événement pour réinitialiser les scores
    const resetButton = document.getElementById("resetScores");
    resetButton.addEventListener("click", () => {
        // Réinitialiser les scores dans localStorage
        localStorage.setItem('victoire', 0);
        localStorage.setItem('defaite', 0);

        // / Réinitialiser les  scores à zéro
        scoreVictoire = 0;
        scoreDefaite = 0;



        // Mettre à jour l'affichage des scores
        victoire.textContent = 0;
        defaite.textContent = 0;

        alert("Les scores seront remis à zéro !");
    });

    // Utilisation de l'API pour obtenir un mot aléatoire de minimu 5 lettres et max 8 lettres
    fetch("https://trouve-mot.fr/api/sizemin/5/8")
        .then((response) => response.json())
        .then((words) => {
            let motAffiche = words[0].name; // Assigne le premier mot récupéré à motAffiche

            // Suppression des accents et caractères spéciaux
            let motSansAccents = motAffiche.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            // le mot cherche pour cacher la premiere lettre du mot
            let motCherche = motSansAccents.replace(motSansAccents[0], "")
            console.log(motSansAccents); // Afficher le mot sans accents pour vérification





            // split le mot choisi et masquer toutes les lettres sauf la première
            let motAfficheMasque = motSansAccents
                .split("")
                .map((lettre, index) => (index === 0 ? lettre : "-"))
                .join("");

            // console.log(motAfficheMasque); // Afficher le mot masqué pour vérifier le résultat

            // nbre tentatives = nbre lignes
            const nombreTentatives = 6;
            const supprimer = document.getElementById("btnSuppr");
            const valider = document.getElementById("btnValider");
            const tableau = document.getElementById("myTable");



            // Ouverture de la page, alerte : 
            alert("Deviner le bon mot. \n \n Rouge = lettre bien placée. \n Orange = lettre présente mais mal placée. \n Gris = lettre non présente dans le mot. \n \n Bonne chance !");




            // Création d'un second tableau
            const lignes = [];
            // array qui stocke nos bonnes lettres
            const lettresBienPlacees = Array(motSansAccents.length).fill(null);

            // Affichage de notre tableau tr et td
            for (let u = 0; u < nombreTentatives; u++) {
                const ligne = document.createElement("tr");
                // pour chaque lettre du mot, s'il est présent dans Array, tu le mets ligne du dessous ou tu remets un _
                motAfficheMasque.split("").forEach((caractere, index) => {
                    const cellule = document.createElement("td");
                    cellule.textContent = index === 0 ? caractere : "-";
                    ligne.appendChild(cellule);

                });

                // Touche jouer fait apparaitre le tableau
                let jouer = document.getElementById("jouer");
                jouer.addEventListener("click", () => {
                    tableau.appendChild(ligne);

                });

                // Tu affiches la ligne array dans la ligne du tableau
                lignes.push(ligne);




            }

            // la première ligne
            let choixJoueur = 0;

            // la deuxième cellule
            let positionLigne = 1;


            function saisi(lettre) {
                const ligne = lignes[choixJoueur];
                const cellules = ligne.getElementsByTagName("td");

                // Si tu n'es pas à la fin de la ligne
                if (positionLigne < cellules.length) {
                    if (positionLigne > 0) { // Ne pas modifier la première cellule
                        // Met la letttre dans positionLigne la ou on ecrit
                        cellules[positionLigne].textContent = lettre;
                    }
                    positionLigne++;
                }
            }

            // Validation du mot
            valider.addEventListener('click', () => {
                const ligne = lignes[choixJoueur];
                const cellules = ligne.getElementsByTagName("td");

                // Vérifier chaque lettre
                for (let i = 1; i < cellules.length; i++) { // Commence à 1 pour ne pas changer la premiere lettre
                    const lettre = cellules[i].textContent.toLowerCase();

                    // pour colorer les lettres du clavier
                    // creation d'une constante pour trouver la lettre dans le clavier avec un querySelector pour une selection ds le css
                    const lettreClavier = document.querySelector(`.letter[data-letter="${lettre}"]`);

                    // Vérifier si la lettre est bien placée et la colore au clic seulement
                    if (lettre === motSansAccents[i]) {
                        cellules[i].classList.add("bien-place");
                        lettresBienPlacees[i] = lettre;

                        if (lettreClavier) {

                            // Pour colorer le clavier en rouge
                            lettreClavier.classList.remove("mal-place", "incorrect");
                            lettreClavier.classList.add("bien-place")


                        }
                    } else if (motCherche.includes(lettre)) {
                        cellules[i].classList.add("mal-place");


                        // Pour colorer le clavier en Jaune
                        if (lettreClavier) {
                            lettreClavier.classList.remove("bien-place", "incorrect");
                            lettreClavier.classList.add("mal-place");


                        }


                    } else {
                        cellules[i].classList.add("incorrect");

                        // Pour colorer le clavier en gris
                        if (lettreClavier) {
                            lettreClavier.classList.remove("bien-place", "mal-place");
                            lettreClavier.classList.add("incorrect");
                        }



                    }
                }

                // Passer à la ligne suivante
                if (positionLigne === cellules.length) {

                    choixJoueur++;
                    positionLigne = 1;
                    if (choixJoueur < nombreTentatives) {
                        // Réinitialiser la ligne suivante avec les lettres bien placées
                        lignes[choixJoueur].querySelectorAll("td").forEach((cellule, index) => {
                            cellule.textContent = lettresBienPlacees[index] || (index === 0 ? motSansAccents[index] : "-");


                        });
                    }
                }

                // Déterminer alerte si toutes les lettres sont bien placées
                let rouge = ligne.getElementsByClassName("bien-place");
                if ((rouge.length + 1) === motSansAccents.length) {

                    //  Compteur victoire et garder en memoire
                    scoreVictoire++;
                    localStorage.setItem('victoire', scoreVictoire);
                    victoire.textContent = scoreVictoire;

                    // Le modal pour annoncer une victoire
                    let modal = document.getElementById("myModal");
                    let span = document.getElementsByClassName("close")[0];
                    modal.style.display = "block";
                    span.addEventListener('click', () => {
                        modal.style.display = "none";

                        location.reload(); // Recharger la page pour recommencer
                    });
                } else if (choixJoueur === nombreTentatives - 0) { // Si le joueur a atteint le nombre maximum de tentatives

                    //Compteur Defaite et garder en memoire

                    scoreDefaite++;
                    localStorage.setItem('defaite', scoreDefaite);
                    defaite.textContent = scoreDefaite;




                    // Le modal pour annoncer une défaite
                    // let modal = document.getElementById("myModal");
                    // let span = document.getElementsByClassName("close")[0];
                    // modal.style.display = "block";
                    // span.addEventListener('click', () => {
                    //     modal.style.display = "none";
                    //     location.reload(); // Recharger la page pour recommencer
                    // });a
                    alert("Vous avez perdu le mot à deviner était : " + motSansAccents);
                    location.reload();

                }
            });

            // fonction pour supprimer la dernière lettre saisie
            function supprimerDerniereLettre() {
                const ligne = lignes[choixJoueur];
                const cellules = ligne.getElementsByTagName("td");
                if (positionLigne > 1) {
                    positionLigne--;
                    cellules[positionLigne].classList.remove("bien-place", "mal-place", "incorrect");
                    cellules[positionLigne].textContent = "-";
                }
            }

            // Supprimer la lettre avec le bouton "Supprimer"
            supprimer.addEventListener("click", () => {
                supprimerDerniereLettre();
            });

            // Fonction pour les touches clavier HTML
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
                } else if (keybord === "backspace" || keybord === "delete") {
                    supprimerDerniereLettre();
                } else if (keybord === "enter") {
                    valider.click(); // Simuler le clic sur le bouton "Valider"
                }
            });
        });
});
