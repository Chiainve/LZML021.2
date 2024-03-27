
window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');
    //get the button identifier
    let segmButton = document.getElementById('segmButton');
    //get the display of the analysis
    let pageAnalysis = document.getElementById('page-analysis');


    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {
        // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
        // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
        // On peut potentiellement donner plusieurs fichiers,
        // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let file = fileInput.files[0];
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            var reader = new FileReader();

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
                
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);    

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });

    segmButton.addEventListener('click', function() {
        // Get the string from the file display area
        text = fileDisplayArea.innerText;
        // Get the delimiters and convert to string of characters
        delimiters= delimID.value.split('');
        //get the results of the segmentation function
        segRes = segmentation(text, delimiters);
        //display the number of words
        pageAnalysis.innerText = `Le nombre total du texte est: ${segRes[0]}`;

         // Create a table element
         let table = document.createElement('table');
         // Collapse borders
         table.style.borderCollapse = 'collapse'; 

        // Add the header row with titles T1, T2, and T3
        let headerRow = table.insertRow();
        addHeaderCell(headerRow, 'Nombre de caractères');
        addHeaderCell(headerRow, `Nombre d'occurences`);
        addHeaderCell(headerRow, 'Forme(s) unique(s)');

        // Convert the dictionary into an array of key-value pairs
        let keyValueArray = Object.entries(segRes[1]);

        // Sort the array based on the numeric keys
        keyValueArray.sort((a, b) => a[0] - b[0]);
        // Iterate over the sorted array
        for (let [key, value] of keyValueArray) {
            
            let row = table.insertRow();
            addCell(row, `${key}`);
            addCell(row, `${value[0]}`);
            addCell(row, `${printWords(value[1])}`);
        }

        // Append the table to the pageAnalysis div
        pageAnalysis.appendChild(table);


    });
}

// Function to add a header cell to the table
function addHeaderCell(row, text) {
    let cell = row.insertCell();
    cell.innerText = text;
    cell.style.border = '1px solid black'; // Add borders to the cell
}

// Function to add a cell to the table
function addCell(row, text) {
    let cell = row.insertCell();
    cell.innerText = text;
    cell.style.border = '1px solid black'; // Add borders to the cell
}

//function to print list of words with the number
function printWords(wordsSet){

    str = "";
    for (let item of wordsSet) {
        str += `${item} `
    }
    str += `(${wordsSet.size})`;
    return str;
}

//separate the string of the file into a list of words given the characters
function splitStringWithDelimiters(str, delimiters) {
    const words = [];
    let currentWord = '';

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        
        if (delimiters.includes(char)) {
            if (currentWord !== '') {
                words.push(currentWord);
                currentWord = '';
            }
        } else {
            currentWord += char;
        }
    }
    
    // Add the last word if it's not empty
    if (currentWord !== '') {
        words.push(currentWord);
    }

    return words;
}


function segmentation(text, delimiters){
    // convert text into list of word
    listWords = splitStringWithDelimiters(text, delimiters);

    //total number of words
    numberWords = listWords.length;
    //create a dictionary 
    dict = {};

    for(i = 0; i < numberWords; i++){
        //get the word
        word = listWords[i];
        
        if(word.length in dict){
            //if the number of characters is in the dictionary add 1 to the occurences and add the word to the list 
            dict[word.length][0] = dict[word.length][0] + 1;
            dict[word.length][1].add(word)
        }else{
            //if the number of characters is not in the dictionary set 1 to the occurences and the word 
            //use set to avoid repetitions
            value = [1, new Set([word])];
            dict[word.length]=value;
        }
    }

    //return the number of words and the dictionary
    return [numberWords, dict];
}




