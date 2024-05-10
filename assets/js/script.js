// ========================= MUDANÇA DA BARRA DO HEADER ================================ //

window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", this.window.scrollY > 650);
});

window.addEventListener("scroll", function () {
  var header = document.getElementById("nav");
  header.classList.toggle("sticky", this.window.scrollY > 650);
});

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

window.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;
  var imgOriginal = document.getElementById("img");

  if (scrollPosition > 650) {
    imgOriginal.src = "assets/img/logo_black.png";
    // Trocar a imagem do cabeçalho
    // header.style.backgroundImage = 'url(caminho_para_sua_imagem)';
  } else if (scrollPosition < 650) {
    imgOriginal.src = "assets/img/logo_white.png";
    // Voltar para a imagem original do cabeçalho
    // header.style.backgroundImage = 'url(caminho_para_sua_imagem_original)';
  }
});

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

// ================= API DE CONVERSÃO DE MOEDAS =========================

const dropList = document.querySelectorAll("form select"),
  fromCurrency = document.querySelector(".de select"),
  toCurrency = document.querySelector(".para select"),
  getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in converter_lista) {
    // selecionando USD por padrão como moeda DE e NPR como moeda PARA
    let selected =
      i == 0
        ? currency_code == "USD"
          ? "selected"
          : ""
        : currency_code == "NPR"
        ? "selected"
        : "";
    // criando uma tag de opção passando o código da moeda como texto e valor
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    // inserindo tag de opções dentro da tag select
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target); // chamando loadFlag com passagem do elemento alvo como argumento
  });
}

function loadFlag(element) {
  for (let code in converter_lista) {
    if (code == element.value) {
      // se o código da moeda da lista de países for igual ao valor da opção
      let imgTag = element.parentElement.querySelector("img"); // selecionando a tag img de uma lista suspensa específica
      // passando o código do país de um código de moeda selecionado em um URL img
      imgTag.src = `https://flagcdn.com/48x36/${converter_lista[
        code
      ].toLowerCase()}.png`;
    }
  }
}

window.addEventListener("load", () => {
  getExchangeRate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault(); //impedindo o envio do formulário
  getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value; // código de moeda temporário da lista suspensa FROM
  fromCurrency.value = toCurrency.value; // passando o código da moeda TO para o código da moeda FROM
  toCurrency.value = tempCode; //passando o código de moeda temporário para o código de moeda TO
  loadFlag(fromCurrency); // chamando loadFlag passando o elemento select (fromCurrency) de FROM
  loadFlag(toCurrency); // chamando loadFlag passando o elemento select (toCurrency) de TO
  getExchangeRate(); // chamando getExchangeRate
});

function getExchangeRate() {
  const amount = document.querySelector("form input");
  const exchangeRateTxt = document.querySelector("form .exchange-rate");
  let amountVal = amount.value;
  // se o usuário não inserir nenhum valor ou inserir 0, colocaremos 1 valor por padrão no campo de entrada
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  exchangeRateTxt.innerText = "Obtendo taxa de câmbio...";
  let url = `https://v6.exchangerate-api.com/v6/224d1a500deb343a8a867176/latest/${fromCurrency.value}`;
  // buscando a resposta da API e retornando-a com análise em js obj e em outro método então recebendo esse obj
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value]; // selecionando o usuário para a taxa de câmbio
      let totalExRate = (amountVal * exchangeRate).toFixed(2); // multiplicando o valor inserido pelo usuário pela taxa de câmbio TO selecionada
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    })
    .catch(() => {
      // se o usuário estiver offline ou qualquer outro erro ocorreu durante a busca de dados, a função catch será executada
      exchangeRateTxt.innerText = "Algo de Errado";
    });
}

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
  document.getElementById("name").value = autor;
  document.getElementById("comment").value = coment;
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
      <p id="autor">${autor}</p>
      <p id="coment">${coment}</p>
    </div>
  `;

  $("#autor-card").append(autorCardHTML);
}

// Ao carregar a página, recuperar as avaliações e outros dados armazenados localmente
$(document).ready(function () {
  recuperarDadosLocais();
});

// Evento de clique/mouseover nas estrelas de votação
$(".vote label i.fa").on("click mouseover", function () {
  // Remover classe ativa de todas as estrelas
  $(".vote label i.fa").removeClass("active");
  // Pegar o valor do input da estrela clicada
  var val = $(this).prev("input").val();
  // Percorrer todas as estrelas
  $(".vote label i.fa").each(function () {
    // Checar se o valor clicado é menor ou igual do input atual, se sim, adicionar classe active
    var $input = $(this).prev("input");
    if ($input.val() <= val) {
      $(this).addClass("active");
    }
  });
  // Atualizar a mensagem com base na avaliação selecionada
  if (val == 1) {
    $("#voto").html("😡 HORRÍVEL!!");
  } else if (val == 2) {
    $("#voto").html("😠 NÃO CURTI");
  } else if (val == 3) {
    $("#voto").html("😐 NADA DEMAIS");
  } else if (val == 4) {
    $("#voto").html("😊 CURTI BASTANTE");
  } else if (val == 5) {
    $("#voto").html("🤩 PERFEITOO!!");
  }
});

// Ao sair da div vote
$(".vote").mouseleave(function () {
  var val = $(this).find("input:checked").val();
  // Se nenhum foi clicado, remover classe de todos
  if (val == undefined) {
    $(".vote label i.fa").removeClass("active");
  } else {
    // Percorrer todas as estrelas e atualizar as classes
    $(".vote label i.fa").each(function () {
      var $input = $(this).prev("input");
      if ($input.val() > val) {
        $(this).removeClass("active");
      } else {
        $(this).addClass("active");
      }
    });
  }
  $("#voto").html("precisamos da sua avaliação"); // Somente para teste
});

// Evento de clique no botão para exibir estrelas
$("#exibirEstrelas").on("click", function () {
  var selectedStars = $(".vote label i.fa.active").length;
  var autor = document.getElementById("name").value;
  var coment = document.getElementById("comment").value;
  
  adicionarAutorCard(selectedStars, autor, coment);

  // Armazenar a avaliação e outros dados localmente
  var avaliacoes = JSON.parse(localStorage.getItem("dadosLocais")) || {};
  avaliacoes.avaliacoes = avaliacoes.avaliacoes || [];
  avaliacoes.avaliacoes.push({ stars: selectedStars });
  avaliacoes.autor = autor;
  avaliacoes.coment = coment;
  localStorage.setItem("dadosLocais", JSON.stringify(avaliacoes));
});

// =================== REVELAR - ANIMAÇÃO DA HOME PAGE =========================//

window.revelar = ScrollReveal({
  reset: true,
});

revelar.reveal(".sobre", {
  distance: "100px",
  duration: 1100,
  delay: 100,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

revelar.reveal(".comentarios__container", {
  distance: "30px",
  duration: 1100,
  delay: 100,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

revelar.reveal(".wrapper", {
  distance: "30px",
  duration: 1100,
  delay: 100,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

revelar.reveal(".simulacao", {
  distance: "30px",
  duration: 1100,
  delay: 100,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

revelar.reveal(".footer__site", {
  distance: "30px",
  duration: 1100,
  delay: 100,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

revelar.reveal(".especialista__container", {
  distance: "150px",
  duration: 1100,
  delay: 200,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});
