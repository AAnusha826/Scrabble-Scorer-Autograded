// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
//the object represents the scrabble scoring system where each key is a point value and the corresponding array contains letters that are worht that may points
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";
 

	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some Scrabble!\n");
  let userWord = input.question("Enter a word to score: ");
  return userWord;
}

//let newPointStructure;

let simpleScorer = function(word) {
           return word.length;
}
function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
     if (['A', 'E', 'I', 'O', 'U'].includes(word[i])) {
       score += 3;
     } else {
       score += 1;
     }
   }
   return score;
 }


 function transform(oldPointStructure) { 
   let newPointStructure = {};
   for (const pointValue in oldPointStructure) {
     oldPointStructure[pointValue].forEach(letter => {
       newPointStructure[letter.toLowerCase()] = Number(pointValue);
});
   }
   return newPointStructure;
}
let newPointStructure = transform(oldPointStructure);

function scrabbleScorer(word) {
  word = word.toLowerCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
 
     score += newPointStructure[word[i]];
 
   }
 return score;
 }

const scoringAlgorithms = [ 
   { name: "Simple", description: "One point per character", scorerFunction: simpleScorer },
   { name: "Vowel Bonus", description: "Vowels are worth 3 points", scorerFunction: vowelBonusScorer },
   { name: "Scrabble", description: "Uses scrabble point system", scorerFunction: scrabbleScorer }
 ];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?\n");
   scoringAlgorithms.forEach((algorithm, index) => {
     console.log(`${index} - ${algorithm.name}: ${algorithm.description}`);
   });
   let algorithmChoice = input.question("Enter 0, 1, or 2: ");
   return scoringAlgorithms[algorithmChoice];
 }

function runProgram() {
   //initialPrompt();
   let word = initialPrompt();
   let scoringAlgorithm = scorerPrompt();
  console.log(`Score for '${word}': ${scoringAlgorithm.scorerFunction(word)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};