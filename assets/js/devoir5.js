let poem = `à la musique

Sur la place taillée en mesquines pelouses,
Square où tout est correct, les arbres et les fleurs,
Tous les bourgeois poussifs qu'étranglent les chaleurs
Portent, les jeudis soirs, leurs bêtises jalouses.

- L'orchestre militaire, au milieu du jardin,
Balance ses schakos dans la Valse des fifres :
Autour, aux premiers rangs, parade le gandin ;
Le notaire pend à ses breloques à chiffres.

Des rentiers à lorgnons soulignent tous les couacs :
Les gros bureaux bouffis traînant leurs grosses dames
Auprès desquelles vont, officieux cornacs,
Celles dont les volants ont des airs de réclames ;

Sur les bancs verts, des clubs d'épiciers retraités
Qui tisonnent le sable avec leur canne à pomme,
Fort sérieusement discutent les traités,
Puis prisent en argent, et reprennent : " En somme !..."

Épatant sur son banc les rondeurs de ses reins,
Un bourgeois à boutons clairs, bedaine flamande,
Savoure son onnaing d'où le tabac par brins
Déborde - vous savez, c'est de la contrebande ; -

Le long des gazons verts ricanent les voyous ;
Et, rendus amoureux par le chant des trombones,
Très naïfs, et fumant des roses, les pioupious
Caressent les bébés pour enjôler les bonnes...

- Moi, je suis, débraillé comme un étudiant,
Sous les marronniers verts les alertes fillettes :
Elles le savent bien ; et tournent en riant,
Vers moi, leurs yeux tout pleins de choses indiscrètes.

Je ne dis pas un mot : je regarde toujours
La chair de leurs cous blancs brodés de mèches folles :
Je suis, sous le corsage et les frêles atours,
Le dos divin après la courbe des épaules.

J'ai bientôt déniché la bottine, le bas...
- Je reconstruis les corps, brûlé de belles fièvres.
Elles me trouvent drôle et se parlent tout bas...
- Et je sens les baisers qui me viennent aux lèvres."`; 


// Faire une Tableau des mots du poem
const words = poem.split(/\s+/);

// J'ai cree un dictionaire vide 
let dict = {};

// Boucles de 0 jusqu'a la fin du tableau applé words
for (let i=0; i < words.length; i++){
    // obtenir le mot à la position i de la liste de mots
    let w = words[i]
    // pour voir si le nom est a l'interieur du dictionaire
    if (w in dict){
        //j'ai rajouté 1 au mot w
        dict[w] = dict[w] + 1;
    // si le mot n'est pas dans le dictionaire
    }else {
        // rajouter le mot avec la valeur 1 
        dict[w] = 1;
    }
}

console.log (dict)

// Convertir le dictionnaire en un tableau de paires clé-valeur
const entries = Object.entries(dict);

// Trier le tableau en fonction des valeurs par ordre décroissant
entries.sort((a, b) => b[1] - a[1]);

// Obtenir les clés correspondant aux 5 premières entrées (clés avec les 5 plus grandes valeurs)
const keysWith5BiggestValues = entries.slice(0, 5).map(entry => entry[0]);

// les 5 mots les plus frequents [ 'les', 'des', 'le', 'de', 'à' ]
console.log(keysWith5BiggestValues);

//le nombre total de mots est 305 
console.log(words.length);

// Obtenir les clés avec la valeur un
const keysWithValueOne = Object.keys(dict).filter(key => dict[key] === 1);

//le nombre total de mots unique est 186
console.log(keysWithValueOne.length);

// Séparer la chaîne en une liste de chaînes de caractères par fin de ligne
const listOfStrings = poem.split(/\n(?=\S)/); 

//le totale des phrases dans le poeme sont 36 (37 avec le titre)
console.log(listOfStrings.length);

// Séparer la chaîne en une liste de paragraphes en utilisant des lignes vides comme séparateurs
const paragraphs = poem.split("\n\n");

// Diviser la chaîne par lignes et filtrer les lignes vides
const lines = poem.split("\n").filter(line => line.trim() !== '');

// Creer un dictionaire vide pour le paragraphs 
let dict2 = {};
// Creer un dictionaire vide pour le lignes
let dict3 = {};

//for(let i=0; i )
//j'ai commencé avec 1 parce que le titre n'est pas une strophe
for (let i=1; i < paragraphs.length; i++){
    // obtenir la strophe 
    let strophes = paragraphs[i];
    // obtenir les lignes dans la strophe
    let lignes = strophes.split("\n");
    // comter le nombre des lignes dans la strophe
    let numlign = lignes.length;
    // si le nombre des lignes on peut le voir dans le dictionaire 
    if (numlign in dict2){
        // mettre dans le tableau l'index de la strophe 
        dict2[numlign].push(i) ;
    }else{
        // mettre dans le tableau l'index de la strophe pour la premiere fois 
        dict2[numlign] = [i];
    }
}  

for (let i=1; i < lines.length; i++){
    // obtenir la ligne
    let line = lines[i];
    // Séparer la chaîne en syllabes (en supposant que chaque syllabe comporte 2 lettres)
    let syllabes = line.match(/.{1,2}/g);
    // comter le nombre des syllabes dans la strophe
    let numsyll = syllabes.length;
    // si le nombre des syllabes on peut le voir dans le dictionaire
    if (numsyll in dict3){
        // mettre dans le tableau l'index de la ligne
        dict3[numsyll].push(i) ;
    }else{
        // mettre dans le tableau l'index de la ligne pour la premiere fois
        dict3[numsyll] = [i];
    }
}

//le poem contient 9 strophes de 4 lignes [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log (paragraphs.length - 1);
console.log (dict2);

/* le poem contient 36 lignes dont 
    - une ligne contient 20 syllabes [15]
    - une ligne contient 21 syllabes [ 11, 29, 32, 33 ]
    - une ligne contient 22 syllabes [ 1, 8, 19, 25, 27 ]
    - une ligne contient 23 syllabes [5,  6,  7, 21, 23, 24, 31]
    - une ligne contient 24 syllabes [ 14, 17, 18, 22 ]
    - une ligne contient 25 syllabes [ 4, 12, 20, 26, 35 ]
    - une ligne contient 26 syllabes [ 9, 13, 34 ]
    - une ligne contient 27 syllabes [ 2, 3, 10, 36 ]
    - une ligne contient 28 syllabes [ 16, 28, 30 ]
*/
console.log (lines.length - 1);
console.log (dict3);