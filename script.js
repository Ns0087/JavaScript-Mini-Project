//DataSets
const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerSet = "abcdefghijklmnopqrstuvwxyz"
const numberSet = "1234567890"
const symbolSet = "~!@#$%^&*()_+/"

// selectors
const pass = document.getElementById("pass")
const totalChar = document.getElementById("total-char")
const upperInput = document.getElementById("upper-case")
const lowerInput = document.getElementById("lower-case")
const numberInput = document.getElementById("numbers")
const symbolInput = document.getElementById("symbols")

//returns a random character from dataSet
const getRandomData = (dataSet) => {
    return dataSet[Math.floor(Math.random() * dataSet.length)]
}

const generatePassword = (password = "") => {
    if (upperInput.checked) {
        password += getRandomData(upperSet)
    }
    if (lowerInput.checked) {
        password += getRandomData(lowerSet)
    }
    if (numberInput.checked) {
        password += getRandomData(numberSet)
    }
    if (symbolInput.checked) {
        password += getRandomData(symbolSet)
    }

    //Recursively calls itself until password is of desired length
    if (password.length < totalChar.value) {
        return generatePassword(password)
    }

    pass.innerText = truncateString(password, totalChar.value);

    return pass.innerText;
}

//onclick Event on Generate Password button
document.getElementById("btn").addEventListener(
    "click",
    function () {
        let password = generatePassword();
        passwordStrength(password);
    }

)

//Trim the password upto desired length
function truncateString(str, num) {
    if (str.length > num) {
        let subStr = str.substring(0, num);
        return shuffleString(subStr);
    } else {
        return shuffleString(str);
    }
}

//Randomise final Password
function shuffleString(str) {
    let charArray = str.split('');

    // Use Fisher-Yates algorithm to shuffle the characters
    for (let i = charArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = charArray[i];
        charArray[i] = charArray[j];
        charArray[j] = temp;
    }

    let shuffledString = charArray.join('');
    return shuffledString;
}

//Copy Button
function copyText() {
    const span = document.getElementById("pass");
    const text = span.innerText;
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log(`Copied text: ${text}`);
            alert('Copied');
        })
        .catch((error) => {
            console.error(`Error copying text: ${error}`);
            alert('Error copying password!!');
        });
}

//Test Password Strength
function checkPasswordStrength(password) {
    let strength = 0;
    // Check if password length is at least 8 characters long and no more than 32 characters long
    if (password.length < 8 || password.length > 32) {
        strength -= 4;
    }
    
    // Check if password contains common words
    const commonWords = ["password", "123456", "qwerty"];
    if (!(commonWords.includes(password))) {
        strength += 1;
    }
    
    // Check if password contains dictionary words
    const dictionary = ["apple", "banana", "orange"];
    if (!(dictionary.includes(password.toLowerCase()))) {
        strength += 1;
    }
    
    // Check if password contains similar characters
    const similarChars = /[o0l1]/g;
    if (!(password.match(similarChars))) {
        strength += 1;
    }
    
    // Check if password contains repeated characters
    const repeatedChars = /(.)\1{2,}/g;
    if (!(password.match(repeatedChars))) {
        strength += 1;
    }
    
    // Check if password contains sequential characters
    const sequentialChars = /(abc|bcd|cde|123|234|345)/g;
    if (!(password.match(sequentialChars))) {
        strength += 1;
    }
    
    // Check if password contains personal information
    const userInfo = ["john", "doe", "555-1234", "january"];
    let status = 0;
    for (let info of userInfo) {
      if (password.toLowerCase().includes(info)) {
        status++;
      }
    }

    if(status == 0){
        strength++;
    }
    
    // Check if password has been used before
    const previousPasswords = ["password123", "letmein"];
    if (!(previousPasswords.includes(password))) {
        strength += 1;
    }

    if (password.match(/[a-z]/)) {
        strength += 1;
    }
    if (password.match(/[A-Z]/)) {
        strength += 1;
    }
    if (password.match(/[0-9]/)) {
        strength += 1;
    }
    if (password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/)) {
        strength += 1;
    }

    // Password is considered strong if it passes all checks
    return strength;
  }
  
function passwordStrength(password) {
    let strength = checkPasswordStrength(password);
    let strengthText = document.getElementById('strength');
    let strengthRange = document.getElementById('strengthRange');

    if(strength <= 6) { strengthText.innerText = "Weak"; strengthRange.value = strength; }
    if(strength > 6 && strength <= 9) { strengthText.innerText = "Medium"; strengthRange.value = strength;}
    if(strength > 9) { strengthText.innerText = "Strong"; strengthRange.value = strength;}

    changeColor(strength);
}

function changeColor(value) {
    var slider = document.getElementById("strengthRange");
    var value = slider.value;
    slider.style.background = 'linear-gradient(to right, green, yellow, red ' + value*10 + '%)';
}