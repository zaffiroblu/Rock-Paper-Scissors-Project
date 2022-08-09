// Here are some vars to keep track of the points for the human and for the computer.
var humPoints = 0;
var comPoints = 0;

// This defines the available choices for both players.
var gameArray = ['rock', 'paper', 'scissors'];

//Alright, now it's time for a fancy UI!
// First I need to grab the buttons from the HTML and save them as variables in JS:
const rockBtn = document.getElementById('rocky');
const paperBtn = document.getElementById('papery');
const scissorsBtn = document.getElementById('scissory');

//And define humIndex.
let humIndex;

// This will generate a random computer choice once called in one of the click events below
//(This produced a number value of 0, 1 or 2, which corresponds to the length of the gameArray.)
function comResult() {
	let randNum = Math.floor(Math.random() * gameArray.length);
	return randNum;
}

//These are the event listeners for my buttons:
rockBtn.addEventListener('click', () => {
	humIndex = gameArray.indexOf('rock');
	playRound();
});

paperBtn.addEventListener('click', () => {
	humIndex = gameArray.indexOf('paper');
	playRound();
});

scissorsBtn.addEventListener('click', () => {
	humIndex = gameArray.indexOf('scissors');
	playRound();
});

// -------------------------- Below is where the real action starts.

function playRound() {
	console.log(humIndex);
	//Here I call the comResult from above.
	let comIndex = comResult();
	// This is just to make sure things are working for now.
	console.log(comIndex);
	// These are the feedback texts.
	console.log(`You've gone with ${gameArray[humIndex]}.`);
	console.log(`I've chosen ${gameArray[comIndex]}.`);
	let outcome = humIndex - comIndex;
	console.log(outcome);
	// This is a switch function that returns who won the round.
	switch (outcome) {
		case 0:
			console.log('This round is a draw.');
			break;
		case -2:
		case 1:
			console.log('You win this round!');
			humPoints += 1;
			break;
		case -1:
		case 2:
			console.log('I win this round!');
			comPoints += 1;
			break;
		default:
			console.log(
				"You're wasting my computing power. PLEASE choose either rock, paper, or scissors now."
			);
	}
	console.log(`The score is ${humPoints} to ${comPoints}. Let's keep going!`);

	if (humPoints < 3 || comPoints < 3) {
		// This calls the "endofGame" function.
		endOfGame();
	}
}

function endOfGame() {
	if (humPoints == 3) {
		console.log(
			"Yes indeed, you've gotten to 3 points before I could. You win the game! Congrats."
		);
	} else if (comPoints == 3) {
		console.log(
			"Well well well, it seems I've gotten to 3 points before you. You lose the game! So sorry about that."
		);
	}
}

// OLD CODE FROM FIRST VERSION: This lets the human input something.
// let humanPlay = prompt('Choose one.').toLowerCase();

// This converts the human's string choice to a number.
// function convertPlay(input) {
//index = gameArray.indexOf(input);
//if (index === -1) {
// 	console.log(
// 		"Um, hang on... why didn't you choose rock, paper, or scissors?"
// 	);
// } else {
// return index;
// }

// This gives the human the feedback of their choice (i.e. feedback text).
//console.log(`You've gone with ${humanPlay}.`);

// This logs the computer's choice.
//console.log(`I've chosen ${computerPlay}.`);

// This assigns a variable to the convertPlay function and input for the human's choice.
// I am doing this because I just want it to look cleaner later on down the line.
// let humResult = convertPlay(humanPlay);

// This converts the number from right above in comResult (0, 1, or 2) to the string in the gameArray
// (More precisely, to the words "rock," "paper," or "scissors.")
// let computerPlay = gameArray[comResult];

// This subtracts the computer's number result from the human's.
// let humMinusCom = humResult - comResult;

// This is a switch function that returns who won the round.
// 	switch (humMinusCom) {
// 		case 0:
// 			console.log('This round is a draw.');
// 			break;
// 		case -2:
// 		case 1:
// 			console.log('You win this round!');
// 			humPoints += 1;
// 			break;
// 		case -1:
// 		case 2:
// 			console.log('I win this round!');
// 			comPoints += 1;
// 			break;
// 		default:
// 			console.log(
// 				"You're wasting my computing power. PLEASE choose either rock, paper, or scissors now."
// 			);
//}

// This is a loop that plays the function "playRound" until someone reaches 3 points,
// and it also logs the score after each round.
// while (humPoints < 3 && comPoints < 3) {
// 	console.log(
// 		`The score is ${humPoints} to ${comPoints}. Click to play again!`
// 	);
// }

// do {
// 	console.log(
// 		`The score is ${humPoints} to ${comPoints}. Click to play again!`
// 	);
// } while (humPoints < 3 && comPoints < 3);

// This is a function that announces the winner of the game.
