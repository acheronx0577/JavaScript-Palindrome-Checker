const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");

const checkPalindrome = (input) => {
  // Store original input for display
  const originalInput = input;
  
  if (input === "") {
    alert("Please input a value");
    return;
  }
  
  // Remove previous result
  result.replaceChildren();
  
  // Clean the input: convert to lowercase and remove non-alphanumeric characters
  const cleanedInput = input.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  // Check if it's a palindrome
  const isPalindrome = cleanedInput === [...cleanedInput].reverse().join("");
  
  // Create result message
  const resultMsg = document.createElement("p");
  resultMsg.innerHTML = `<strong>${originalInput}</strong> ${isPalindrome ? 'is' : 'is not'} a palindrome`;
  result.appendChild(resultMsg);
  
  // Update result styling
  result.className = isPalindrome ? "palindrome" : "not-palindrome";
};

checkButton.addEventListener("click", () => {
  checkPalindrome(textInput.value);
});

// Add Enter key functionality
textInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkPalindrome(textInput.value);
  }
});