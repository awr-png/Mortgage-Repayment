const radioBtn = document.querySelectorAll('.radio');
const userInput = document.querySelectorAll("input");
const submitBtn = document.getElementById("submitBtn");
const sections = document.querySelectorAll("section");
const inputContainer = document.querySelectorAll(".input-container");
const inputSign = document.getElementsByClassName("input-sign");
let isRepayment = true;
radioBtn.forEach(element => {
    element.addEventListener("click", () => {
        radioBtn.forEach(btn => {
            btn.classList.remove("active");
        });
        element.classList.add("active");
    });
})

function calculateRepayments() {
    const loanAmount = Number(userInput[0].value.replace(/[,.]/g, ""));
    const years = Number(userInput[1].value);
    const annualRate = Number(userInput[2].value);
    const r = annualRate / (12 * 100);
    const n = years * 12;
    let monthly, total, interestTotal;
    if(userInput[3].checked) {
        monthly = loanAmount * r / (1 - Math.pow(1 + r, -n));
        total = monthly * n;
        interestTotal = total - loanAmount;
        sections[2].classList.add("hidden");
        sections[3].style.display = "block";
        document.getElementById("total").classList.remove("hidden");
        showContent(monthly, total);
    }
    else if (userInput[4].checked) {
        monthly = loanAmount * (annualRate / 100) ;
        total = monthly / 12;
        interestTotal = total;
        sections[2].style.display = "none";
        sections[3].style.display = "block";
        document.getElementById("total").classList.add("hidden");
        document.getElementById("year").textContent = `£${formatPrice(interestTotal)}`;
    }
}

function checkUserInput() {
    const amount = document.getElementById("amount");
    const term = document.getElementById("term");
    const rate = document.getElementById("rate");
    const repayment = document.getElementById("repayment");
    const interest = document.getElementById("interest");

    const inputFields = [amount, term, rate];
    const inputContainer = document.querySelectorAll(".input-container:not(.radio)");
    const inputSign = document.querySelectorAll(".input-sign");
    const errorMssg = document.querySelectorAll(".errorMssg");

    let isAllValid = true;

    // Validate text inputs (amount, term, rate)
    inputFields.forEach((input, index) => {
        if (input.value.trim() === '') {
            inputContainer[index].style.borderColor = "hsl(0, 100%, 45%)";
            inputSign[index].style.backgroundColor = "hsl(0, 100%, 45%)";
            inputSign[index].style.color = "white";
            errorMssg[index].style.display = "block";
            isAllValid = false;
        } else {
            inputContainer[index].style.borderColor = "hsl(200, 24%, 40%)";
            inputSign[index].style.backgroundColor = "hsl(202, 86%, 94%)";
            inputSign[index].style.color = "rgb(78, 110, 126)";
            errorMssg[index].style.display = "none";
        }
    });

    // Validate radio buttons
    if (!repayment.checked && !interest.checked) {
        isAllValid = false;
        document.getElementById("radioError").style.display = "block";
    } else {
        document.getElementById("radioError").style.display = "none";
    }

    if (isAllValid) {
        calculateRepayments();
    }
}

function showContent (monthly, total) {
    if(isRepayment) {
        document.getElementById("month").textContent = `£${formatPrice(monthly)}`;
        document.getElementById("year").textContent = `£${formatPrice(total)}`;
    }
}
function formatPrice(price) {
    return price.toLocaleString("en-US", {
        minimumFractioniDigits: 2,
        maximumFractionDigits: 2
    });
}
submitBtn.addEventListener("click", () => {
    checkUserInput();
});