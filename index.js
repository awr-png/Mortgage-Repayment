const radioBtns = document.querySelectorAll(".radio");
const repayment = document.getElementById("repayment");
const interest = document.getElementById("interest");
const amount = document.getElementById("amount");
const term = document.getElementById("term");
const rate = document.getElementById("rate");
const dataWrapper = document.getElementsByClassName("data-wrapper");
const interestData = document.getElementById("totalInterest");
const inputs = document.querySelectorAll(".input-container");
const monthlyPayment = document.getElementById("monthlyPayment");
const totalPayment = document.getElementById("totalPayment");
const hightlighter = document.querySelectorAll(".highlighter");

// ✅ Radio button UI
radioBtns.forEach(element => {
  element.addEventListener("click", () => {
    radioBtns.forEach(btn => {
      btn.style.backgroundColor = "";
      btn.style.border = "1px solid hsl(202, 55%, 16%)";
    });
    element.style.backgroundColor = "hsl(61, 70%, 82%)";
    element.style.border = "1px solid hsl(61, 70%, 52%)";
  });
});

// ✅ Validation en temps réel
inputs.forEach((inputContainer, index) => {
  const input = inputContainer.querySelector("input");
  const label = hightlighter[index];
  input.addEventListener("input", () => {
    validateInput(input, inputContainer, label);
  });
});

// ✅ Fonction de validation d’un champ
function validateInput(input, container, label) {
  if (input.value.trim() === "") {
    container.style.border = "1px solid hsl(0, 52%, 45%)";
    label.style.backgroundColor = "hsl(0, 52%, 45%)";
    label.style.color = "white";
  } else {
    container.style.border = "";
    label.style.backgroundColor = "";
    label.style.color = "";
  }
}

// ✅ Fonction de calcul
function calculateRepayments() {
  let allValid = true;

  // 🔍 Vérifier que tous les champs sont remplis
  inputs.forEach((inputContainer, index) => {
    const input = inputContainer.querySelector("input");
    const label = hightlighter[index];
    if (input.value.trim() === "") {
      validateInput(input, inputContainer, label);
      allValid = false;
    }
  });

  // ✅ Vérifier qu’un bouton radio est sélectionné
  if (!repayment.checked && !interest.checked) {
    allValid = false;
  }

  if (!allValid) {
    return;
  }

  // ✅ Calcul
  const loanAmount = Number(amount.value.replace(/,/g, ""));
  const years = Number(term.value);
  const annualRate = Number(rate.value);
  const r = annualRate / (12 * 100);
  const n = years * 12;

  let monthly, total, interestTotal;

  if (repayment.checked) {
    monthly = loanAmount * r / (1 - Math.pow(1 + r, -n));
    total = monthly * n;
    interestTotal = total - loanAmount;
  } else {
    // Interest Only
    monthly = loanAmount * r;
    total = monthly * n;
    interestTotal = total;
    
  }

  monthlyPayment.textContent = `£${formatPrice(monthly)}`;
  totalPayment.textContent = `£${formatPrice(total)}`;
  interestData.textContent = `£${formatPrice(interestTotal)}`;
  dataWrapper[0].style.display = "block";
}

// ✅ Format d'affichage £1,234.56
function formatPrice(price) {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}