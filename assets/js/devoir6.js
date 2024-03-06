const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;

function syllabify(words) {
    return words.match(syllableRegex);
}

function analyzeWords(words){
    //chaine principal
    let finalStr = "";


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

    // Convertir le dictionnaire en un tableau de paires clé-valeur
    const entries = Object.entries(dict);
    // Trier le tableau en fonction des valeurs par ordre décroissant
    entries.sort((a, b) => b[1] - a[1]);
    // Obtenir les clés correspondant aux 5 premières entrées (clés avec les 5 plus grandes valeurs)
    const keysWith10BiggestValues = entries.slice(0, 10).map(entry => entry[0]);

    finalStr += `les 10 mots les plus frequents sont: ${keysWith10BiggestValues.join(", ")}\n`;

    // Obtenir les clés avec la valeur un
    const keysWithValueOne = Object.keys(dict).filter(key => dict[key] === 1);

    //calculate la richesse lexicale
    let richLex = keysWithValueOne.length / words.length * 100;

    finalStr += `la richesse lexicale est: ${richLex}%\n`;

    return finalStr
}


function averageWordsLine(lines){

    //chaine principal
    let finalStr = "";
    
    //j'ai commencé avec 1 parce que le titre n'est pas une ligne
    for (let i=1; i < lines.length; i++){
        // obtenir la ligne
        let line = lines[i];
        // diviser les lignes par les mots
        let words = line.split(/\s+/);
        sum = 0
        for (let i=0; i < words.length; i++){
            // obtenir le mot
            let word = words[i];
            // obtenir le numero des lettres et somme 
            sum = sum + word.length
        }
        let average = sum / words.length;

        finalStr += `la longueur moyenne des mots dans la phrase ${i} est: ${average}\n`;
        
    }
    
    return finalStr

}

function typologyParagraph(paragraphs){

    //chaine principal
    let finalStr = "";

    // Creer un dictionaire vide pour le paragraphs 
    let dict2 = {};
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

    finalStr += `ce poeme contien ${paragraphs.length - 1} strophes:\n`

    for(let key in dict2){
        finalStr += `${dict2[key].length} strophes de ${key} vers\n`
    }

    return finalStr

}


function typologyLines(lines){

    //chaine principal
    let finalStr = "";

    // Creer un dictionaire vide pour le paragraphs 
    let dict3 = {};
    //j'ai commencé avec 1 parce que le titre n'est pas une ligne
    for (let i=1; i < lines.length; i++){
        // obtenir la ligne
        let line = lines[i];
        // diviser les lignes par les mots
        let words = line.split(/\s+/);
        //pour chaque mot, compter syllables
        let numsyll = 0;
        for (let i=0; i < words.length; i++){
            let syllables = syllabify(words[i]) || [];
            numsyll = numsyll + syllables.length;
        }
        // si le nombre des syllabes on peut le voir dans le dictionaire
        if (numsyll in dict3){
            // mettre dans le tableau l'index de la ligne
            dict3[numsyll].push(i) ;
        }else{
            // mettre dans le tableau l'index de la ligne pour la premiere fois
            dict3[numsyll] = [i];
        }
    }

    finalStr += `ce poeme contien ${lines.length - 1} vers:\n`

    for(let key in dict3){
       finalStr += `${dict3[key].length} vers de ${key} syllables\n`
    }

    return finalStr

}


function main(){
    //chaine principal
    let finalStr = "";

    //Obtenir le poem en Html
    var poem = document.getElementById("poeme").value;

    // Faire une Tableau des mots du poems (sans [?,:;.-])
    const words = (poem.replace(/[?,:;.-]/g, '')).split(/\s+/);
    // Diviser la chaîne par lignes et filtrer les lignes vides (sans [?,:;.-])
    const lines = (poem.replace(/[?,:;.-]/g, '')).split("\n").filter(line => line.trim() !== '');
    // Séparer la chaîne en une liste de paragraphes en utilisant des lignes vides comme séparateurs (sans [?,:;.-])
    const paragraphs = (poem.replace(/[?,:;.-]/g, '')).split("\n\n");

    // exercices 1 et 2
    finalStr += analyzeWords(words);
    // exercices 3
    finalStr += `le nombre de phrase est: ${lines.length - 1}\n`;
    // exercices 4
    finalStr += averageWordsLine(lines)
    finalStr += "///////////////////////////////////////////////////////////\n"
    // exercices 5
    finalStr += typologyParagraph(paragraphs)
    finalStr += "///////////////////////////////////////////////////////////\n"
    // exercices 6
    finalStr += typologyLines(lines)
    finalStr += "///////////////////////////////////////////////////////////\n"

    //demontre le resultat en Html
    document.getElementById("info").innerText = finalStr

}

let poem = `A la musique

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


let poem2 = `La Ballade des pendus

Frères humains qui après nous vivez,
N’ayez pas vos cœurs durcis à notre égard,
Car, si pitié de nous pauvres avez,
Dieu en aura plus tôt de vous merci.
Vous nous voyez attachés ici, cinq, six :
Quant à notre chair, que nous avons trop nourrie,
Elle est depuis longtemps dévorée et pourrie,
Et nous, les os, devenons cendre et poussière.
De notre malheur, que personne ne se moque,
Mais priez Dieu que tous nous veuille absoudre !

Si nous vous appelons frères, vous n’en devez
Avoir dédain, bien que nous ayons été tués
Par justice. Toutefois vous savez
Que tous les hommes n’ont pas l’esprit bien rassis.
Excusez-nous, puisque nous sommes trépassés,
Auprès du fils de la Vierge Marie,
De façon que sa grâce ne soit pas tarie pour nous,
Et qu’il nous préserve de la foudre infernale.
Nous sommes morts, que personne ne nous tourmente,
Mais priez Dieu que tous nous veuille absoudre !

La pluie nous a lessivés et lavés
Et le soleil nous a séchés et noircis ;
Pies, corbeaux nous ont crevé les yeux,
Et arraché la barbe et les sourcils.
Jamais un seul instant nous ne sommes assis ;
De ci de là, selon que le vent tourne,
Il ne cesse de nous ballotter à son gré,
Plus becquétés d’oiseaux que dés à coudre.
Ne soyez donc de notre confrérie,
Mais priez Dieu que tous nous veuille absoudre !

Prince Jésus qui a puissance sur tous,
Fais que l’enfer n’ait sur nous aucun pouvoir :
N’ayons rien à faire ou à solder avec lui.
Hommes, ici pas de plaisanterie,
Mais priez Dieu que tous nous veuille absoudre.`;


let poem3 = `À celle qu’on dit froide

Tu n’es pas la plus amoureuse
De celles qui m’ont pris ma chair ;
Tu n’es pas la plus savoureuse
De mes femmes de l’autre hiver.

Mais je t’adore tout de même !
D’ailleurs ton corps doux et bénin
A tout, dans son calme suprême,
De si grassement féminin,

De si voluptueux sans phrase,
Depuis les pieds longtemps baisés
Jusqu’à ces yeux clairs pur d’extase,
Mais que bien et mieux apaisés !

Depuis les jambes et les cuisses
Jeunettes sous la jeune peau,
A travers ton odeur d’éclisses
Et d’écrevisses fraîches, beau,

Mignon, discret, doux, petit Chose
A peine ombré d’un or fluet,
T’ouvrant en une apothéose
A mon désir rauque et muet,

Jusqu’aux jolis tétins d’infante,
De miss à peine en puberté,
Jusqu’à ta gorge triomphante
Dans sa gracile venusté,

Jusqu’à ces épaules luisantes,
Jusqu’à la bouche, jusqu’au front
Naïfs aux mines innocentes
Qu’au fond les faits démentiront,

Jusqu’aux cheveux courts bouclés comme
Les cheveux d’un joli garçon,
Mais dont le flot nous charme, en somme,
Parmi leur apprêt sans façon,

En passant par la lente échine
Dodue à plaisir, jusques au
Cul somptueux, blancheur divine,
Rondeurs dignes de ton ciseau,

Mol Canova ! jusques aux cuisses
Qu’il sied de saluer encor,
Jusqu’aux mollets, fermes délices,
Jusqu’aux talons de rose et d’or !

Nos nœuds furent incoërcibles ?
Non, mais eurent leur attrait leur.
Nos feux se trouvèrent terribles ?
Non, mais donnèrent leur chaleur.

Quant au Point, Froide ? Non pas, Fraîche.
Je dis que notre « sérieux »
Fut surtout, et je m’en pourlèche,
Une masturbation mieux,

Bien qu’aussi bien les prévenances
Sussent te préparer sans plus,
Comme l’on dit, d’inconvenances,
Pensionnaire qui me plus.

Et je te garde entre mes femmes
Du regret non sans quelque espoir
De quand peut-être nous aimâmes
Et de sans doute nous ravoir.`;
