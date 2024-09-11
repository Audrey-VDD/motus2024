document.addEventListener('DOMContentLoaded',()=>{
    const tableauMots = ["cache", "codes", "liens", "octets", "cookie", "emuler", "binaire", "curseur", "domaine", "logiciel", "protocol", "terminal"];
    const generateurMot = Math.floor(Math.random()* tableauMots.length);
    let motAffiche = tableauMots[generateurMot].split('');
    const nombreTentatives = 6;
    const supprimer = document.getElementById("btnSuppr");
    const valider = document.getElementById("btnValider");

    console.log(tableauMots[generateurMot]);
    console.log(motAffiche);
    console.log(motAffiche[1]);
    

    let table = document.getElementById("myTable");
    // insert une ligne
    let nouvelleLigne = table.insertRow(0);

    // insert une cellule
    let nouvelleCellule = nouvelleLigne.insertCell(0);
    // let mot = document.createTextNode(tableauMots[generateurMot][0]);
    // nouvelleCellule.appendChild(mot);




    for(let y=0; y<motAffiche.length;y++){
        let nouvelleCellule = nouvelleLigne.insertCell();
        y = document.createTextNode(motAffiche[y]);
        nouvelleCellule.appendChild(y);
    }




    // Trouver la fonction pour afficher le mot sur le html
    for(let i=1; i<tableauMots[generateurMot].length;i++){
        motAffiche.innerText += "_";
        console.log(motAffiche);        
    }


    const letter = document.getElementsByClassName("letter");


    // Fonction pour les touches clavier
    for(let i=0;i<letter.length;i++){
        letter[i].addEventListener("click",()=>{
            console.log(letter[i].innerText);
        })
    }

    document.addEventListener('keydown', (e)=> {
        console.log(e.key);
        // afficher dans le tableau
        
    });


    
})