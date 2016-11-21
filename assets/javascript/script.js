
var countries = [ "india", "canada", "mexico", "china", "japan", "maldives", "france",
 "germany", "greece", "hungary", "switzerland", "italy", "belgium"];

var wordToPlay;
var wordLength;
var userGuess; 
var missedLetters;
var guessedLetters;


var wins = 0;
var losses = 0;


//initialize game on load

function game(){
	resetVariables();

	wordToPlay = fetchRandomWord();	// Get a word from the countries object
	wordLength = wordToPlay.length;
	
	printPlaceHolder(wordToPlay); //create placeholder on screen
			
	document.onkeyup = function(event) {
		userGuess = event.key; //capture the letter keyed in
		console.log(userGuess);
	
		printWord(wordToPlay, userGuess); //check if char is in the word.	
	}
}

function printWord(word, char){
	var charInWord = word.indexOf(char);	

	if (charInWord === -1){
	    //put in the missed array
	    missedLetters.push(char);
	    
	    //Append to the letters picked earlier and display
	    if(missedLetters.length === 6){	    	
	    	document.getElementById("losses").innerHTML = ++losses;			
			document.getElementById("status").innerHTML = "Sorry you failed to guess!"
			game(); //start over game again.			

		}else{
			var appendPicks = document.getElementById("misses");
			var content = document.createTextNode(userGuess + ", ");
			appendPicks.appendChild(content);
		}
	}
	else{		 		
		
		var filledWord = fillInLetters(char,word);
		alert(filledWord);
		
		if(filledWord.indexOf("_") == -1){
 			alert("You win!");
 			game();
 		}

	} 
}


function fillInLetters(x, str){	
	
	var strHTML = document.getElementById("word").innerHTML;
 	strHTML = strHTML.split("");
 	for (var i=0; i<str.length ; i++){
 		if(str[i] === x){			
 			strHTML[i] = x;
 		}		
 	}

 	return document.getElementById("word").innerHTML= strHTML.join("");
 }   

 function resetVariables(){
 	document.getElementById("status").innerHTML = "Guess the letters in the word";
 	document.getElementById("misses").innerHTML = "";
 	document.getElementById("word").innerHTML = "";

 	missedLetters = [];
	guessedLetters =[];	

 }

 function fetchRandomWord(){
	var wordPicked = countries[(Math.floor(Math.random() * countries.length))];
	console.log("Guess this word : " + wordPicked);
	return wordPicked;  	
 }


 function printPlaceHolder(word) {
   var str = "";
   for (var i = 0; i < word.length; i++) {
     str += "_";
   }
    document.getElementById("word").textContent = str;
}



 