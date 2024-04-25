let linha1 = document.getElementById("h1-name");
let linha2 = document.getElementById("h1-funcao");

window.onscroll = () => {
  let posicao = window.scrollY - 1;
  linha1.style.left = `${posicao}px`;
  linha2.style.right = `${posicao}px`;
};
