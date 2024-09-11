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


    for (u = 0; u < nombreTentatives; u++) {
        const ligne = document.createElement('tr');
        motAfficheMasque.split("").forEach((caractere)=>{
            
        })




        motSecret.forEach((motSecret) => {

            console.log(motSecret)

            // créer une td dans le tr
            const cellule = document.createElement('td');
            cellule.textContent = motSecret;

            ligne.appendChild(cellule);


        });


        tableau.appendChild(ligne);
    };






    const letter = document.getElementsByClassName("letter");
    // Fonction pour les touches clavier
    for (let y = 0; y < letter.length; y++) {
        letter[y].addEventListener("click", () => {
            console.log(letter[y].innerText);
        })
    }

    document.addEventListener('keydown', (e) => {
        console.log(e.key);
        // afficher dans le tableau  
    });











})