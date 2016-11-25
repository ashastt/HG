var countries = [ "india", "canada", "mexico", "china", "japan", "maldives", "france",
 "germany", "greece", "hungary", "switzerland", "italy", "belgium", "uruguay", 
 "argentina", "brazil", "spain", "australia", "russia"];

var hangmanGame = {
	wins: 0,
	losses: 0,
	chances: 6,
	pickedWord : "",
	missedLetters: [],
	guessedLetters: [],

	initGame: function(){
 		this.missedLetters = [];
		this.guessedLetters =[];	
		this.chances = 6;
 		// document.getElementById("status").innerHTML = "Guess letters in the word";
	 	document.getElementById("misses").innerHTML = "";
	 	document.getElementById("word").innerHTML = "";
	 	document.getElementById("chances").innerHTML = this.chances;

	 	setTimeout('document.getElementById("status").innerHTML = \"Press any Key to get Started!\"', 3000);
		setTimeout('document.getElementById("status").style.color= \"#abbce9\"', 3000);

	 	this.fetchRandomWord();
	},

	fetchRandomWord: function(){
		this.pickedWord = countries[(Math.floor(Math.random() * countries.length))];
		// return this.pickedWord;
	},
	printPlaceHolder: function(word){
		var str = [];
   		for (var i = 0; i < word.length; i++) {
     		str.push("_");
   		}
    	document.getElementById("word").textContent = str.join(" ");
	},
	fillInLetters: function(char, word){
		var strHTML = document.getElementById("word").innerHTML;
 		strHTML = strHTML.split(" "); //strHTML is an array
 		for (var i=0; i<word.length ; i++){
 			if(word[i] === char){			
 				strHTML[i] = char;
 			}		
 		}

 		var filledWord = strHTML.join(" ");

 		document.getElementById("word").innerHTML = filledWord;

 		if(filledWord.indexOf("_") == -1){
			// alert("You guessed the country '" + filledWord.toUpperCase() + "' right!");
 			document.getElementById("wins").innerHTML = ++this.wins;
 			document.getElementById("status").innerHTML = 
					"Yay! " + filledWord.toUpperCase() + " is right!";
			document.getElementById("status").style.color = "green";
			sound('win');			
 			beginGame();
 		}

	},
	appendMissedLetters: function(char){

		if(this.missedLetters.length > 0 && 
						(this.missedLetters.indexOf(char) > -1)){
			document.getElementById("status").innerHTML = 
				" You have already guessed " + char + "!";
			document.getElementById("status").style.color = "red";	
			
			setTimeout('document.getElementById("status").innerHTML = \"Press any Key to get Started!\"', 3000);
			setTimeout('document.getElementById("status").style.color= \"#abbce9\"', 3000);	
		}else{

			var appendPicks = document.getElementById("misses");
			var content = document.createTextNode(char + ", ");
			appendPicks.appendChild(content);

			this.missedLetters.push(char);
			document.getElementById("chances").innerHTML = --this.chances;

			if(hangmanGame.chances == 0 || (hangmanGame.missedLetters.length == 6)){

				document.getElementById("status").innerHTML = "You Lost! Try again!";				
				document.getElementById("status").style.color = "red";	
				document.getElementById("losses").innerHTML = ++this.losses;
				sound('lost');
				//start game again
				beginGame();

			}
		}
	}  

};

function beginGame(){
	
	hangmanGame.initGame();//initialize the page

	// var wordToPlay = hangmanGame.fetchRandomWord();//fetch a random country
	var wordToPlay = hangmanGame.pickedWord;
	
	hangmanGame.printPlaceHolder(wordToPlay);

	document.onkeyup = function(event) {
		
		var guessedChar = event.key.toLowerCase(); //capture the letter keyedin	

		console.log("guessedChar =" + guessedChar +"\n Wordtoplay=" + wordToPlay);		

		if(wordToPlay.indexOf(guessedChar) > -1){	
			hangmanGame.fillInLetters(guessedChar, wordToPlay);

		}else{
			hangmanGame.appendMissedLetters(guessedChar);
		}
	}

}

function sound(str){
    var audio = document.createElement("audio");
    if(str ==="win"){
    	audio.src = "assets/images/win.wav";
	}else if(str === "lost"){
		audio.src = "assets/images/lost.wav";
	}
    // audio.addEventListener("ended", function () {
    //     document.removeChild(this);
    // }, false);
    audio.play();   
}





/* -----------working code below without using objects ----------------------*/

// var countries = [ "india", "canada", "mexico", "china", "japan", "maldives", "france",
//  "germany", "greece", "hungary", "switzerland", "italy", "belgium"];

//  var images =["hangman1.jpg", "hangman2.jpg", "hangman3.jpg", 
//  "hangman4.jpg", "hangman5.jpg", "hangman6.jpg"];


// var wordToPlay;
// var wordLength;
// var userGuess; 
// var missedLetters;
// var guessedLetters;


// var wins = 0;
// var losses = 0;
// var chances;


// //initialize game on load

// function game(){
// 	resetVariables();

// 	wordToPlay = fetchRandomWord();	// Get a word from the countries object
// 	wordLength = wordToPlay.length;
	
// 	printPlaceHolder(wordToPlay); //create placeholder on screen
			
// 	document.onkeyup = function(event) {
// 		//String.fromCharCode(event.keyCode).toLowerCase();
// 		userGuess = event.key; //capture the letter keyed in
// 		console.log("Player guessed "+ userGuess);
// 		printWord(wordToPlay, userGuess); //check if char is in the word.	
// 	}
// }


// function printWord(word, char){

// 	// check if character typed is in word

// 	var isCharInWord = (word.indexOf(char) > -1);

// 	var filledWord = document.getElementById("word").innerHTML;

// 	if(isCharInWord){

// 		//fill in on screen
// 		fillInLetters(char, word);

// 		filledWord = fillInLetters(char,word);
		
// 		if(filledWord.indexOf("_") == -1){
// 			alert("You guessed the country '" + filledWord.toUpperCase() + "' right!");
//  			document.getElementById("wins").innerHTML = ++wins;			
//  			game();
//  		}

// 	}else{

// 		//if missed letters

// 		//check if already in the missed array

// 		if(missedLetters.length > 0 && (missedLetters.indexOf(char) > -1)){
// 			console.log("Already in array");
// 			alert(" You have guessed this letter, try again!");
// 		}else{
// 			console.log("not in array");
// 			missedLetters.push(char);
// 			document.getElementById("chances").innerHTML = --chances;

// 			// document.getElementById("hangman").src = 
// 			// "assets/images/" + images[missedLetters.length];

// 			//append on screen
// 			var appendPicks = document.getElementById("misses");
// 			var content = document.createTextNode(userGuess + ", ");
// 			appendPicks.appendChild(content);
// 		}

// 		if(chances == 0 || (missedLetters.length == 6)){
// 			//if all chances are over
// 			alert("you have reached max chances, try a new word!");
// 			document.getElementById("losses").innerHTML = ++losses;
// 			//start game again
// 			game();

// 		}

// 	}

// }

// function fillInLetters(x, str){	
	
// 	var strHTML = document.getElementById("word").innerHTML;
//  	strHTML = strHTML.split(" ");
//  	for (var i=0; i<str.length ; i++){
//  		if(str[i] === x){			
//  			strHTML[i] = x;
//  		}		
//  	}

//  	return document.getElementById("word").innerHTML= strHTML.join(" ");
//  }   


//  function resetVariables(){

//  	missedLetters = [];
// 	guessedLetters =[];	

// 	chances = 6;
//  	// document.getElementById("status").innerHTML = "Guess letters in the word";
//  	document.getElementById("misses").innerHTML = "";
//  	document.getElementById("word").innerHTML = "";
//  	document.getElementById("chances").innerHTML = 6;

//  }

//  function fetchRandomWord(){
// 	var wordPicked = countries[(Math.floor(Math.random() * countries.length))];
// 	console.log("Guess this word : " + wordPicked);
// 	return wordPicked;  	
//  }


// function printPlaceHolder(word) {
//    var str = [];
//    for (var i = 0; i < word.length; i++) {
//      str.push("_");
//    }

//     document.getElementById("word").textContent = str.join(" ");

// }



//  