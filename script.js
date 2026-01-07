const modal = document.querySelector("#modal");
const modalTriggers = document.querySelectorAll("[data-modal]");
const modalClosers = document.querySelectorAll("[data-close='modal']");
const scrollButtons = document.querySelectorAll("[data-scroll]");
const fallbackSvg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='600' viewBox='0 0 900 600'%3E%3Crect width='900' height='600' fill='%23121a2b'/%3E%3Ccircle cx='240' cy='240' r='140' fill='%235ae0ff' opacity='0.5'/%3E%3Ccircle cx='560' cy='300' r='180' fill='%237f7bff' opacity='0.45'/%3E%3Ctext x='50%25' y='52%25' text-anchor='middle' fill='%23e7ecf5' font-family='Arial' font-size='42'%3ETwitter bot%3C/text%3E%3C/svg%3E";

const openModal = () => {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openModal);
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal();
    }
  });

  trigger.addEventListener("pointermove", (event) => {
    const rect = trigger.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    trigger.style.setProperty("--glow-x", `${x}%`);
    trigger.style.setProperty("--glow-y", `${y}%`);
  });
});

modalClosers.forEach((closer) => {
  closer.addEventListener("click", closeModal);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.scroll);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const images = document.querySelectorAll("img[data-fallback]");
images.forEach((image) => {
  image.addEventListener("error", () => {
    image.src = fallbackSvg;
  });
});
