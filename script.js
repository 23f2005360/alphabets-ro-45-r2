// Initialize alphabet array in reverse order
const alphabet = 'Z Y X W V U T S R Q P O N M L K J I H G F E D C B A'.split(' ');

// Get DOM elements
const form = document.getElementById('letterForm');
const input = document.getElementById('letterInput');
const feedbackDiv = document.getElementById('feedback');
const showAllBtn = document.getElementById('showAll');
const alphabetList = document.getElementById('alphabetList');

// Function to provide feedback
function setFeedback(message, isError = false) {
  feedbackDiv.textContent = message;
  feedbackDiv.style.color = isError ? '#d32f2f' : '#388e3c';
}

// Validate and process input
form.addEventListener('submit', function(e) {
  e.preventDefault();
  let userInput = input.value.trim();
  if (userInput.length !== 1) {
    setFeedback('Please enter a single letter.', true);
    return;
  }
  const letter = userInput.toUpperCase();
  if (letter < 'A' || letter > 'Z') {
    setFeedback('Input must be a letter from A to Z.', true);
    return;
  }
  // Check if letter exists in alphabet
  if (alphabet.includes(letter)) {
    setFeedback('Letter ' + letter + ' exists in the reverse alphabet!', false);
  } else {
    setFeedback('Letter ' + letter + ' does not exist in the reverse alphabet.', true);
  }
});

// Show all alphabet letters
showAllBtn.addEventListener('click', function() {
  // Populate list if empty
  if (alphabetList.children.length === 0) {
    alphabet.forEach(function(letter) {
      const li = document.createElement('li');
      li.textContent = letter;
      alphabetList.appendChild(li);
    });
  }
  // Toggle visibility
  if (alphabetList.style.display === 'none' || alphabetList.getAttribute('aria-hidden') === 'true') {
    alphabetList.style.display = 'flex';
    alphabetList.setAttribute('aria-hidden', 'false');
  } else {
    alphabetList.style.display = 'none';
    alphabetList.setAttribute('aria-hidden', 'true');
  }
});

// Accessibility: allow Enter key to submit form and toggle list with keyboard
input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    form.dispatchEvent(new Event('submit'));
  }
});

// Optional: Clear feedback message after a timeout for better UX
setInterval(function() {
  if (feedbackDiv.textContent) {
    feedbackDiv.textContent = '';
  }
}, 5000);
