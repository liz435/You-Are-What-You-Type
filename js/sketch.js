let inputW = [];
let mod = "";
let idKey = "  _.:|░▒▓█";

let button_submit;
let msg = "Search something you like";

let asciiDiv;

function preload() {
  video = createCapture(VIDEO);
}

function setup() {
  var canvas = createCanvas(300, 300);
  canvas.parent('canvasForHTML');

  video.size(175, 80);
  asciiDiv = createDiv();
  asciiDiv.addClass('ascii-image'); // Add class name to the asciiDiv

  inputW = createInput("Search what your heart desires");
  inputW.input(data);
  inputW.position(450, 690);
  inputW.size(430);
  inputW.style('font-size', '22px');
  inputW.style('border', '2px solid #333'); // Add a border
  inputW.style('padding', '10px'); // Add padding
  inputW.style('border-radius', '5px'); // Add rounded corners
  inputW.style('outline', 'none'); // Remove the outline
  inputW.style('color', '#555'); // Change text color
  inputW.style('background-color', '#f5f5f5');

  button_submit = createButton("Google");
  button_submit.position(900, 690);
  button_submit.size(100);
  button_submit.mouseClicked(submit);
  button_submit.addClass('submit-button'); // Add class name to the submit button

  var div = createDiv('');


  // div.html(msg);


  div.position(1040, 600);
  div.style('font-size', '24px');
  div.style('font-family', 'Arial');
  div.style('color', 'white');
  div.style('width', "300px");
  div.style('line-height', '20px');
  div.addClass('message-div'); // Add class name to the message div
}

function submit() {
  mod = inputW.value();
  inputW.value(" ");
  idKey += mod;
  return idKey;
}

function data() {
  // Your data function logic here
}

function draw() {
  video.hide();
  video.loadPixels();

  if (keyIsDown(13)) {
    submit();
  }

  let asciiImage = " ";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = idKey.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = idKey.charAt(charIndex);
      if (c == " ") asciiImage += ("&nbsp;");
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}
