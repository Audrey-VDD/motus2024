document.addEventListener('DOMContentLoaded',()=>{
    const tableauMots = ["cache", "codes", "liens", "octets", "cookie", "emuler", "binaire", "curseur", "domaine", "logiciel", "protocol", "terminal"];
    const generateurMot = Math.floor(Math.random()* tableauMots.length);

    console.log(tableauMots[generateurMot]);

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
        
    })





    
})