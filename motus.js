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

    // Variable qui sélectionne un mot
    const generateurMot = Math.floor(Math.random() * tableauMots.length);
    let motAffiche = tableauMots[generateurMot];

    // splite le mot, affiche que la première lettre 0
    let motAfficheMasque = motAffiche
        .split("")
        .map((lettre, index) => (index === 0 ? lettre : "-"))
        .join("");


    const nombreTentatives = 6;
    const supprimer = document.getElementById("btnSuppr");
    const valider = document.getElementById("btnValider");
    const tableau = document.getElementById("myTable");

    alert("Deviner le bon mot. \n \n Rouge = lettre bien placée. \n Orange = lettre présente mais mal placée. \n Gris = lettre non présente dans le mot. \n \n Bonne chance !");

    // Boucle pour nos 6 tentatives
    for (let u = 0; u < nombreTentatives; u++) {

        const ligne = document.createElement("tr");
        // pour chaque lettre du mot splité, tu créés un td et tu me l'affiches dans cellule créée
        motAfficheMasque.split("").forEach((caractere) => {
            const cellule = document.createElement("td");
            cellule.textContent = caractere;
            ligne.appendChild(cellule);
        });

        // création bouton jouer pour faire apparaître le tableau
        let jouer = document.getElementById("jouer");
        jouer.addEventListener('click', () => {
            tableau.appendChild(ligne);
        })
    };


    // fonction pour que la lettre se mette dans la cellule 1 ligne 0
    let choixJoueur = 0;
    let positionLigne = 1;




    function saisi(lettre) {
        const ligne = tableau.getElementsByTagName('tr')[choixJoueur];
        const cellules = ligne.getElementsByTagName("td");



        // rajout de égal pour que même si on clique sur valider avant la fin de la ligne
        //  on ne passe pas à la ligne du dessous
        if (positionLigne <= cellules.length) {
            cellules[positionLigne].textContent = lettre; // Insère la lettre dans la cellule courante

            // Echange première lettre du mot contre rien
            let motCherche = motAffiche.replace(motAffiche[0], "");


            if (lettre === motAffiche[positionLigne]) {
                cellules[positionLigne].classList.add("bien-place");
                // appliquer le css dans le clavier du HTML
                // verrouiller la lettre
                // reprendre la lettre ligne de dessous


                // Test pour trouver la lettre qui est en rouge
                let lettreTrouve = document.getElementsByClassName("bien-place");
                console.log(lettreTrouve);




            } else if (motCherche.includes(lettre)) {
                cellules[positionLigne].classList.add("mal-place");
                // appliquer le css dans le clavier du HTML
            }
            // si la lettre n'est pas dans le mot
            else {
                cellules[positionLigne].classList.add("incorrect");
            };

            positionLigne++; // Avance à la prochaine cellule
        };

        valider.addEventListener('click', () => {
            if (positionLigne === cellules.length) {
                choixJoueur++;
                positionLigne = 1;
            }
        })
        document.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                choixJoueur++;
                positionLigne = 1;
            }
        })

    }








    // Fonction pour les touches clavier html
    const letter = document.getElementsByClassName("letter");


    // couleurs ne fonctionnent pas
    for (let i = 0; i < letter.length; i++) {
        letter[i].addEventListener("click", () => {
            let lettre = letter[i].innerText
            saisi(lettre);
            console.log(lettre);
        });
    };

    //Pour les touches clavier pc ok pour les couleurs
    document.addEventListener("keydown", (e) => {
        let keybord = e.key;
        saisi(keybord);
    });
























});
