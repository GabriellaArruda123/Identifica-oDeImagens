function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}

function modelLoaded() {
    console.log('Model Loaded!');
}

function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}//Aqui, classifier é a variável que contém o modelo que importamos anteriormente.
  //classify é uma função predefinida do ml5.js usada para comparar a visualização vivo da webcam com o modelo e obter os resultados.
//no projeto anterior colocamos dentro da função preload
//Como o código dentro da função draw é executado continuamente, a função gotResult() exibe o resultado continuamente,

var previousResult = '';
//Esta variável será usada para manter a etiqueta do resultado.
function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    if((results[0].confidence > 0.5) && (previousResult != results[0].label)){
      console.log(results);
      previousResult = results[0].label;
      var synth = window.speechSynthesis; //Armazenaremos esta API em uma variável para que posteriormente possamos utilizar esta API
      speakData = 'O objeto detectado é - '+results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speakData);
      synth.speak(utterThis);

      document.getElementById("resultObjectName").innerHTML = results[0].label;
      document.getElementById("resultObjectAccuracy").innerHTML = results[0].confidence.toFixed(3);
      //Dentro da função toFixed(), coloque um número e, como resultado, apenas esse número de dígitos virá após o decimal.
    }
  }
}
