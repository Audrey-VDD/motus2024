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


        // pour entrer dans chaque cellule

        if (positionLigne < cellules.length) {
            cellules[positionLigne].textContent = lettre;

        }

        if (lettre === motAffiche[positionLigne]) {
            cellules[positionLigne].classList.add("bien-place");
        }
        positionLigne++;



        // pour passer a une autre ligne quand il atteind le nombre de case
        if (positionLigne === cellules.length) {
            choixJoueur++;
            positionLigne = 1;
        }
        // 
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
        const keybord = e.key;
        saisi(keybord)



    });
});
