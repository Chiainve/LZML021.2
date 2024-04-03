
window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');
    //get the button identifier
    let segmButton = document.getElementById('segmButton');
    //get the display of the analysis
    let pageAnalysis = document.getElementById('page-analysis');
    // Get the pole input
    let poleInput = document.getElementById('poleID');
    // Get the length input
    let lengthInput = document.getElementById('lgID');


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

    coOccur.addEventListener('click', function() {
        // Get the string from pole
        poleValue = poleInput.value.trim();
        // Get the string from length
        lengthValue = lengthInput.value.trim();
        // Get the string from the file display area
        text = fileDisplayArea.innerText;

        if(poleValue === ''){
            alert('Entrez une valeur dans le champ "Pole" :)');
        }else if(lengthValue === ''){
            alert('Entrez une valeur dans le champ "Longueur" :)');
        }else if(text === ''){
            alert('Choisissez un fichier :)');
        }else{
            // Get the delimiters and convert to string of characters
            delimiters = delimID.value.split('');
            // convert text into list of word
            listWords = tokenization(text, delimiters);

            if(!listWords.includes(poleValue)){
                alert("Le mot n'est pas dans le texte :(");
            }else{
                //get the dictionary
                dict = coOccurrence(listWords, poleValue, parseInt(lengthValue));

                // Create a table element
                let table = document.createElement('table');
                // Collapse borders
                table.style.borderCollapse = 'collapse'; 

                // Add the header row with titles T1, T2, and T3
                let headerRow = table.insertRow();
                addHeaderCell(headerRow, 'Cooccurrent(s)');
                addHeaderCell(headerRow, `Co-fréquence`);
                addHeaderCell(headerRow, 'Fréquence gauche');
                addHeaderCell(headerRow, '% Fréquence gauche');
                addHeaderCell(headerRow, 'Fréquence droite');
                addHeaderCell(headerRow, '% Fréquence droite');

                for (let key in dict){
                    val = dict[key];
                    let row = table.insertRow();
                    addCell(row, `${key}`);
                    addCell(row, `${val[0]}`);
                    addCell(row, `${val[1]}`);
                    addCell(row, `${val[1] / val[0] * 100}`);
                    addCell(row, `${val[2]}`);
                    addCell(row, `${val[2] / val[0] * 100}`);

                }

                // Clear previous content
                pageAnalysis.innerHTML = "";
                // Append the table to the pageAnalysis div
                pageAnalysis.appendChild(table);
            }
        }

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
function tokenization(str, delimiters) {
    const words = [];
    let currentWord = '';

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        
        if (delimiters.includes(char) || char === '\n') {
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
    listWords = tokenization(text, delimiters);

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


function coOccurrence(listWords, word, lengthVal){

    //find index 
    index = listWords.indexOf(word);

    //find the elements on the right and on the left
    //if the interval is outside the list, then take 0 or the length of the list
    left = listWords.slice( Math.max(0, index - lengthVal),  index);
    right = listWords.slice(index + 1, Math.min(listWords.length , index + lengthVal + 1));

    //create a dictionary to store the statistics for each co-ocurrence
    //key = co-occurrence value = [cofreq, freqLeft, freqRight]
    dict = {};

    //populate dictionary with elements on the left
    for (let i = 0; i < left.length; i++) {
        occurrence = left[i];
        if(occurrence in dict){
            //update the value
            list = dict[occurrence];
            list[0] = list[0] + 1;
            list[1] = list[1] + 1;
            dict[occurrence] = list;
        }else{
            //create the value
            dict[occurrence] = [1, 1, 0];
        }
    }

    //populate dictionary with elements on the right
    for (let i = 0; i < right.length; i++) {
        occurrence = right[i];
        if(occurrence in dict){
            //update the value
            list = dict[occurrence];
            list[0] = list[0] + 1;
            list[2] = list[2] + 1;
            dict[occurrence] = list;
        }else{
            //create the value
            dict[occurrence] = [1, 0, 1];
        }
    }

    //return the dictionary
    return dict;
}

