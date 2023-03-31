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
    // Randomise(pass.innerText)
    
    let finalPassword = shuffleString(pass.innerText);
    console.log(finalPassword);
}

//onclick Event in Generate Password button
document.getElementById("btn").addEventListener(
    "click",
    function () {
        generatePassword();
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