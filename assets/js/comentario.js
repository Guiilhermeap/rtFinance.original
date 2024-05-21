// ================= COMENTÁRIOS ========================= //

// Função para recuperar as avaliações e outros dados armazenados localmente
function recuperarDadosLocais() {
  var dadosLocais = JSON.parse(localStorage.getItem("dadosLocais")) || {};
  var avaliacoes = dadosLocais.avaliacoes || [];
  var autor = dadosLocais.autor || "";
  var coment = dadosLocais.coment || "";

  avaliacoes.forEach(function (avaliacao) {
    adicionarAutorCard(avaliacao.stars, autor, coment);
  });

  // Preencher os campos de nome e comentário
  document.getElementById("nome").value = autor;
  document.getElementById("comentario").value = coment;
}

// Função para adicionar uma nova autor_card
function adicionarAutorCard(stars, autor, coment) {
  var starsText = "";

  for (var i = 0; i < stars; i++) {
    starsText += "⭐";
  }

  var autorCardHTML = `
    <div class="autor-card">
      <p id="estrela">${starsText}</p>
      <p id="autor">RESPONSÁVEL:  ${autor}</p>
      <p id="coment">${coment}</p>
    </div>
  `;

  document.getElementById("comentario-autor").innerHTML += autorCardHTML;
}

// Ao carregar a página, recuperar as avaliações e outros dados armazenados localmente
document.addEventListener("DOMContentLoaded", function () {
  recuperarDadosLocais();
});

// Evento de clique/mouseover nas estrelas de votação
document.querySelectorAll(".vote label i.fa").forEach(function (star) {
  star.addEventListener("click", function () {
    var val = this.previousElementSibling.value;
    atualizarEstrelas(val);
  });

  star.addEventListener("mouseover", function () {
    var val = this.previousElementSibling.value;
    destacarEstrelas(val);
  });
});

function destacarEstrelas(val) {
  document.querySelectorAll(".vote label i.fa").forEach(function (star) {
    var inputVal = star.previousElementSibling.value;
    if (inputVal <= val) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
  atualizarMensagem(val);
}

function atualizarEstrelas(val) {
  document.querySelectorAll(".vote label i.fa").forEach(function (star) {
    var inputVal = star.previousElementSibling.value;
    if (inputVal <= val) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
  atualizarMensagem(val);
}

function atualizarMensagem(val) {
  var mensagens = ["😡 HORRÍVEL!!", "😠 NÃO CURTI", "😐 NADA DEMAIS", "😊 CURTI BASTANTE", "🤩 PERFEITOO!!"];
  document.getElementById("voto").innerHTML = mensagens[val - 1];
}

// Ao sair da div vote
document.querySelector(".vote").addEventListener("mouseleave", function () {
  var val = this.querySelector("input:checked") ? this.querySelector("input:checked").value : undefined;
  if (val === undefined) {
    document.querySelectorAll(".vote label i.fa").forEach(function (star) {
      star.classList.remove("active");
    });
  } else {
    destacarEstrelas(val);
  }
  document.getElementById("voto").innerHTML = "precisamos da sua avaliação"; // Somente para teste
});

// Evento de clique no botão para exibir estrelas
document.getElementById("commentForm").addEventListener("submit", function (event) {
  event.preventDefault();
  var selectedStars = document.querySelectorAll(".vote label i.fa.active").length;
  var autor = document.getElementById("nome").value;
  var coment = document.getElementById("comentario").value;

  adicionarAutorCard(selectedStars, autor, coment);

  // Armazenar a avaliação e outros dados localmente
  var avaliacoes = JSON.parse(localStorage.getItem("dadosLocais")) || {};
  avaliacoes.avaliacoes = avaliacoes.avaliacoes || [];
  avaliacoes.avaliacoes.push({ stars: selectedStars });
  avaliacoes.autor = autor;
  avaliacoes.coment = coment;
  localStorage.setItem("dadosLocais", JSON.stringify(avaliacoes));
});