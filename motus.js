document.addEventListener('DOMContentLoaded', () => {
    const tableauMots = ["cache", "codes", "liens", "octets", "cookie", "emuler", "binaire", "curseur", "domaine", "logiciel", "protocol", "terminal"];
    const generateurMot = Math.floor(Math.random() * tableauMots.length);
    let motAffiche = tableauMots[generateurMot];

    // créer variable mot splité
    let motSecret = motAffiche.split('');
    const nombreTentatives = 6;
    const supprimer = document.getElementById("btnSuppr");
    const valider = document.getElementById("btnValider");



    console.log(motAffiche);



    const tableau = document.getElementById("myTable");

    for (i = 1; i < nombreTentatives; i++) {
        const ligne = document.createElement('tr');
        motSecret.forEach(() => {
            // créer une td dans le tr
            const cellule = document.createElement('td');
            cellule.textContent = "_";


        ligne.appendChild(cellule);




        });
        tableau.appendChild(ligne);
    }



    // insert une ligne
    // const ligne = document.createElement('tr');
    // motSecret.forEach((lettre, index)=>{
    //     // créer une td dans le tr
    //     const cellule = document.createElement('td');
    //     if(index === 0){
    //         cellule.textContent = "_";
    //     }
    //     ligne.appendChild(cellule);
    // });
    // tableau.appendChild(ligne);











    const letter = document.getElementsByClassName("letter");
    // Fonction pour les touches clavier
    for (let i = 0; i < letter.length; i++) {
        letter[i].addEventListener("click", () => {
            console.log(letter[i].innerText);
        })
    }

    document.addEventListener('keydown', (e) => {
        console.log(e.key);
        // afficher dans le tableau  
    });











})