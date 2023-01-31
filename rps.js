// First I grab the relevant elements from HTML and save them as variables in JS:
const headerTextIntro = document.getElementById('header-text-intro');
const iceCream = document.getElementById('ice-cream');
const rockBtn = document.getElementById('id-rock');
const paperBtn = document.getElementById('id-paper');
const scissorsBtn = document.getElementById('id-scissors');
const showMoves = document.getElementById('show-moves');
const humMoveImg = document.getElementById('hum-move-img');
const humEndImg = document.getElementById('hum-end-img');
const showMovesText = document.getElementById('moves-text');
const comMoveImg = document.getElementById('com-move-img');
const comEndImg = document.getElementById('com-end-img');
const winnerRow = document.getElementById('winner-row');
const winnerText = document.getElementById('winner-text');
const scoreHum = document.getElementById('score-hum');
const scoreCom = document.getElementById('score-com');
const gameWinnerText = document.getElementById('game-winner-text');
const gameEndBtn = document.getElementById('game-end-btn');

// Here are some variables to keep track of the points for the human (hum)
//and for the computer/roommate (com).
let humPoints = 0;
let comPoints = 0;

// This array defines the available choices for both players.
const gameArray = ['rock', 'paper', 'scissors'];

//I also go ahead and define humIndex, which will hold the index value
// of the human move in the game.
let humIndex;

// This is a function that will be called in order to add/remove the animation classes
// for boththe hum and com on each click.
function animateMoves(imageClass, direction) {
	imageClass.classList.add(direction);
	imageClass.addEventListener('animationend', () => {
		imageClass.classList.remove(direction);
	});
}

// This will generate a random computer choice once called in one of the click events below
// It produces a number value of 0, 1 or 2, which corresponds to the length of the gameArray above.
function comResult() {
	let randNum = Math.floor(Math.random() * gameArray.length);
	return randNum;
}

//These are the event listeners for the three game buttons:
rockBtn.addEventListener('click', () => {
	showMovesText.textContent = '';
	winnerText.textContent = '';
	winnerText.classList.remove('fade-in-text');
	humIndex = gameArray.indexOf('rock');
	animateMoves(humMoveImg, 'animate-from-left');
	humMoveImg.src = 'images/rock-fist-hum.png';
	playRound();
});

paperBtn.addEventListener('click', () => {
	showMovesText.textContent = '';
	winnerText.textContent = '';
	winnerText.classList.remove('fade-in-text');
	humIndex = gameArray.indexOf('paper');
	animateMoves(humMoveImg, 'animate-from-left');
	humMoveImg.src = 'images/paper-hand-hum.png';
	playRound();
});

scissorsBtn.addEventListener('click', () => {
	showMovesText.textContent = '';
	winnerText.textContent = '';
	winnerText.classList.remove('fade-in-text');
	humIndex = gameArray.indexOf('scissors');
	animateMoves(humMoveImg, 'animate-from-left');
	humMoveImg.src = 'images/scissors-hand-hum.png';
	playRound();
});

// ---------- Below is where the real action starts. ----------

function playRound() {
	showMoves.classList.remove('hidden');

	//Here I define a variable for and call the comResult function from above.
	// This is how the computer(roommate) makes a "choice."
	const comIndex = comResult();

	// This switch statement takes the comIndex as an argument and
	// displays the appropriate hand symbol in the DOM.
	switch (comIndex) {
		case 0:
			comMoveImg.src = 'images/rock-fist-com.png';
			animateMoves(comMoveImg, 'animate-from-right');
			break;
		case 1:
			comMoveImg.src = 'images/paper-hand-com.png';
			animateMoves(comMoveImg, 'animate-from-right');
			break;
		case 2:
			comMoveImg.src = 'images/scissors-hand-com.png';
			animateMoves(comMoveImg, 'animate-from-right');
			break;
	}

	// Here I generate and display a text that summarizes the moves of each player.
	comMoveImg.addEventListener('animationend', () => {
		showMovesText.classList.add('fade-in-text');
		showMovesText.textContent = `You've gone with ${gameArray[humIndex]}. \n Your roomy has chosen ${gameArray[comIndex]}.`;
		showMovesText.addEventListener('animationend', () => {
			showMovesText.classList.remove('fade-in-text');
		});
	});

	// This is a switch function a) who won the round, and
	// b) the current points tally.
	let outcome = humIndex - comIndex;

	switch (outcome) {
		case 0:
			showMovesText.addEventListener('animationend', () => {
				winnerRow.classList.remove('hidden');
				winnerText.classList.add('fade-in-text');
				winnerText.textContent = `This round is a draw!`;
				scoreHum.textContent = `${humPoints}`;
				scoreCom.textContent = `${comPoints}`;
			});
			break;
		case -2:
		case 1:
			humPoints += 1;
			if (humPoints >= 3 || comPoints >= 3) {
				endOfGame();
			} else {
				showMovesText.addEventListener('animationend', () => {
					winnerRow.classList.remove('hidden');
					winnerText.classList.add('fade-in-text');
					winnerText.textContent = `You win this round!`;
					scoreHum.textContent = `${humPoints}`;
					scoreCom.textContent = `${comPoints}`;
				});
			}
			break;
		case -1:
		case 2:
			comPoints += 1;
			if (humPoints >= 3 || comPoints >= 3) {
				endOfGame();
			} else {
				showMovesText.addEventListener('animationend', () => {
					winnerRow.classList.remove('hidden');
					winnerText.classList.add('fade-in-text');
					winnerText.textContent = `Your roommate wins this round!`;
					scoreHum.textContent = `${humPoints}`;
					scoreCom.textContent = `${comPoints}`;
				});
			}
			break;
	}
}

// This function is triggered when either the human or the computer(roommate)
// get 3 points.
function endOfGame() {
	winnerText.style.display = 'none';
	gameWinnerText.classList.remove('hidden');
	winnerRow.classList.remove('hidden');
	rockBtn.classList.add('disabled');
	paperBtn.classList.add('disabled');
	scissorsBtn.classList.add('disabled');
	if (humPoints == 3) {
		gameWinnerText.classList.add('winner-text-animation');
		gameWinnerText.textContent = `You win the ice cream!`;
		endAnimation();
	} else if (comPoints == 3) {
		gameWinnerText.classList.add('winner-text-animation');
		gameWinnerText.textContent = `Oh no, your roomy wins!`;
		endAnimation();
	}
}

// This last animation sequence is triggered at the end,
// and also makes the "play again?" button appear towards the top.
function endAnimation() {
	animateIceCream3();
	iceCream.addEventListener('animationend', () => {
		iceCream.style.display = 'none';
		humMoveImg.style.display = 'none';
		comMoveImg.style.display = 'none';
		humEndImg.classList.remove('hidden');
		comEndImg.classList.remove('hidden');
		if (humPoints == 3) {
			humEndImg.src = 'images/hum-win-hand.png';
			humEndImg.classList.add('fade-in-winner');
			comEndImg.src = 'images/thumb-down-com-small-4.png';
			comEndImg.classList.add('fade-in-loser');
			headerTextIntro.style.display = 'none';
			gameEndBtn.classList.remove('d-none');
		} else if (comPoints == 3) {
			comEndImg.src = 'images/com-win-hand.png';
			comEndImg.classList.add('fade-in-winner');
			humEndImg.src = 'images/thumb-down-hum-small-4.png';
			humEndImg.classList.add('fade-in-loser');
			headerTextIntro.style.display = 'none';
			gameEndBtn.classList.remove('d-none');
		}
	});
}

/******************* Start sequence animations ***********************/
// Towards the bottom, because they can be!

function animateIceCream() {
	iceCream.src = 'images/ice-cream-stick.png';
	iceCream.classList.add('animate-ice-cream');
}

function animateIceCream2() {
	iceCream.classList.add('animate-ice-cream-shake');
}

function animateIceCream3() {
	iceCream.classList.add('animate-ice-cream-zoom');
}

function animateIntroText() {
	headerTextIntro.classList.remove('hidden');
	headerTextIntro.classList.add('slow-fade-in');
}

setTimeout(animateIceCream, 500);
setTimeout(animateIntroText, 1500);
setTimeout(animateIceCream2, 2500);
