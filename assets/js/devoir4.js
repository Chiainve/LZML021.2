/*
let chainel = "Chiara";

console.log(chainel);

chainel[3] = 'O';

console.log(chainel);
console.log(chainel[3]);
*/

/*
console.log(10 == '10');
console.log(10 ==='10');
*/



/*
let chaine2 = "C'était le meilleur des temps, c'était le pire des temps ; \n" +
"c'était l'âge de la sagesse, c'était l'âge de la folie ; c'était \n" +
"l'époque de la foi, c'était l'époque de l'incrédulité ; c'était la \n" +
"saison de la Lumière ; c'était la saison de l'Obscurité ; c'était \n" +
"le printemps de l'espoir, c'était l'heure du désespoir ; nous \n" +
"avions tout devant nous, nous n'avions rien devant nous ; \n" +
"nous devions tous aller directement au Ciel, nous devions \n" +
"tous prendre l'autre chemin ; bref, l'époque était tellement \n" +
"différente de celle que vous vivons aujourd'hui que quelques- \n" +
"unes des plus tapageuses autorités ne parlaient d'elles, que \n" +
"ce fut en bien ou en mal, qu'au superlatif.";

let compter = chaine2.length;

//Trouvez tous les mots de plus de 5 lettres non suivis d'un espace
let mots = chaine2.match(/\b\w{6,}\b(?!\s)/g);

console.log(compter)
console.log(mots)
console.log(chaine2)

// Supprimer toutes les occurrences de "[Cc]'était"
chaine2 = chaine2.replace(/[Cc]'était/g, "");

// Supprimer l'espace supplémentaire en début de phrase et mettre la première lettre en majuscule
chaine2 = chaine2.trim().replace(/(?:^|\.\s+)([a-z])/g, (match, lettre) => lettre.toUpperCase());

console.log(chaine2)
*/

let data = "Lepautre, Jean/MALE/Paris/17051999";

let premierSlash = data.indexOf("/");
let deuxiemeSlash = data.indexOf("/", premierSlash + 1);

console.log(deuxiemeSlash);

let troisiemeSlash = data.indexOf("/", deuxiemeSlash + 1);

let date = data.slice(troisiemeSlash + 1,  data.length );

console.log(date);

let jour = date.slice(0,2);
let mois = date.slice(2,4);
let annee = date.slice(4,8);

let date2 = annee + "-" + mois + "-" + jour + "." ;

console.log(date2);



