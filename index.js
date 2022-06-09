// Grupo de datos en el input
let data;
let reValidateData = new RegExp(/\D/, "g");

// botones
let clearHandler = document.getElementById("clear-button");
let mediaHandler;
let varianzaHandler;
let desestHandler;
let covarHandler;

// elementos
let formElement = document.getElementById("datos-form");
let dataLabel = document.getElementById("data-label-text");
let mediaElement;
let varianzaElement;
let desestElement;
let covarElement;

const clear = () => {
  const respuestasElement = document.getElementById("respuestas");
  const respuestasHTML = `
  <div id="media" class="answer hidden"></div>
  <div id="varianza" class="answer hidden"></div>
  <div id="desest" class="answer hidden"></div>
  <div id="covar" class="answer hidden"></div>
  `;
  respuestasElement.innerHTML = respuestasHTML;

  // Grupo de datos en el input
  data = document.getElementById("data");

  // botones
  clearHandler.classList.add("hidden");
  clearHandler.classList.remove("clear-button");
  mediaHandler = document.getElementById("media-button");
  varianzaHandler = document.getElementById("varianza-button");
  desestHandler = document.getElementById("desest-button");
  covarHandler = document.getElementById("covar-button");

  // elementos
  mediaElement = document.getElementById("media");
  varianzaElement = document.getElementById("varianza");
  desestElement = document.getElementById("desest");
  covarElement = document.getElementById("covar");
};
clear();

// funciones

const calcMedia = data => {
  let mediaHTML = `
    <p class="answer-title">Media aritmética</p>
    <div class="proc">
      <p class="answer-symbol">μ</p>
      <p class="answer-proc">
        <span class="answer-row"><span class="answer-equal"> = </span>(<span class="sumatory">∑x</span>) / <span class="nol">n</span> <br /></span>
        <span class="answer-row"> = [ <span class="sumatory">${data
          .map((x) => x)
          .join(" + ")}</span> ] / <span class="nol">${
    data.length
  }</span> <br></span>
        <span class="answer-row"> = <span class="sumatory">${data.reduce(
          (a, b) => a + b
        )}</span> / <span class="nol">${data.length}</span> <br></span>
        <span class="answer-row"><span class="answer-equal"> = </span> <span class="answer-final">${
          data.reduce((a, b) => a + b) / data.length
        }</span></span>
        
        
        
      </p>
    </div>
  `;
  mediaElement.innerHTML = mediaHTML;
  mediaElement.classList.remove("hidden");
  return data.reduce((a, b) => a + b) / data.length;
};

const calcVarianza = data => {
  let media = calcMedia(data);
  let roundMedia = roundTwoDecimals(media);
  let varianza = 0;
  for (let i = 0; i < data.length; i++) {
    varianza += ((data[i] - media) ** 2)/data.length;
  }
  let varianzaHTML = `
    <p class="answer-title">Varianza</p>
    <div class="proc">
      <p class="answer-symbol">σ²</p>
      <p class="answer-proc">

        <span class="answer-row"><span class="answer-equal"> = </span> [<span class="sumatory">∑(x-μ)²</span>] / <span class="nol">n</span> <br /></span>
        <span class="answer-row"> = [ <span class="sumatory">${data
          .map((x) => `(${x} - ${roundMedia})²`)
          .join(" + ")}</span>] / <span class="nol">${
    data.length
  }</span> <br></span>
        <span class="answer-row"> = [ <span class="sumatory">${data
          .map((x) =>
            x - media < 0
              ? `(${roundTwoDecimals(x - media)})²`
              : roundTwoDecimals(x - media) + "²"
          )
          .join(" + ")}</span>] / <span class="nol">${
    data.length
  }</span> <br></span>
        <span class="answer-row"> = [ <span class="sumatory">${data
          .map((x) => roundTwoDecimals((x - media) ** 2))
          .join(" + ")}</span>] / <span class="nol">${
            data.length
          }</span> <br></span>
          <span class="answer-row"> = <span class="sumatory">${roundTwoDecimals(
          varianza * data.length
        )}</span> / <span class="nol">${data.length}</span> <br></span>
        <span class="answer-row"><span class="answer-equal"> = </span> <span class="answer-final">${varianza}</span></span>
      </p>
    </div>
  `;
  varianzaElement.innerHTML = varianzaHTML;
  varianzaElement.classList.remove("hidden");
  return varianza;
};

const calcDesest = data => {
  let varianza = calcVarianza(data);
  let desestHTML = `
    <p class="answer-title">Desviación Estándar</p>
    <div class="proc">
      <p class="answer-symbol">σ</p>
      <p class="answer-proc">
        <span class="answer-row"><span class="answer-equal"> = </span>√<span class="symbol">σ²</span><br/></span>
        <span class="answer-row"> = √<span class="symbol">${roundTwoDecimals(varianza)}</span><br></span>
        <span class="answer-row"> = <span class="answer-final">${Math.sqrt(varianza)}</span></span>
      </p>
    </div>
  `;
  desestElement.innerHTML = desestHTML;
  desestElement.classList.remove("hidden");
  return Math.sqrt(varianza);
};

const calcCovar = data => {
  let desest = calcDesest(data);
  let covarHTML = `
    <p class="answer-title">Coeficiente de variación</p>
    <div class="proc">
      <p class="answer-symbol">Cᵥ</p>
      <p class="answer-proc">
        <span class="answer-row"><span class="answer-equal"> = </span><span class="symbol">σ</span>/<span class="nol">n</span>⋅100<br/></span>
        <span class="answer-row"> = <span class="symbol">${roundTwoDecimals(desest)}</span>/<span class="nol">${data.length}</span>⋅100<br></span>
        <span class="answer-row"> = <span class="symbol">${roundTwoDecimals(desest/data.length)}</span>⋅100<br></span>
        <span class="answer-row"> = <span class="answer-final">${(desest/data.length)*100}%</span></span>
      </p>
    </div>
  `;
  covarElement.innerHTML = covarHTML;
  covarElement.classList.remove("hidden");
  return (desest/data.length)*100;
};

//  utilidades

const roundTwoDecimals = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

const inputToArr = (data) => {
  data = data.value.replace(reValidateData, " ").split(" ");
  for (let i = 0; i < data.length; i++) {
    if ((data[i] > -1 || data[i] < 1) && data[i] != "") {
      data[i] = Number(data[i]);
    } else {
      data.splice(i, 1);
      i--;
    }
  }
  return data;
};

const handle = (func) => {
  const dataArr = inputToArr(data);
  if (dataArr.length) {
    func(dataArr);
    clearHandler.classList.add("clear-button");
    clearHandler.classList.remove("hidden");
  } else {
    setTimeout(() => {
      data.focus();
    }, 1);
  }
};

const HandleAll = () => {
  const dataArr = inputToArr(data);
  if (dataArr.length) {
    clearHandler.classList.add("clear-button");
    clearHandler.classList.remove("hidden");
    mediaHandler(dataArr);
    varianzaHandler(dataArr);
    desestHandler(dataArr);
  }
}

// event listeners
mediaHandler.addEventListener("click", (e) => {
  handle(calcMedia);
});

varianzaHandler.addEventListener("click", (e) => {
  handle(calcVarianza);
});

desestHandler.addEventListener("click", (e) => {
  handle(calcDesest);
});

covarHandler.addEventListener("click", (e) => {
  handle(calcCovar);
});

clearHandler.addEventListener("click", (e) => {
  clear();
});

data.addEventListener("keydown", (e) => {
  setTimeout(() => {
    if (data.value) {
      dataLabel.classList.remove("hidden-label");
      dataLabel.classList.add("shown-label");
      dataLabel.classList.remove("pre-hidden");
    } else if(!dataLabel.classList.contains("pre-hidden")) {
      dataLabel.classList.add("hidden-label");
      dataLabel.classList.remove("shown-label");
    }
  }, 1);
});