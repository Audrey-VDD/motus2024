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

    // Utilisation de l'API pour obtenir un mot aléatoire
    fetch("https://trouve-mot.fr/api/random/1")
        .then((response) => response.json()) // 
        .then((words) => {
            let motAffiche = words[0].name; // Assigne le premier mot récupéré à motAffiche

            // Suppression des accents et caractères spéciaux
            let motSansAccents = motAffiche.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            console.log(motSansAccents); // Afficher le mot sans accents pour vérification

            // split le mot choisi et masquer toutes les lettres sauf la première
            let motAfficheMasque = motSansAccents
                .split("")
                .map((lettre, index) => (index === 0 ? lettre : "-"))
                .join("");

            console.log(motAfficheMasque); // Afficher le mot masqué pour vérifier le résultat

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

            // fonction pour les couleurs
            function saisi(lettre) {
                const ligne = lignes[choixJoueur];
                const cellules = ligne.getElementsByTagName("td");

                // Si tu n'es pas à la fin de la ligne
                if (positionLigne < cellules.length) {
                    if (positionLigne > 0) { // Ne pas modifier la première cellule
                        // Met la letttre dans positionLigne la ou on ecrit
                        cellules[positionLigne].textContent = lettre;

                        // Vérifier si la lettre est correcte
                        if (lettre === motSansAccents[positionLigne]) {
                            cellules[positionLigne].classList.add("bien-place");
                            lettresBienPlacees[positionLigne] = lettre; // Conserver la lettre bien placée
                        } else if (motSansAccents.includes(lettre)) {
                            cellules[positionLigne].classList.add("mal-place");
                        } else {
                            cellules[positionLigne].classList.add("incorrect");
                        }
                    }
                    positionLigne++;
                }


                valider.addEventListener('click', () => {
                    if (positionLigne < cellules.length) {
                        if (positionLigne > 0) { // Ne pas modifier la première cellule
                            // Met la letttre dans positionLigne la ou on ecrit
                            cellules[positionLigne].textContent = lettre;

                        }
                        positionLigne++;
                    }



                    if (positionLigne === cellules.length) {
                        // Passer à la ligne suivante
                        choixJoueur++;
                        positionLigne = 1;

                        if (choixJoueur < nombreTentatives) {
                            // Réinitialiser le tableau pour la prochaine ligne avec les lettres bien placées
                            lignes[choixJoueur].querySelectorAll("td").forEach((cellule, index) => {
                                cellule.textContent = lettresBienPlacees[index] || (index === 0 ? motSansAccents[index] : "-");
                            });
                        }
                    }

                    // Déterminer alerte si nombre de rouge +1 sur ligne = nombre de lettres dans le mot
                    let rouge = ligne.getElementsByClassName("bien-place");
                    console.log(rouge.length);
                    console.log(motAffiche.length == (rouge.length + 1));
                    console.log(motAffiche == (rouge + 1));
                    if ((rouge.length + 1) === motAffiche.length) {

                        // Le modal pour annoncer une victoire
                        let modal = document.getElementById("myModal");
                        span = document.getElementsByClassName("close")[0];
                        modal.style.display = "block";
                        span.addEventListener('click', () => {
                            modal.style.display = "none";
                            location.reload()

                        })

                        // Test return à chercher


                    } else {

                    }


                })





            }

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

            supprimer.addEventListener("click", () => {
                supprimerDerniereLettre();
            });

            // Fonction pour les touches clavier html
            const letter = document.getElementsByClassName("letter");
            for (let i = 1; i < letter.length; i++) {
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