import { mots8Lettres } from "./dictionnaire.js";

const divBase = document.getElementById("mot-base");
const divMots = document.getElementById("motsJeu");
const baseMot = document.getElementById("base-mot");
const inputMots = document.getElementById("input-mots");
const jeu = document.getElementById("jeu");
const grille = document.getElementById("grille");
const items1 = document.querySelectorAll(".item1");
const items2 = document.querySelectorAll(".item2");
const items3 = document.querySelectorAll(".item3");
const items4 = document.querySelectorAll(".item4");
const items5 = document.querySelectorAll(".item5");
const items6 = document.querySelectorAll(".item6");
const items7 = document.querySelectorAll(".item7");
const items8 = document.querySelectorAll(".item8");
const items = [items1, items2, items3, items4, items5, items6, items7, items8];
const replay = document.querySelectorAll(".replay");

const toggleClass = (element, classe) => {
  element.classList.toggle(classe);
};

const removeAddClass = (element, classe1, classe2) => {
  element.classList.remove(classe1);
  element.classList.add(classe2);
};

let motDeBase;
let lettresMotDeBase;
const setBaseWord = () => {
  baseMot.addEventListener("input", () => {});
  baseMot.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      if (!baseMot.value) {
        return;
      }
      if (baseMot.value.length !== 8) {
        console.log("Entrez un mot de 8 lettres.");
      } else {
        let exists = false;
        for (let i = 0; i < mots8Lettres.length; i++) {
          if (mots8Lettres[i] === baseMot.value.toLowerCase()) {
            motDeBase = baseMot.value.trim();
            lettresMotDeBase = motDeBase.split("");
            inputMots.value = lettresMotDeBase[0];
            items[0][0].textContent = lettresMotDeBase[0].toUpperCase();
            items[0][0].style.backgroundColor = "red";
            exists = true;
            toggleClass(divBase, "d-none");
            toggleClass(divMots, "d-none");
            break;
          }
        }
        if (!exists) {
          console.log("Entrez un mot qui existe en français.");
        }
      }
    }
  });
};

let propositionLettres;
let essai = 0;
let mot

const tryWords = () => {
  inputMots.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      if (!inputMots.value) {
        return;
      }
      if (inputMots.value.length !== 8) {
        console.log("Entrez un mot de 8 lettres.");
      } else {
        propositionLettres = inputMots.value.trim().toLowerCase().split("");
        console.log(propositionLettres);
        let exists = false;
        for (let j = 0; j < mots8Lettres.length; j++) {
          if (mots8Lettres[j] === inputMots.value.toLowerCase()) {
            exists = true;
            if (exists) {
              for (let i = 0; i < lettresMotDeBase.length; i++) {
                items[i][essai].textContent = propositionLettres[i].toUpperCase();
                for (let k = 0; k < propositionLettres.length; k++) {
                    if (propositionLettres[i] === lettresMotDeBase[k]) {
                        items[i][essai].style.backgroundColor = "yellow";
                        items[i][essai].style.color = "black";
                    }
                }
                if (propositionLettres[i] === lettresMotDeBase[i]) {
                  items[i][essai].style.backgroundColor = "red";
                  items[i][essai].style.color = "white";
                }
                continue;
              }
              if (essai < 5) {
                essai++;
              } else {
                return;
              }
            }
          }
        }
        if (!exists) {
          console.log("Entrez un mot qui existe en français.");
        }
      }
    }
  });
};

export const init = () => {
  toggleClass(jeu, "d-none");
  toggleClass(divMots, "d-none");
  setBaseWord();
  tryWords();

  // toggleClass(replay,"d-none");
};
