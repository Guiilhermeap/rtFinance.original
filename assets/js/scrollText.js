let linha1 = document.getElementById("h1-name");
let linha2 = document.getElementById("h1-funcao");

window.onscroll = () => {
  let posicao = window.scrollY - 1;
  linha1.style.left = `${posicao}px`;
  linha2.style.right = `${posicao}px`;
};

// =============== SCRIPT LIVROS ============= //
// document.addEventListener("DOMContentLoaded", (event) => {
//   gsap.registerPlugin(ScrollTrigger);

//   // Calcula a altura total do corpo
//   const contentHolderHeight = document.querySelector(".content-holder").offsetHeight;
//   const imgHolderHeight = window.innerHeight;
//   const additionalScrollHeight = window.innerHeight;
//   const totalBodyHeight = contentHolderHeight + imgHolderHeight + additionalScrollHeight;
//   document.body.style.height = `${totalBodyHeight}px`;
// });

// ScrollTrigger.create({
//   trigger: ".web-site",
//   start: "-0.1% top",
//   end: "bottom bottom",
//   onEnter: () => {
//     gsap.set(".web-site", { position: "absolute", top: "195%" });
//   },
//   onLeaveBack: () => {
//     gsap.set(".web-site", { position: "fixed", top: "0" });
//   },
// });

// gsap.to(".header .letras:first-child", {
//   x: () => -innerWidth * 3,
//   scale: 2,
//   ease: "power2.inOut",
//   scrollTrigger: {
//     start: "top top",
//     end: `+=200%`,
//     scrub: 1,
//   },
// });

// gsap.to(".header .letras:last-child", {
//   x: () => innerWidth * 3,
//   scale: 2,
//   ease: "power2.inOut",
//   scrollTrigger: {
//     start: "top top",
//     end: `+=200%`,
//     scrub: 1,
//   },
// });

// gsap.to(".img__holder", {
//   rotation: 0,
//   clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//   ease: "power2.inOut",
//   scrollTrigger: {
//     start: "top top",
//     end: `+=200%`,
//     scrub: 1,
//   },
// });

// gsap.to(".img__holder img", {
//   scale: 1,
//   ease: "power2.inOut",
//   scrollTrigger: {
//     start: "top top",
//     end: `+=200%`,
//     scrub: 1,
//   },
// });