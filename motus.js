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
        .map((lettre, index) => (index === 0 ? lettre : "-"))
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

    let choixJoueur = 0;
    let positionLigne = 1;

    function saisi(lettre) {
        const ligne = tableau.getElementsByTagName('tr')[choixJoueur];
        const cellules = ligne.getElementsByTagName("td");


        if (positionLigne < cellules.length) {
            cellules[positionLigne].textContent = lettre; // Insère la lettre dans la cellule courante
            positionLigne++; // Avance à la prochaine cellule
        }

    }


    const letter = document.getElementsByClassName("letter");
    // Fonction pour les touches clavier
    for (let i = 0; i < letter.length; i++) {
        letter[i].addEventListener("click", () => {
            console.log(letter[i].innerText);
            const lettre = letter[i].innerText
            saisi(lettre);


        });
    };
    document.addEventListener("keydown", (e) => {
        console.log(e.key);



    });
});
