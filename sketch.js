let inputBox;
let slider;
let button;
let selectMenu;
let iframe;
let isBouncing = false;

function setup() {   
  //產生一個畫布,充滿整個瀏覽器視窗,並且將畫布的背景設為 #750000
  createCanvas(windowWidth, windowHeight);
  background('#750000');
  
  // 產生一個可以輸入的文字框，並顯示座標(10, 10)，寬為200，高為40，背景顏色為 #FFE66F，邊框粗細為4
  inputBox = createInput('教育科技系');
  inputBox.position(10, 10);
  inputBox.size(200, 40);
  inputBox.style('background-color', '#FFE66F');
  inputBox.style('border', '4px solid black');
  
  // 產生一個滑桿物件，顯示在座標為(220, 10)，寬為100，初始值為20
  slider = createSlider(12, 40, 24);
  slider.position(460, 25);
  slider.size(100);
  
  // 產生一個按鈕物件，顯示在座標為(580, 10)，按鈕上的文字為"跳動"
  button = createButton('跳動');
  button.position(580, 10);
  button.mousePressed(toggleBounce);
  button.style('background-color', '#FFE66F');
  button.style('border-radius', '5px');
  
  // 產生一個下拉式選單，顯示在座標為(800, 10)，寬為100
  selectMenu = createSelect();
  selectMenu.position(800, 10);
  selectMenu.size(100);
  selectMenu.option('淡江大學', 'https://www.tku.edu.tw/');
  selectMenu.option('教育科技', 'https://www.et.tku.edu.tw/');
  selectMenu.option('Iclass', 'https://iclass.tku.edu.tw/');
  selectMenu.changed(loadWebsite);
  
  // 產生一個 iframe，顯示在視窗中間，寬為視窗寬度-20，高為視窗高度-20
  iframe = createElement('iframe');
  iframe.position(10, 100);
  iframe.size(windowWidth - 20, windowHeight - 110);
}

function toggleBounce() {
  isBouncing = !isBouncing;
}

function loadWebsite() {
  let url = selectMenu.value();
  iframe.attribute('src', url);
}

function draw() {
  background('#750000'); // 設置背景顏色為 #750000
  text("文字大小", 320, 20); // 在座標(320, 20)顯示文字「文字大小」
  // 根據滑桿的位置調整文字大小
  let textSizeValue = slider.value();
  textSize(textSizeValue);
  textAlign(LEFT, TOP);
  fill("#272727"); // 設置文字顏色為 #272727
  
  // 取得輸入框的值
  let textToDisplay = inputBox.value();
  let repeatedText = textToDisplay.split("").join(" ");
  
  let textWidthWithSpace = textWidth(repeatedText + " ");
  let repeatCount = Math.ceil(width / textWidthWithSpace);
  let fullText = "";
  
  for (let i = 0; i < repeatCount; i++) {
    fullText += repeatedText + " ";
  }
  
  let y = 100;
  let lineHeight = textAscent() + textDescent();
  while (y < height) {
    let bounceOffset = isBouncing ? random(-5, 5) : 0;
    text(fullText, 0, y + bounceOffset);
    y += lineHeight;
  }
}