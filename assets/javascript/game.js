var countries = [ "india", "canada", "mexico", "china", "japan", "maldives", "france",
 "germany", "greece", "hungary", "switzerland", "italy", "belgium", "uruguay", 
 "argentina", "singapore", "brazil", "spain", "australia", "russia", "iran", "kenya", "malaysia", "thailand"];


var hangmanGame = {
	wins: 0,
	losses: 0,
	chances: 6,
	pickedWord : "",
	missedLetters: [],
	// guessedLetters: [],

	initGame: function(){
 		this.missedLetters = [];
		// this.guessedLetters =[];	
		this.chances = 6;

	 	getEl("misses").innerHTML = "";
	 	getEl("word").innerHTML = "";
	 	getEl("chances").innerHTML = this.chances;

	 	setTimeout('getEl("status").innerHTML = \"Press any Key to get Started!\"', 3000);
		setTimeout('getEl("status").style.color= \"#abbce9\"', 3000);
		setTimeout('getEl("hangman").src= \"assets/images/Hangman0.gif\"', 3000);

        this.pickedWord = 
        	countries[(Math.floor(Math.random() * countries.length))];

        this.printPlaceHolder(this.pickedWord);

	},

	printPlaceHolder: function(word){
		var str = [];
   		for (var i = 0; i < word.length; i++) {
     		str.push("_");
   		}
    	getEl("word").textContent = str.join(" ");
	},

	fillInLetters: function(char, word){
		var strHTML = getEl("word").innerHTML;
 		strHTML = strHTML.split(" "); //strHTML is an array
 		for (var i=0; i<word.length ; i++){
 			if(word[i] === char){			
 				strHTML[i] = char;
 			}		
 		}

 		var filledWord = strHTML.join(" ");

 		getEl("word").innerHTML = filledWord;

 		if(filledWord.indexOf("_") == -1){
 			getEl("wins").innerHTML = ++this.wins;
 			getEl("status").innerHTML = 
					"Yay! " + filledWord.toUpperCase() + " is right!";
			getEl("status").style.color = "green";
			getEl("hangman").src = "assets/images/Hangman-win.gif"	
			sound('win');	
			//start game again		
 			beginGame();
 		}

	},
	appendMissedLetters: function(char){

		if(this.missedLetters.length > 0 && 
						(this.missedLetters.indexOf(char) > -1)){
			getEl("status").innerHTML = 
				" You have already guessed " + char + "!";
			getEl("status").style.color = "red";	
			
			setTimeout('getEl("status").innerHTML = \"Press any Key to get Started!\"', 3000);
			setTimeout('getEl("status").style.color= \"#abbce9\"', 3000);	
		}else{

			var appendPicks = getEl("misses");
			var content = document.createTextNode(char + ", ");
			appendPicks.appendChild(content);

			this.missedLetters.push(char);
			getEl("chances").innerHTML = --this.chances;

			getEl("hangman").src = "assets/images/Hangman" + this.missedLetters.length + ".gif";

			if(hangmanGame.chances == 0 || (hangmanGame.missedLetters.length == 6)){

				getEl("status").innerHTML = 
					"You Lost! Try again!";
				getEl("status").style.color = "red";
				sound('lost');
				getEl("hangman").src = "assets/images/Hangman-lose.gif"	

				getEl("losses").innerHTML = ++this.losses;
				
				//start game again
				beginGame();

			}
		}
	}  

};

function getEl(el){
	return document.getElementById(el);
}

function beginGame(){
	
	hangmanGame.initGame();//initialize the page

	var wordToPlay = hangmanGame.pickedWord;

	document.onkeyup = function(event) {
		var guessedChar = '';

		if(event.keyCode >= 48 && event.keyCode <= 90){
			guessedChar = event.key.toLowerCase(); //capture the letter keyedin
		}else{
			alert("Select a letter between a-z");
		}	
			

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
    	audio.src = "assets/sounds/win.wav";
	}else if(str === "lost"){
		audio.src = "assets/sounds/lost.wav";
	}
    audio.play();   
}

