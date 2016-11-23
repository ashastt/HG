
var countries = [ "india", "canada", "mexico", "china", "japan", "maldives", "france",
 "germany", "greece", "hungary", "switzerland", "italy", "belgium"];

 var images =["hangman1.jpg", "hangman2.jpg", "hangman3.jpg", 
 "hangman4.jpg", "hangman5.jpg", "hangman6.jpg"];


var wordToPlay;
var wordLength;
var userGuess; 
var missedLetters;
var guessedLetters;


var wins = 0;
var losses = 0;
var chances;


//initialize game on load

function game(){
	resetVariables();

	wordToPlay = fetchRandomWord();	// Get a word from the countries object
	wordLength = wordToPlay.length;
	
	printPlaceHolder(wordToPlay); //create placeholder on screen
			
	document.onkeyup = function(event) {
		//String.fromCharCode(event.keyCode).toLowerCase();
		userGuess = event.key; //capture the letter keyed in
		console.log("Player guessed "+ userGuess);
		printWord(wordToPlay, userGuess); //check if char is in the word.	
	}
}


function printWord(word, char){

	// check if character typed is in word

	var isCharInWord = (word.indexOf(char) > -1);

	var filledWord = document.getElementById("word").innerHTML;

	if(isCharInWord){

		//fill in on screen
		fillInLetters(char, word);

		filledWord = fillInLetters(char,word);
		
		if(filledWord.indexOf("_") == -1){
			alert("You guessed the country '" + filledWord.toUpperCase() + "' right!");
 			document.getElementById("wins").innerHTML = ++wins;			
 			game();
 		}

	}else{

		//if missed letters

		//check if already in the missed array

		if(missedLetters.length > 0 && (missedLetters.indexOf(char) > -1)){
			console.log("Already in array");
			alert(" You have guessed this letter, try again!");
		}else{
			console.log("not in array");
			missedLetters.push(char);
			document.getElementById("chances").innerHTML = --chances;

			document.getElementById("hangman").src = 
			"assets/images/" + images[missedLetters.length];

			//append on screen
			var appendPicks = document.getElementById("misses");
			var content = document.createTextNode(userGuess + ", ");
			appendPicks.appendChild(content);
		}

		if(chances == 0 || (missedLetters.length == 6)){
			//if all chances are over
			alert("you have reached max chances, try a new word!");
			document.getElementById("losses").innerHTML = ++losses;
			//start game again
			game();

		}

	}

}

function fillInLetters(x, str){	
	
	var strHTML = document.getElementById("word").innerHTML;
 	strHTML = strHTML.split(" ");
 	for (var i=0; i<str.length ; i++){
 		if(str[i] === x){			
 			strHTML[i] = x;
 		}		
 	}

 	return document.getElementById("word").innerHTML= strHTML.join(" ");
 }   


 function resetVariables(){

 	missedLetters = [];
	guessedLetters =[];	

	chances = 6;
 	// document.getElementById("status").innerHTML = "Guess letters in the word";
 	document.getElementById("misses").innerHTML = "";
 	document.getElementById("word").innerHTML = "";
 	document.getElementById("chances").innerHTML = 6;

 }

 function fetchRandomWord(){
	var wordPicked = countries[(Math.floor(Math.random() * countries.length))];
	console.log("Guess this word : " + wordPicked);
	return wordPicked;  	
 }


function printPlaceHolder(word) {
   var str = [];
   for (var i = 0; i < word.length; i++) {
     str.push("_");
   }

    document.getElementById("word").textContent = str.join(" ");

}



 // function printWord2(word, char){
// 	var charInWord = word.indexOf(char);

// 	if (charInWord === -1){

// 		console.log(missedLetters);

// 	    console.log("char present?" + missedLetters.indexOf(char) + "--" + 
// 	    	(missedLetters.indexOf(char) > 0) + "length" + missedLetters.length);
// 	    //put in the missed array
// 	    missedLetters.push(char);
// 	    chances--;

// 	    if(missedLetters.length > 0){

// 	    }


	    
// 	    //Append to the letters picked earlier and display
// 	    if(missedLetters.length == 6){	    				
// 			alert("Sorry you failed to guess! Play again!");
// 			document.getElementById("losses").innerHTML = ++losses;
// 			game(); //start over game again.			

// 		}

// 		// else if((missedLetters.length > 0) missedLetters.indexOf(char) > 0){
// 		// 	console.log(missedLetters.indexOf(char));
// 		// 	alert("You have already guessed the letter!");

// 		// }

// 		else{
			
// 			var appendPicks = document.getElementById("misses");
// 			var content = document.createTextNode(userGuess + ", ");
// 			appendPicks.appendChild(content);
// 		}

// 		document.getElementById("chances").innerHTML = chances;
// 	}
// 	else{		 		
		
// 		var filledWord = fillInLetters(char,word);
		
// 		if(filledWord.indexOf("_") == -1){
//  			document.getElementById("wins").innerHTML = ++wins;
//  			alert("You win! Play again!");
//  			game();
//  		}

// 	} 
// }
