"Use Strict";

const passRangeSliderEl = document.getElementById("passLengthRange");
const passRangeNumberEl = document.getElementById("passLengthAmount");
const uppercaseCheckBoxEl = document.getElementById("includeUppers");
const numberCheckBoxEl = document.getElementById("includeNumbers");
const symbolCheckBoxEl = document.getElementById("includeSymbols");
const generatePassBtnEl = document.getElementById("passwordGeneratorbtn");
const passwordHolderEl = document.getElementById("passwordBox");
const copyToClipboardEl = document.getElementById("addToClipboard");

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHARS = arrayFromLowToHigh(48, 57);
const SYMBOLS_CHARS = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

function handleInputChange() {
  let slidervalue = passRangeSliderEl.value;
  let sliderMin = passRangeSliderEl.min;
  let sliderMax = passRangeNumberEl.max;
  passRangeSliderEl.style.backgroundSize =
    ((slidervalue - sliderMin) * 100) / (sliderMax - sliderMin) + "% 100%";
}

passRangeSliderEl.addEventListener("input", handleInputChange);
passRangeNumberEl.addEventListener("input", handleInputChange);

generatePassBtnEl.addEventListener("click", () => {
  const passwordLength = passRangeNumberEl.value;
  const includeUpper = uppercaseCheckBoxEl.checked;
  const includeNumber = numberCheckBoxEl.checked;
  const includeSymbol = symbolCheckBoxEl.checked;

  const password = generatePassword(
    passwordLength,
    includeUpper,
    includeNumber,
    includeSymbol
  );
  passwordHolderEl.innerText = password;
});

function generatePassword(
  passLength,
  includeUpper,
  includeNumber,
  includeSymbol
) {
  let charCodes = LOWERCASE_CHAR_CODES;
  if (includeUpper) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (includeNumber) charCodes = charCodes.concat(NUMBER_CHARS);
  if (includeSymbol) charCodes = charCodes.concat(SYMBOLS_CHARS);

  const passwordCharacters = [];

  for (let i = 0; i < passLength; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

copyToClipboardEl.addEventListener("click", () => {
  const textArea = document.createElement("textarea");
  const pass = passwordHolderEl.innerText;

  if (!pass || pass === "Password") {
    return;
  }

  textArea.value = pass;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  alert("Password copied to clipboard");
});
