
let reset = document.querySelector('#reset');
let scoreJoueur = document.querySelector('#score-joueur');
let scoreOrdinateur = document.querySelector('#score-ordinateur');
let message = document.querySelector('#message');
let nextBtn = document.querySelector('#next');
// Je récupère tous les boutons de la class .btn-joueur et transforme la node.list en array
let btnJoueur = [ ... document.querySelectorAll('.btn-joueur')];
let opierreBtn = document.querySelector('#opierre');
let ofeuilleBtn = document.querySelector('#ofeuille');
let ociseauxBtn = document.querySelector('#ociseaux');


// Cette fonction se déclenche quand on clique sur un bouton
function jouerManche(e) {
    // Trouve le bouton exact sur lequel on a cliqué
    let choix = e.target.closest(".btn-joueur");
    // Pour chaque bouton dans la liste des boutons de joueur (btnJoueur)
    // Quand on clique sur un bouton de la liste, on ajoute la classe CSS "desactivated"
    btnJoueur.forEach(function(btn) {
        btn.classList.add("desactivated");
        // Quand on clique sur un bouton de la liste, annuler la fonction jouerManche
        btn.removeEventListener("click", jouerManche);
    });
    
    // Enlève la classe "desactivated" du bouton sur lequel on a cliqué
    choix.classList.remove("desactivated");
    // Ajoute la classe "active" au bouton sur lequel on a cliqué
    choix.classList.add("active");

    // Enregistre le choix du joueur
    let choixJoueur = choix.id;

    // L'ordinateur fait un choix
    let choixOrdi = faireChoixOrdinateur();

    // Vérifie qui est le gagnant
    verifierGagnant(choixJoueur, choixOrdi);

    nextBtn.style.visibility = "visible";
}

// Déclare des constantes pour représenter les choix du jeu
const PIERRE = "pierre";
const FEUILLE = "feuille";
const CISEAUX = "ciseaux";

// Fonction pour que l'ordinateur fasse un choix aléatoire
function faireChoixOrdinateur() {
    // 0 = Pierre
    // 1 = Feuille
    // 2 = Ciseaux

    // Génère un nombre aléatoire entre 0, 1 ou 2
    let nbAleatoire = Math.floor(Math.random() * 3); 
    console.log(nbAleatoire);

    // Utilise le nombre aléatoire pour déterminer le choix de l'ordinateur
    switch(nbAleatoire){
        case 0 : opierreBtn.classList.add('active'); // Si nbAleatoire est 0, active le bouton Pierre et retourne "pierre"
            return PIERRE;
        case 1 : ofeuilleBtn.classList.add('active'); // Si nbAleatoire est 1, active le bouton Feuille et retourne "feuille"
            return FEUILLE;
        case 2 : ociseauxBtn.classList.add('active'); // Si nbAleatoire est 2, active le bouton Ciseaux et retourne "ciseaux"
            return CISEAUX;    
    }
}

// Cette fonction vérifie qui est le gagnant entre le joueur et l'ordinateur
function verifierGagnant(choixJoueur, choixOrdi) {
    // Si le choix du joueur est le même que celui de l'ordinateur
    if (choixJoueur === choixOrdi) {
        message.textContent = "Égalité !";
        return;
    } 
        // Conditions si le joueur choisi PIERRE
    if (choixJoueur === PIERRE) {
        if (choixOrdi === FEUILLE) {
            return victoireOrdinateur();
        } else if (choixOrdi === CISEAUX){
            return victoireJoueur();
        }
    }
        // Conditions si le joueur choisi FEUILLE
    if (choixJoueur === FEUILLE) {
        if (choixOrdi === CISEAUX) {
            return victoireOrdinateur();
        } else if (choixOrdi === PIERRE){
            return victoireJoueur();
        }
        
    }
        // Conditions si le joueur choisi CISEAUX
    if (choixJoueur === CISEAUX) {
        if (choixOrdi === PIERRE) {
            return victoireOrdinateur();
        } else if (choixOrdi === FEUILLE){
            return victoireJoueur();
        }
    }
};

// Cette fonction met à jour le message et le score quand l'ordinateur gagne
function victoireOrdinateur() {
    message.textContent = "L'ordinateur gagne...";
    scoreOrdinateur.textContent++;
};

// Cette fonction met à jour le message et le score quand le joueur gagne gagne
function victoireJoueur() {
    message.textContent = "Vous avez gagné !";
    scoreJoueur.textContent++;
};

// Fonction pour préparer une nouvelle manche du jeu
function prepareNouvelleManche() {
    // Pour chaque bouton dans la liste des boutons de joueur (btnJoueur)
    btnJoueur.forEach(function(btn) {
        // Enlève la classe "desactivated" de chaque bouton
        btn.classList.remove("desactivated");
        // Enlève la classe "active" de chaque bouton
        btn.classList.remove("active");
        // Ajoute un "écouteur" de clic pour appeler la fonction jouerManche lorsque le bouton est cliqué
        btn.addEventListener("click", jouerManche);
    });

    // Cache le bouton "next" (prochain)
    nextBtn.style.visibility = "hidden";

    // Enlève la classe "active" du bouton Pierre de l'ordinateur
    opierreBtn.classList.remove('active');
    // Enlève la classe "active" du bouton Feuille de l'ordinateur
    ofeuilleBtn.classList.remove('active');
    // Enlève la classe "active" du bouton Ciseaux de l'ordinateur
    ociseauxBtn.classList.remove('active');

    // Change le texte du message pour "À vous de jouer"
    message.textContent = "À vous de jouer";
};

// Pour chaque bouton dans la liste des boutons de joueur (btnJoueur)
// Ajoute un "écouteur" pour détecter les clics et appeler jouerManche
btnJoueur.forEach(btn =>  btn.addEventListener("click", jouerManche));

nextBtn.addEventListener("click" , prepareNouvelleManche);


