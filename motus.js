document.addEventListener('DOMContentLoaded', () => {
    const tableauMots = ["cache", "codes", "liens", "octets", "cookie", "emuler", "binaire", "curseur", "domaine", "logiciel", "protocol", "terminal"];
    const generateurMot = Math.floor(Math.random() * tableauMots.length);
    let motAffiche = tableauMots[generateurMot];
    const nombreTentatives = 6;
    const supprimer = document.getElementById("btnSuppr");
    const valider = document.getElementById("btnValider");

    let motSecret = motAffiche.split('');

    console.log(motAffiche);

    // Trouver la fonction pour afficher le mot sur le html
    // for (let j = 1; j < motAffiche.length; j++) {
    //     motSecret.textContent = "_";
    //     console.log(motSecret);
    // };


    const tableau = document.getElementById("myTable");
    // insert une ligne

    for (let i = 0; i < nombreTentatives; i++) {
        const ligne = document.createElement('tr');

        motSecret.forEach((motSecret) => {
            const cellule = document.createElement('td');

            cellule.textContent = motSecret;
            ligne.appendChild(cellule);
            console.log(motSecret);



        });
        tableau.appendChild(ligne);





        const letter = document.getElementsByClassName("letter");


        // Fonction pour les touches clavier
        for (let y = 0; y < letter.length; y++) {
            letter[y].addEventListener("click", () => {
                console.log(letter[y].innerText);
            })
        };

        document.addEventListener('keydown', (e) => {
            console.log(e.key);
            // afficher dans le tableau

        });

    };

});