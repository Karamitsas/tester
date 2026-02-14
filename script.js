const UNLOCK_CODE = "0214";

const card = document.getElementById("card");
const form = document.getElementById("unlockForm");
const input = document.getElementById("codeInput");
const hint = document.getElementById("hint");
const prompt = document.getElementById("valentinePrompt");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
var tries = 0;

if (form && input && hint && card) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const entered = input.value.trim();

    if (entered === UNLOCK_CODE) {
      card.classList.remove("locked");
      card.classList.add("unlocked");
      hint.textContent = "";
      input.blur();
    } else {
      hint.textContent = "Wrong PIN. Try again bebo.";
      tries++;
      input.select();
      if(tries > 3){
        hint.textContent = "Thats embarassing 😠";
      }
    }
  });

  input.addEventListener("input", () => {
    hint.textContent = "";
  });
}

if (prompt && yesBtn && noBtn) {
  const randomInt = (min, max) => {
    if (max <= min) return min;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const moveNoButton = () => {
    if (!noBtn.classList.contains("is-floating")) {
      noBtn.classList.add("is-floating");
    }

    const margin = 8;
    const minX = margin;
    const minY = margin;
    const maxX = Math.floor(prompt.clientWidth - noBtn.offsetWidth - margin);
    const maxY = Math.floor(prompt.clientHeight - noBtn.offsetHeight - margin);
    const nextX = randomInt(minX, Math.max(maxX, minX));
    const nextY = randomInt(minY, Math.max(maxY, minY));
    noBtn.style.left = `${nextX}px`;
    noBtn.style.top = `${nextY}px`;
  };

  const dodge = (event) => {
    event.preventDefault();
    moveNoButton();
    
  };

  noBtn.addEventListener("mouseenter", dodge);
  noBtn.addEventListener("pointerdown", dodge);
  noBtn.addEventListener("touchstart", dodge, { passive: false });
  noBtn.addEventListener("click", dodge);
  window.addEventListener("resize", () => {
    if (noBtn.classList.contains("is-floating")) {
      moveNoButton();
    }
  });

  yesBtn.addEventListener("click", () => {
    prompt.classList.add("hidden");
    setTimeout(() => {
      prompt.remove();
      input.focus();
    }, 360);
  });
}
