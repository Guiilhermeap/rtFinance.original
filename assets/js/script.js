
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

// ================= TESTE DE COMENTÁRIOS ========================= //
document
  .getElementById("commentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Coleta os valores do formulário
    var rating = document.querySelector('input[name="rating"]:checked').value;
    var name = document.getElementById("name").value;
    var comment = document.getElementById("comment").value;

    // Limpa o formulário
    document.getElementById("commentForm").reset();

    // Cria um elemento de comentário
    var commentElement = document.createElement("div");
    commentElement.innerHTML =
      "<strong>" +
      name +
      "</strong> avaliou como " +
      rating +
      "/5:<br>" +
      comment;

    // Adiciona o novo comentário à página
    var commentsSection = document.getElementById("comments");
    commentsSection.appendChild(commentElement);

    // Exibe mensagem de sucesso
    var alert = document.getElementById("alert");
    alert.style.display = "block";
    alert.textContent = "Comentário enviado com sucesso!";
    setTimeout(function () {
      alert.style.display = "none";
    }, 3000);
  });



// =================== REVELA - ANIMAÇÃO DA HOME PAGE =========================//

window.revelar = ScrollReveal({
  reset: true,
});

revelar.reveal(".sobre", {
  distance: "100px",
  duration: 1600,
  delay: 150,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

revelar.reveal(".comentario", {
  distance: "30px",
  duration: 1600,
  delay: 150,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

revelar.reveal(".wrapper", {
  distance: "30px",
  duration: 1600,
  delay: 150,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

revelar.reveal(".simulacao", {
  distance: "30px",
  duration: 1600,
  delay: 150,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

revelar.reveal(".footer__site", {
  distance: "30px",
  duration: 1600,
  delay: 180,
  origin: "bottom",
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});
