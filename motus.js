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
    // point d'interrogation = ou
    // map parcourir
    .map((lettre, index) => (index === 0 ? lettre : "_"))
    // join = joindre le split et le map
    .join("");
    console.log(motAffiche);
    console.log(motAfficheMasque);
    

  // créer variable mot splité

  const nombreTentatives = 6;
  const supprimer = document.getElementById("btnSuppr");
  const valider = document.getElementById("btnValider");
  const tableau = document.getElementById("myTable");


  for (let u = 0; u < nombreTentatives; u++) {
    const ligne = document.createElement("tr");

    motAfficheMasque.split("").forEach((caractere) => {
      const cellule = document.createElement("td");
      cellule.textContent = caractere; // Affiche le caractère masqué
      ligne.appendChild(cellule);

      // m'indique si dans le mot affiché il y a la lettre O en commençant par la première valeur et pas 0
      console.log(motAffiche.indexOf("O", 1));



      const letter = document.getElementsByClassName("letter");
      // Fonction pour les touches clavier
      for (let i = 0; i < letter.length; i++) {
        letter[i].addEventListener("click", () => {

          console.log(letter[i].innerText);

          // permet de faire apparaitre les lettres dans la table
         cellule.innerText = letter[i].innerText;

        });
      }



    });
    tableau.appendChild(ligne);

  };
  















  // const letter = document.getElementsByClassName("letter");
  // // Fonction pour les touches clavier
  // for (let i = 0; i < letter.length; i++) {
  //   letter[i].addEventListener("click", () => {
  //     console.log(letter[i].innerText);
  //     // permet de faire apparaitre les lettres dans la table
  //     cellule.innerText += letter[i].innerText;
  //   });
  // }

  document.addEventListener("keydown", (e) => {
    console.log(e.key);
    // afficher dans le tableau
  });
});
