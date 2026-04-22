// FOOTER YEAR
document.getElementById("yearSpan").textContent = new Date().getFullYear();

// STEP HANDLING
const steps = [
  document.getElementById("step1"),
  document.getElementById("step2"),
  document.getElementById("step3")
];
const dots = document.querySelectorAll(".step-dot");
let currentStep = 0;

function goToStep(index){
  if(index === currentStep) return;

  const oldStep = steps[currentStep];
  const newStep = steps[index];

  oldStep.classList.add("fade-out");

  setTimeout(()=>{
    oldStep.classList.remove("fade-out","active");
    newStep.classList.add("active");
  },300);

  dots[currentStep].classList.remove("active");
  dots[currentStep].classList.add("done");
  dots[index].classList.add("active");

  currentStep = index;
}

// STEP 1 — REGISTRATION
const regForm = document.getElementById("regForm");
let regData = null;

regForm.addEventListener("submit", e=>{
  e.preventDefault();

  regData = Object.fromEntries(new FormData(regForm).entries());

  goToStep(1);
});

// TRAINERS
const trainers = [
  {
    name: "John Carter",
    desc: "Strength & Conditioning specialist.",
    rating: 4.2,
    ability: "Strength",
    image: "https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg"
  },
  {
    name: "Emily Johnson",
    desc: "Yoga & Flexibility coach.",
    rating: 3.8,
    ability: "Yoga",
    image: "https://images.pexels.com/photos/3823063/pexels-photo-3823063.jpeg"
  },
  {
    name: "Michael Smith",
    desc: "HIIT & Fat‑Loss expert.",
    rating: 4.0,
    ability: "HIIT",
    image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg"
  },
  {
    name: "Sophia Williams",
    desc: "Nutrition & Wellness coach.",
    rating: 3.7,
    ability: "Nutrition",
    image: "https://images.pexels.com/photos/3760852/pexels-photo-3760852.jpeg"
  }
];

const trainerList = document.getElementById("trainerList");
const selectedTrainerInfo = document.getElementById("selectedTrainerInfo");
const toPaymentBtn = document.getElementById("toPaymentBtn");
let selectedTrainer = null;

// BUILD TRAINER CARDS
trainers.forEach(trainer => {
  const card = document.createElement("div");
  card.className = "trainer-card";

  card.innerHTML = `
    <img src="${trainer.image}">
    <h3>${trainer.name}</h3>
    <p>${trainer.desc}</p>
    <span class="ability-tag">${trainer.ability}</span>
    <div class="rating">★ ${trainer.rating}</div>
    <button class="select-trainer-btn">Select</button>
  `;

  card.querySelector("button").addEventListener("click", ()=>{
    document.querySelectorAll(".trainer-card").forEach(c=>c.classList.remove("selected"));
    card.classList.add("selected");

    selectedTrainer = trainer;
    selectedTrainerInfo.textContent = `Selected trainer: ${trainer.name}`;

    toPaymentBtn.disabled = false;
  });

  trainerList.appendChild(card);
});

// NAVIGATION
document.getElementById("backToStep1").addEventListener("click", ()=> goToStep(0));
document.getElementById("backToStep2").addEventListener("click", ()=> goToStep(1));
toPaymentBtn.addEventListener("click", ()=> selectedTrainer && goToStep(2));

// PAYMENT LOGIC
const cardName = document.getElementById("cardName");
const cardNumber = document.getElementById("cardNumber");
const cardExpiry = document.getElementById("cardExpiry");
const cardCvv = document.getElementById("cardCvv");

const cardBrand = document.getElementById("cardBrand");
const cardNumberPreview = document.getElementById("cardNumberPreview");
const cardNamePreview = document.getElementById("cardNamePreview");
const cardExpiryPreview = document.getElementById("cardExpiryPreview");
const cardHint = document.getElementById("cardHint");
const payBtn = document.getElementById("payBtn");
const topPopup = document.getElementById("topPopup");

// CARD BRAND DETECTION
function detectBrand(num){
  const digits = num.replace(/\s+/g,"");
  if(/^4/.test(digits)) return "Visa";
  if(/^5[1-5]/.test(digits)) return "Mastercard";
  if(/^3[47]/.test(digits)) return "Amex";
  return "UK CARD";
}

// FORMAT CARD NUMBER
function formatCardNumber(value){
  return value.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim();
}

cardNumber.addEventListener("input", ()=>{
  cardNumber.value = formatCardNumber(cardNumber.value);
  const digits = cardNumber.value.replace(/\s+/g,"");
  const brand = detectBrand(cardNumber.value);

  cardBrand.textContent = brand;
  cardNumberPreview.textContent = digits ? cardNumber.value : "•••• •••• •••• ••••";

  if(digits.length < 13){
    cardHint.textContent = "Card number too short.";
  } else {
    cardHint.textContent = `Detected: ${brand}`;
  }
});

cardName.addEventListener("input", ()=>{
  cardNamePreview.textContent = cardName.value || "YOUR NAME";
});

cardExpiry.addEventListener("input", ()=>{
  let v = cardExpiry.value.replace(/\D/g,"");
  if(v.length >= 3) v = v.slice(0,2) + "/" + v.slice(2);
  cardExpiry.value = v;
  cardExpiryPreview.textContent = v || "MM/YY";
});

cardCvv.addEventListener("input", ()=>{
  cardCvv.value = cardCvv.value.replace(/\D/g,"").slice(0,4);
});

// PAYMENT COMPLETE
payBtn.addEventListener("click", ()=>{
  topPopup.textContent = "Payment successful! Redirecting...";
  topPopup.classList.add("show");

  setTimeout(()=>{
    window.location.href = "thankyou.htm";
  }, 2000);
});