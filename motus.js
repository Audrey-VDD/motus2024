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

    let motAfficheMasque = motAffiche
        .split("")
        .map((lettre, index) => (index === 0 ? lettre : "."))
        .join("");
    // créer variable mot splité

    const nombreTentatives = 6;
    const supprimer = document.getElementById("btnSuppr");
    const valider = document.getElementById("btnValider");
    console.log(motAffiche);
    const tableau = document.getElementById("myTable");

    for (let u = 0; u < nombreTentatives; u++) {
        const ligne = document.createElement("tr");
        motAfficheMasque.split("").forEach((caractere) => {
            const cellule = document.createElement("td");
            cellule.textContent = caractere; // Affiche le caractère masqué
            ligne.appendChild(cellule);
        });
        tableau.appendChild(ligne);
    };

    // Suivi de la position dans la ligne
    let tentativeActuelle = 0;
    let positionDansLigne = 1; // Commence après la première lettre déjà affichée

    // Fonction pour mettre à jour la cellule avec la lettre saisie
    function saisirLettre(lettre) {
        const ligne = tableau.getElementsByTagName("tr")[tentativeActuelle]; // Ligne actuelle
        const cellule = ligne.getElementsByTagName("td"); // Récupérer toutes les cellules
        if (positionDansLigne < cellule.length) {
            cellule[positionDansLigne].textContent = lettre; // Remplacer le point par la lettre
            positionDansLigne++;
        }
        // Si la ligne est complète, passer à la tentative suivante
        if (positionDansLigne === cellule.length) {
            tentativeActuelle++;
            positionDansLigne = 1; // Réinitialiser la position dans la nouvelle ligne
        }
    }








    const letter = document.getElementsByClassName("letter");
    // Fonction pour les touches clavier
    for (let i = 0; i < letter.length; i++) {
        letter[i].addEventListener("click", () => {
            console.log(letter[i].innerText);
            const lettre = letter[i].innerText
            saisirLettre(lettre);

        });
    };
    document.addEventListener("keydown", (e) => {
        console.log(e.key);



    });
});
