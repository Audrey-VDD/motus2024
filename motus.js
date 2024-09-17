document.addEventListener("DOMContentLoaded", () => {




    // Pour garder les scores aux raffraichissement de pages
    let scoreVictoire = parseInt(localStorage.getItem('victoire')) || 0;
    let scoreDefaite = parseInt(localStorage.getItem('defaite')) || 0;
    let totalEssais = parseInt(localStorage.getItem("totalEssais")) || 0;
    let totalMotsTrouves = parseInt(localStorage.getItem("totalMotsTrouves")) || 0;


    // Récupérer les éléments du  html pour afficher les scores
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

    // Fermeture des modals
    const closeBtns = document.querySelectorAll('.close');
    const modals = document.querySelectorAll('.modal');
    closeBtns.forEach(function (btn) {
        btn.onclick = function () {
            modals.forEach(function (modal) {
                modal.style.display = "none";


            });

        }
    });
    // Ouverture de la page, alerte : 
    let openModal = document.getElementById("openModal");
    openModal.style.display = "block";

    // Ajoute l'événement pour réinitialiser les scores
    const resetButton = document.getElementById("resetScores");
    resetButton.addEventListener("click", () => {
        // Réinitialiser les scores dans localStorage
        localStorage.setItem('victoire', 0);
        localStorage.setItem('defaite', 0);
        localStorage.setItem('totalEssais', 0);
        localStorage.setItem('totalMotsTrouves', 0);




        // / Réinitialiser les  scores à zéro
        scoreVictoire = 0;
        scoreDefaite = 0;
        totalEssais = 0;
        totalMotsTrouves = 0;

        // Mettre à jour l'affichage des scores
        victoire.textContent = 0;
        defaite.textContent = 0;
        moyenne.textContent = 0;


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


            // nbre tentatives = nbre lignes
            const nombreTentatives = 6;
            const supprimer = document.getElementById("btnSuppr");
            const valider = document.getElementById("btnValider");
            const tableau = document.getElementById("myTable");





            // Création d'un second tableau
            const lignes = [];
            // array qui stocke nos bonnes lettres
            const lettresBienPlacees = Array(motSansAccents.length).fill(null);

            // Affichage de notre tableau tr et td
            for (let u = 0; u < nombreTentatives; u++) {
                const ligne = document.createElement("tr");
                // pour chaque lettre du mot, s'il est présent dans Array, tu le mets ligne du dessous ou tu remets un -
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

            // Nombre d'essais pour le joueur
            let essaisJeu = 0;
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
                        // Ajoute la classe pour changer la couleur de fond de la cellule
                        cellules[positionLigne].classList.add("caseRemplit");
                    }
                    positionLigne++;
                } 
            }

            // Validation du mot
            valider.addEventListener('click', () => {
                const ligne = lignes[choixJoueur];
                const cellules = ligne.getElementsByTagName("td");


                // Vérifier si la ligne est complète
                let ligneComplete = true;
                for (let i = 1; i < cellules.length; i++) {
                    if (cellules[i].textContent === "-" || cellules[i].textContent === "") {
                        ligneComplete = false;

                    }

                }

                if (ligneComplete === false) {
                    // Le modal pour annoncer une défaite
                    let modalIncomplet = document.getElementById("myModalNotEnd");
                    modalIncomplet.style.display = "block";


                }

                if (ligneComplete) {

                    // Vérifier chaque lettre
                    // Commence à 1 pour ne pas changer la premiere lettre
                    for (let i = 1; i < cellules.length; i++) {
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


                        } else if (lettre !== "-") {
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
                    };

                    // Déterminer alerte si toutes les lettres sont bien placées
                    let rouge = ligne.getElementsByClassName("bien-place");
                    if ((rouge.length + 1) === motSansAccents.length) {

                        //  Compteur victoire et garder en memoire
                        scoreVictoire++;
                        totalMotsTrouves++;
                        totalEssais += essaisJeu + 1; // Ajouter le nombre d'essais effectués pour ce mot

                        localStorage.setItem('victoire', scoreVictoire);
                        victoire.textContent = scoreVictoire;

                        localStorage.setItem("totalEssais", totalEssais);
                        localStorage.setItem("totalMotsTrouves", totalMotsTrouves);

                        mettreAJourMoyenne();

                        // Le modal pour annoncer une victoire
                        let modal = document.getElementById("myModal");
                        modal.style.display = "block";
                        location.reload();

                    } else if (choixJoueur === nombreTentatives - 0) { // Si le joueur a atteint le nombre maximum de tentatives

                        //Compteur Defaite et garder en memoire

                        scoreDefaite++;
                        localStorage.setItem('defaite', scoreDefaite);
                        defaite.textContent = scoreDefaite;

                        totalEssais += nombreTentatives; // Ajouter le nombre d'essais effectués pour ce mot

                        localStorage.setItem("totalEssais", totalEssais);
                        localStorage.setItem("totalMotsTrouves", totalMotsTrouves);

                        mettreAJourMoyenne();

                        // Le modal pour annoncer une défaite
                        let modalDefaite = document.getElementById("myModalDefaite");

                        // Pour afficher le mot qui devait etre deviner
                        document.getElementById("motPerdu").textContent = motSansAccents;
                        modalDefaite.style.display = "block";



                    }


                }
                essaisJeu++;// Incrémenter le nombre d'essais pour le jeu en cours

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