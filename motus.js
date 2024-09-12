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
    const tableau = document.getElementById("myTable");

    console.log(motAffiche);


    for (let u = 0; u < nombreTentatives; u++) {
        const ligne = document.createElement("tr");
        motAfficheMasque.split("").forEach((caractere) => {
            const cellule = document.createElement("td");
            cellule.textContent = caractere; // Affiche le caractère masqué
            ligne.appendChild(cellule);
        });
        tableau.appendChild(ligne);
    };


    // fonction pour que la lettre se mette dans la cellule 1 ligne 0
    let choixJoueur = 0;
    let positionLigne = 1;

    function saisi(lettre) {
        const ligne = tableau.getElementsByTagName('tr')[choixJoueur];
        const cellules = ligne.getElementsByTagName("td");

        console.log(lettre);

        

        if (positionLigne < cellules.length) {
            cellules[positionLigne].textContent = lettre; // Insère la lettre dans la cellule courante


            console.log(motAffiche[1]);
            // 1 = la lettre dans le mot

          if(lettre===motAffiche[positionLigne]){
            cellules[positionLigne].classList.add("bien-place")
            // appliquer le css dans le clavier du HTML
            // verrouiller la lettre
            // reprendre la lettre ligne de dessous
          }
          if (lettre != motAffiche[positionLigne]){
            // appliquer css orange cellules[positionLigne].classList.add("mal-place")
            // appliquer le css dans le clavier du HTML
          }
          // si la lettre n'est pas dans le mot
          else{
            // cellules[positionLigne].classList.add("incorrect")
          };
          
          positionLigne++; // Avance à la prochaine cellule;
        };
        
        
        
        
        
        if(positionLigne === cellules.length){
          choixJoueur++;
          positionLigne = 1;

        }
    };


    // Fonction pour les touches clavier html
    const letter = document.getElementsByClassName("letter");

    for (let i = 0; i < letter.length; i++) {
        letter[i].addEventListener("click", () => {
            const lettre = letter[i].innerText
            saisi(lettre);
        });
    };

    //Pour les touches clavier pc
    document.addEventListener("keydown", (e) => {
        console.log(e.key);
        const keybord = e.key;
        saisi(keybord);
    });














});
