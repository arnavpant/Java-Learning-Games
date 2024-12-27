let wordBank = [];
const maxGuesses = 6;
let currentWord = '';
let currentGuess = '';
let guessCount = 0;
let currentWordLength = 5; // Default word length

// Load words based on the selected length
async function loadWordBank(wordLength) {
  try {
    const response = await fetch(`../assets/words_length_${wordLength}.json`);
    wordBank = await response.json();
    setupGame();
  } catch (error) {
    console.error('Failed to load word bank:', error);
    alert('Error loading word bank. Please try again.');
  }
}

// Change word length and reload game
function changeWordLength() {
  const wordLengthSelect = document.getElementById('word-length');
  currentWordLength = parseInt(wordLengthSelect.value, 10);
  loadWordBank(currentWordLength);
}

// Setup the game
function setupGame() {
  currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  console.log(`The word is: ${currentWord}`); // Debugging
  document.getElementById('solution-display').textContent = `Solution: ${currentWord}`;
  guessCount = 0;
  currentGuess = '';
  createGrid();
  attachKeyboardListener();
}

function createGrid() {
  const gridContainer = document.getElementById('grid-container');
  gridContainer.innerHTML = '';

  // Adjust grid columns to match the word length
  gridContainer.style.gridTemplateColumns = `repeat(${currentWordLength}, 1fr)`;

  // Create tiles for guesses
  for (let i = 0; i < maxGuesses * currentWordLength; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.setAttribute('id', `tile-${i}`);
    gridContainer.appendChild(tile);
  }
}

function updateGrid() {
  const startIndex = guessCount * currentWordLength;
  for (let i = 0; i < currentWordLength; i++) {
    const tile = document.getElementById(`tile-${startIndex + i}`);
    tile.textContent = currentGuess[i] || ''; // Clear tiles for unused letters
  }
}

// Attach a single keyboard event listener
function attachKeyboardListener() {
  // Remove existing listener to prevent duplicates
  document.removeEventListener('keydown', handleKeyboardInput);

  // Add a single event listener
  document.addEventListener('keydown', handleKeyboardInput);
}

function handleKeyboardInput(event) {
  if (event.key === 'Enter') {
    handleEnter();
  } else if (event.key === 'Backspace') {
    handleBackspace();
  } else if (event.key.match(/^[a-zA-Z]$/)) {
    handleLetterInput(event.key.toLowerCase());
  }
}

function handleLetterInput(letter) {
  if (currentGuess.length < currentWordLength) {
    currentGuess += letter; // Add letter to the current guess
    updateGrid(); // Update the grid visually
  }
}

function handleBackspace() {
  if (currentGuess.length > 0) {
    currentGuess = currentGuess.slice(0, -1); // Remove the last letter
    updateGrid(); // Update the grid visually
  }
}

function handleEnter() {
  if (currentGuess.length !== currentWordLength) {
    alert('Not enough letters!');
    return;
  }

  checkGuess();
}

function checkGuess() {
  const startIndex = guessCount * currentWordLength;
  const wordLetterCount = {}; // To track available letters in the word

  // Count occurrences of each letter in the currentWord
  for (let letter of currentWord) {
    wordLetterCount[letter] = (wordLetterCount[letter] || 0) + 1;
  }

  // Step 1: Mark correct letters (green)
  for (let i = 0; i < currentWordLength; i++) {
    const tile = document.getElementById(`tile-${startIndex + i}`);
    if (currentGuess[i] === currentWord[i]) {
      tile.classList.add('correct'); // Mark as green
      wordLetterCount[currentGuess[i]]--; // Decrease available count for this letter
    }
  }

  // Step 2: Mark present letters (yellow)
  for (let i = 0; i < currentWordLength; i++) {
    const tile = document.getElementById(`tile-${startIndex + i}`);
    // Skip if already marked as correct
    if (tile.classList.contains('correct')) continue;

    if (currentWord.includes(currentGuess[i]) && wordLetterCount[currentGuess[i]] > 0) {
      tile.classList.add('present'); // Mark as yellow
      wordLetterCount[currentGuess[i]]--; // Decrease available count for this letter
    } else {
      tile.classList.add('absent'); // Mark as gray
    }
  }

  // Check if the guess is correct
  if (currentGuess === currentWord) {
    setTimeout(() => alert('You guessed it!'), 500);
    return;
  }

  // Move to the next guess
  guessCount++;
  currentGuess = '';

  // If out of guesses, end the game
  if (guessCount === maxGuesses) {
    setTimeout(() => alert(`Game Over! The word was "${currentWord}".`), 500);
  }
}


// Load the default word bank and start the game
loadWordBank(currentWordLength);
