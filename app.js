// ELEMENTS
const inputBox = document.getElementById("password");
const generateButton = document.getElementById("generate");
const displayButton = document.getElementById("display-modif");
const inputRange = document.getElementById("range")
const checkBox = document.querySelector(".check-box")
const inputValue = document.querySelector(".check-box div #radio-value")

// COPY and NOTIFICATE
const copyButton = document.getElementById("copy");
const notification = document.querySelector(".not");

// CHECKED
const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const digit = document.getElementById("digit");
const symbol = document.getElementById("symbol");
const allCaractere = document.getElementById("allCaractere");

// CARACTERES
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const digitCase = "0123456789";
const symbolCase = "!#$%&*+,-./:;<=>?@\^_|~";
const symbolCases = "!#$%&()*+,-./:;<=>?@[\]^_{|}~";
// const allCaract = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,-./:;<=>?@[\]^_{|}~"
const allCaract = upperCase + lowerCase + digitCase + symbolCase;

let password = "";
let length = 0;
inputValue.value = "4"

inputBox.addEventListener("input", (e) => {
    // e.preventDefault();
    e.target.value = password;
    console.log("event");
})

inputRange.addEventListener("input", (e) => {
    inputValue.value = e.target.value;
    length = parseInt(e.target.value);
    conditions();
})

inputValue.addEventListener("input", (e) => {
    inputRange.value = e.target.value;
    length = parseInt(e.target.value);
    conditions();
})

displayButton.addEventListener("click", () => {
    checkBox.style.display = "block";
    displayButton.style.display = "none"
})


// Create Password
function createPassword(allCaract) {
    password = "";
    let index;
    while (password.length < length) {
        index = Math.floor(Math.random() * allCaract.length);
        password += allCaract[index];
    }

    inputBox.value = password;
}

// Generate Button
generateButton.addEventListener("click", () => {
    length = 8;
    conditions();
});

// generateButton.onclick = createPassword;

// Copy Function
copyButton.addEventListener("click", (e) => {
    if(!password.trim()){
        e.preventDefault();
        return;
    }
    navigator.clipboard.writeText(password)
        .then(() => {
            notification.innerHTML = 'Password copied'
            notification.style.display = "block";
            notification.classList.remove("erreur");
        })
        .catch(err => {
            notification.innerHTML = 'Error while copying'
            notification.classList.add("erreur")
            notification.style.display = "block";
        })
        .finally(() => {
            setTimeout(() => {
                notification.style.display = "none";
            }, 3500);
        })
})

// Click AllCaracteres
allCaractere.addEventListener('change', (e) => {
    if (e.target.checked) {
        upper.checked = true;
        lower.checked = true;
        digit.checked = true;
        symbol.checked = true;
        return;
    }
    upper.checked = false;
    lower.checked = false;
    digit.checked = false;
    symbol.checked = false;
    
})
upper.addEventListener('change', (e) => {
    if (!e.target.checked) {
        allCaractere.checked = false;
        return;
    }    
})
lower.addEventListener('change', (e) => {
    if (!e.target.checked) {
        allCaractere.checked = false;
        return;
    }    
})
digit.addEventListener('change', (e) => {
    if (!e.target.checked) {
        allCaractere.checked = false;
        return;
    }    
})
symbol.addEventListener('change', (e) => {
    if (!e.target.checked) {
        allCaractere.checked = false;
        return;
    }    
})



// CONDITIONS
function conditions() {
    // AllCaracters
    if(allCaractere.checked || (upper.checked && digit.checked && symbol.checked && lower.checked)){
        createPassword(allCaract)
    }

    // Single
    else if (upper.checked && (!lower.checked && !digit.checked && !symbol.checked)) {
        createPassword(upperCase)
    }
    else if (lower.checked && (!upper.checked && !digit.checked && !symbol.checked)) {
        createPassword(lowerCase)
    }
    else if (digit.checked && (!lower.checked && !upper.checked && !symbol.checked)) {
        createPassword(digitCase)
    }
    else if (symbol.checked && (!lower.checked && !digit.checked && !upper.checked)) {
        createPassword(symbolCase)
    }

    // Couple
    else if (symbol.checked && lower.checked && (!digit.checked && !upper.checked)) {
        createPassword(symbolCase + lowerCase)
    }
    else if (symbol.checked && upper.checked && (!digit.checked && !lower.checked)) {
        createPassword(symbolCase + upperCase)
    }
    else if (symbol.checked && digit.checked && (!lower.checked && !upper.checked)) {
        createPassword(symbolCase + digitCase)
    }
    else if (upper.checked && lower.checked && (!digit.checked && !symbol.checked)) {
        createPassword(upperCase + lowerCase)
    }
    else if (digit.checked && lower.checked && (!symbol.checked && !upper.checked)) {
        createPassword(digitCase + lowerCase)
    }
    else if (upper.checked && digit.checked && (!lower.checked && !symbol.checked)) {
        createPassword(upperCase + digitCase)
    }
    
    // Triple
    else if (upper.checked && digit.checked && lower.checked && !symbol.checked) {
        createPassword(upperCase + digitCase + lowerCase)
    }
    else if (symbol.checked && digit.checked && lower.checked && !upper.checked) {
        createPassword(symbolCase + digitCase + lowerCase)
    }
    else if (upper.checked && symbol.checked && lower.checked && !digit.checked) {
        createPassword(upperCase + symbolCase + lowerCase)
    }
    else if (upper.checked && digit.checked && symbol.checked && !lower.checked) {
        createPassword(upperCase + digitCase + symbolCase)
    }
}
