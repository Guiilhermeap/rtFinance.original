// =================== API DO SIMULADOR =========================//
const apiUrl = "https://api.hgbrasil.com/finance/taxes?key=80dec4f9";
let cdiValue = null;
let selicValue = null;

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
1
    if (!response.ok) {
      throw new Error("Erro na requisição: ", $(Response.statusText));
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao recuperar dados da API:", error);
    return null;
  }
}

async function getData() {
  try {
    const data = await fetchData();

    if (data) {
      cdiValue = data.results[0].cdi_daily;
      selicValue = data.results[0].selic;
      console.log("Valor da Selic dentro da função:", selicValue);
      console.log("Valor da Selic dentro da função:", cdiValue);
    } else {
      console.log("Não foi possível obter os dados da API.");
    }
  } catch (error) {
    console.error("Erro ao processar os dados:", error);
  }
}

// Chame a função assíncrona para obter os dados
getData().then(() => {
  // Agora você pode usar selicValue fora da função
  const tesouroDiretoRate = selicValue;
  const cdiRate = cdiValue;

  // Passe os parâmetros necessários para a função de cálculo de investimentos
  //calculateInvestments();
});

function calculateInvestments() {
  // Obtendo os valores dos inputs do formulário
  const ValorInicial = parseFloat(
    document.getElementById("ValorInicial").value
  );
  const ValorMensal = parseFloat(document.getElementById("ValorMensal").value);
  const Tempo = parseFloat(document.getElementById("Tempo").value);
  const timeUnit = document.getElementById("timeUnit").value;

  // Definindo as taxas de juros para CDI, Poupança e Tesouro Direto
  const cdiRate = cdiValue || 0.1115; // 11% ao ano
  const poupancaRate = 0.06; // 6,17% ao ano
  const tesouroDiretoRate = selicValue || 0.1115; // Taxa Selic (ou outra taxa de referência) - nesse caso, 10.71% ao ano

  // Criando um array para armazenar os dados do investimento ao longo do tempo
  const data1 = [];

  // Loop para calcular os valores acumulados para cada tipo de investimento ao longo do tempo
  for (let i = 1; i <= Tempo; i++) {
    // Calculando o número de meses com base na unidade de tempo selecionada (anos ou meses)
    const meses = timeUnit === "anos" ? i * 12 : i;

    // Inicializando os valores acumulados para cada tipo de investimento no início do período
    let ValorAcumuladoCDI = ValorInicial;
    let ValorAcumuladoPoupanca = ValorInicial;
    let ValorAcumuladoTesouroDireto = ValorInicial;

    // Loop para calcular o valor acumulado para cada tipo de investimento em cada mês
    for (let j = 1; j <= meses; j++) {
      // Atualizando o valor acumulado para o CDI com base na taxa mensal e no valor investido mensalmente
      ValorAcumuladoCDI *= 1 + cdiRate / 12; // A taxa de juros anual é dividida por 12 para obter a taxa mensal
      ValorAcumuladoCDI += ValorMensal;

      // Atualizando o valor acumulado para a Poupança com base na taxa mensal e no valor investido mensalmente
      ValorAcumuladoPoupanca *= 1 + poupancaRate / 12; // A taxa de juros anual é dividida por 12 para obter a taxa mensal
      ValorAcumuladoPoupanca += ValorMensal;

      // Atualizando o valor acumulado para o Tesouro Direto com base na taxa mensal e no valor investido mensalmente
      ValorAcumuladoTesouroDireto *= 1 + tesouroDiretoRate / 12; // A taxa de juros anual é dividida por 12 para obter a taxa mensal
      ValorAcumuladoTesouroDireto += ValorMensal;
    }

    // Armazenando os valores acumulados para cada tipo de investimento no array de dados
    data1.push({
      meses,
      cdi: ValorAcumuladoCDI,
      poupanca: ValorAcumuladoPoupanca,
      tesouroDireto: ValorAcumuladoTesouroDireto,
    });
  }

  // Exibindo o gráfico de barras com os dados calculados
  document.getElementById("graphContainer").style.display = "block";
  google.charts.load("current", { packages: ["bar"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    // Criando uma tabela de dados para o gráfico de barras
    var data = new google.visualization.DataTable();
    data.addColumn("number", "Meses");
    data.addColumn("number", "CDI");
    data.addColumn("number", "Poupança");
    data.addColumn("number", "Tesouro Direto - Selic 2027");
  
    // Preenchendo a tabela de dados com os valores calculados
    for (var i = 0; i < data1.length; i++) {
      data.addRow([
        data1[i].meses,
        data1[i].cdi,
        data1[i].poupanca,
        data1[i].tesouroDireto,
      ]);
    }
  
    // Definindo as opções de formatação para o gráfico de barras
    var options = {
      colors: ["#00FF6A", "#00D997", "#00CAFF"],
      bars: "vertical",
      backgroundColor: "transparent",
      chartArea: {
        backgroundColor: "transparent",
      },
      annotations: {
        textStyle: {
          color: "var(--color-texto-body)",  // Cor do texto das anotações
          fontSize: 12,
        },
      },
      hAxis: {
        textStyle: {
          color: "var(--color-texto-body)",  // Cor do texto do eixo horizontal
          fontSize: 18,
        },
        titleTextStyle: {
          color: "var(--color-texto-body)",  // Cor do título do eixo horizontal
          fontSize: 18,
        },
      },
      vAxis: {
        textStyle: {
          color: "var(--color-texto-body)",  // Cor do texto do eixo vertical
          fontSize: 18,
        },
        titleTextStyle: {
          color: "var(--color-texto-body)",  // Cor do título do eixo vertical
          fontSize: 18,
        },
      },
      legend: {
        textStyle: {
          color: "var(--color-texto-body)",  // Cor do texto da legenda
          fontSize: 18,
        },
      },
      titleTextStyle: {
        color: "var(--color-texto-body)",  // Cor do título do gráfico
        fontSize: 18,
      },
    };
  
    // Criando o gráfico de barras e desenhando-o no elemento HTML especificado
    var chart = new google.charts.Bar(document.getElementById("columnchart_material"));
    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}