// ========================= MUDANÇA DA BARRA DO HEADER ================================ //

// const SplitTextJS = require("split-text-js");

// window.addEventListener("scroll", function () {
//   var header = document.querySelector("header");
//   header.classList.toggle("sticky", this.window.scrollY > 650);
// });

// window.addEventListener("scroll", function () {
//   var header = document.getElementById("nav");
//   header.classList.toggle("sticky", this.window.scrollY > 650);
// });

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// ========================= MUDANÇA DE HEADER IMG ================================ //

// window.addEventListener("scroll", function () {
//   var scrollPosition = window.scrollY;
//   var imgOriginal = document.getElementById("img");

//   if (scrollPosition > 650) {
//     imgOriginal.src = "assets/img/logo_black.png";
//     // Trocar a imagem do cabeçalho
//     // header.style.backgroundImage = 'url(caminho_para_sua_imagem)';
//   } else if (scrollPosition < 650) {
//     imgOriginal.src = "assets/img/logo_white.png";
//     // Voltar para a imagem original do cabeçalho
//     // header.style.backgroundImage = 'url(caminho_para_sua_imagem_original)';
//   }
// });

// ========================= MUDAR ICON ================================ //

function trocarIcone() {
  var icon = document.getElementById("icon");
  // Verifica a classe atual do ícone e troca para a outra classe correspondente
  if (icon.classList.contains("uil-bars")) {
    icon.classList.remove("uil-bars");
    icon.classList.add("uil-times");
  } else {
    icon.classList.remove("uil-times");
    icon.classList.add("uil-bars");
  }
}

// =================== REVELAR - ANIMAÇÃO DA HOME PAGE =========================//

window.revelar = ScrollReveal({
  reset: true,
});

revelar.reveal(".sobre", {
  distance: "100px",
  duration: 1000,
  delay: 100,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

revelar.reveal(".comentarios__container", {
  distance: "100px",
  duration: 1000,
  delay: 100,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

revelar.reveal(".wrapper", {
  distance: "100px",
  duration: 1000,
  delay: 100,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

revelar.reveal(".simulacao", {
  distance: "100px",
  duration: 1000,
  delay: 100,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

revelar.reveal(".footer__site", {
  distance: "100px",
  duration: 1000,
  delay: 100,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

revelar.reveal(".especialista__container", {
  distance: "100px",
  duration: 800,
  delay: 100,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});


// =================== ANIMAÇÃO 3D SOBRE-SLOGAN =========================//
gsap.registerPlugin(SplitText);

document.addEventListener("DOMContentLoaded", () => {
  const titles = gsap.utils.toArray(".txt-anim");
  const tl = gsap.timeline({ repeat: -1 });

  titles.forEach(title => {
    const splitTitle = new SplitText(title, { type: "chars" });
    
    tl.from(splitTitle.chars, {
      opacity: 0,
      y: 30,
      rotateX: -90,
      stagger: .02,
    }, "<")
    .to(splitTitle.chars, {
      opacity: 0,
      y: -30,
      rotateX: 90,
      stagger: .02,
      delay: 1,
    }, "<1");
  });
});