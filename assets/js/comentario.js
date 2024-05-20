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
        <p id="autor">RESPONSÁVEL:  ${autor}</p>
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