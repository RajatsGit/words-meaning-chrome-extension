// Function to fetch data from the English API
function fetchEnglishDefinition(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    return fetch(apiUrl)
        .then(response => response.json());
}

// Function to fetch data from the Hindi API
// function fetchHindiDefinition(word) {
//     const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/hi/${word}`;

//     return fetch(apiUrl)
//         .then(response => response.json());
// }

// Function to display the result
function displayResults(englishData) {
    const englishMeaningElement = document.getElementById("englishMeaning");
    const audioContainer = document.getElementById("audioContainer");
    // const audioPlayer = document.getElementById("audioPlayer");
    audioContainer.style.display = "none";

    if (englishData.title === "No Definitions Found") {
        englishMeaningElement.innerHTML = "No English definitions found for this word.";
    } else {
        const englishMeanings = englishData[0].meanings;
        englishMeaningElement.innerHTML = "";

        englishMeanings.forEach(meaning => {
            const partOfSpeech = meaning.partOfSpeech;
            const definitions = meaning.definitions;
            englishMeaningElement.innerHTML += `<div class="meaning"><h3>${partOfSpeech}</h3>`;
            definitions.forEach((definition, index) => {
                englishMeaningElement.innerHTML += `<p>${index + 1}. ${definition.definition}</p>`;
            });
            englishMeaningElement.innerHTML += "</div>";
        });

        // const audioUrl = englishData[0].phonetics[0]?.audio || englishData[0]?.phonetic || "";
        // if (audioUrl) {
        //     audioPlayer.setAttribute("src", audioUrl);
        //     audioContainer.style.display = "block";
        // }
    }
}
// Function to handle the button click event
function handleButtonClick() {
    const inputElement = document.getElementById("myInput");
    const word = inputElement.value.trim();

    if (word === "") {
        alert("Please enter a word.");
        return;
    }

    Promise.all([fetchEnglishDefinition(word), 
        // fetchHindiDefinition(word)
    ])
        .then(([englishData, hindiData]) => {
            displayResults(englishData, hindiData);
        })
        .catch(error => {
            const englishMeaningElement = document.getElementById("englishMeaning");
            // const hindiMeaningElement = document.getElementById("hindiMeaning");
            englishMeaningElement.innerHTML = "Error occurred while fetching English data from the API.";
            // hindiMeaningElement.innerHTML = "Error occurred while fetching Hindi data from the API.";
        });
}

// Add event listener to the button
document.getElementById("myButton").addEventListener("click", handleButtonClick);
