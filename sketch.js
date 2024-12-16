//Layout
let uiContainer;
let canvasContainer;

// UI
let sliders = {};
let inputs = {};
let buttons = {};
let checkboxes = {};
let targets = {};
let easingFactor = 0.1;


let colorBarsCheck = true;
let gratingsCheck = true;
let bordersCheck = true;
let centralCircleCheck = true;
let cornerCirclesCheck = true;
let blackAndWhiteBarsCheck = true;
let alternatingColorsBarCheck = true;
let greyScaleCheck = true;
let gradientBarsCheck = true;
let centralBlockCheck = true;
let textBlockCheck = true;
let crosshairCheck = true;


//Table
let c = 25; //cell
let f; //scale factor
let offsetX; // borders
let offsetY;// borders
let cols;
let rows;
let xPos; // for color bars
let yPos;
let bgColor = 155;
let strokeColor = 255;
let strokeW = 0;
let centralCircleR; 
let tableText = 'HELLO WORLD';
let img;
let circleRadius = 100;

let colors = {
  white: '#ffffff',
  yellow: '#fff000',
  cyan: '#00ffff',
  green: '#00ff00',
  magenta: '#ff00ff',
  red: '#ff0000',
  blue: '#0000ff',
  black: '#000000'
};

function randomise() {
//targets.strokeW = random(0, 3);
targets.bgColor = random(0, 255);
targets.strokeColor = random(0, 255);
targets.c = random(15, 70);
sliders.strokeW.value(strokeW);
sliders.bgColor.value(bgColor);
sliders.strokeColor.value(strokeColor);
sliders.c.value(c);

}

function createUI() {
  let uiContainer = select('#ui-container');
  //let inputColumn = createDiv().class('column').parent(uiContainer);
  let checkboxColumn = createDiv().class('column').parent(uiContainer);
  let sliderColumn = createDiv().class('column').parent(uiContainer);
  let buttonColumn = createDiv().class('column').parent(uiContainer);
 
  
  

  
  // text checkbox
  checkboxes.textBlock = createCheckbox('Text', true);
  checkboxes.textBlock.class('checkbox');
  checkboxes.textBlock.changed(() => {
  textBlockCheck = checkboxes.textBlock.checked();
  });
  checkboxes.textBlock.parent(checkboxColumn);
  
  // borders checkbox
  checkboxes.borders = createCheckbox('Borders', true);
  checkboxes.borders.class('checkbox');
  checkboxes.borders.changed(() => {
  bordersCheck = checkboxes.borders.checked();
  });
  checkboxes.borders.parent(checkboxColumn); 
  
  // cornerCircles checkbox
  checkboxes.cornerCircles = createCheckbox('Corner Circles', true);
  checkboxes.cornerCircles.class('checkbox');
  checkboxes.cornerCircles.changed(() => {
  cornerCirclesCheck = checkboxes.cornerCircles.checked();
  });
  checkboxes.cornerCircles.parent(checkboxColumn); 
  
  // colorbars checkbox
  checkboxes.colorBars = createCheckbox('Color Bars', true);
  checkboxes.colorBars.class('checkbox');
  checkboxes.colorBars.changed(() => {
  colorBarsCheck = checkboxes.colorBars.checked();
  });
  checkboxes.colorBars.parent(checkboxColumn);
  
  // alternatingColorsBar checkbox
  checkboxes.alternatingColorsBar = createCheckbox('Contrast Color Bars', true);
  checkboxes.alternatingColorsBar.class('checkbox');
  checkboxes.alternatingColorsBar.changed(() => {
  alternatingColorsBarCheck = checkboxes.alternatingColorsBar.checked();
  });
  checkboxes.alternatingColorsBar.parent(checkboxColumn); 
  
  // circle checkbox
  checkboxes.centralCircle = createCheckbox('Central Circle', true);
  checkboxes.centralCircle.class('checkbox');
  checkboxes.centralCircle.changed(() => {
  centralCircleCheck = checkboxes.centralCircle.checked();
  });
  checkboxes.centralCircle.parent(checkboxColumn);
  
  // centralblock checkbox
  checkboxes.centralBlock = createCheckbox('Central Blocks', true);
  checkboxes.centralBlock.class('checkbox');
  checkboxes.centralBlock.changed(() => {
  centralBlockCheck = checkboxes.centralBlock.checked();
  });
  checkboxes.centralBlock.parent(checkboxColumn); 
  
  // crosshair checkbox
  checkboxes.crosshair = createCheckbox('Crosshair', true);
  checkboxes.crosshair.class('checkbox');
  checkboxes.crosshair.changed(() => {
  crosshairCheck = checkboxes.crosshair.checked();
  });
  checkboxes.crosshair.parent(checkboxColumn); 
  
  
  // greyScale checkbox
  checkboxes.greyScale = createCheckbox('Greyscale Gradient', true);
  checkboxes.greyScale.class('checkbox');
  checkboxes.greyScale.changed(() => {
  greyScaleCheck = checkboxes.greyScale.checked();
  });
  checkboxes.greyScale.parent(checkboxColumn); 
  
  // gradientBars checkbox
  checkboxes.gradientBars = createCheckbox('Color Gradient', true);
  checkboxes.gradientBars.class('checkbox');
  checkboxes.gradientBars.changed(() => {
  gradientBarsCheck = checkboxes.gradientBars.checked();
  });
  checkboxes.gradientBars.parent(checkboxColumn); 
  
   // gratings checkbox
  checkboxes.gratings = createCheckbox('Gratings', true);
  checkboxes.gratings.class('checkbox');
  checkboxes.gratings.changed(() => {
  gratingsCheck = checkboxes.gratings.checked();
  });
  checkboxes.gratings.parent(checkboxColumn); 
  
  // blackAndWhiteBars checkbox
  checkboxes.blackAndWhiteBars = createCheckbox('Black & White Bars', true);
  checkboxes.blackAndWhiteBars.class('checkbox');
  checkboxes.blackAndWhiteBars.changed(() => {
  blackAndWhiteBarsCheck = checkboxes.blackAndWhiteBars.checked();
  });
  checkboxes.blackAndWhiteBars.parent(checkboxColumn); 
  
  
  // Cell size slider
  sliders.c = createSlider(15, 70, c);
  sliders.c.class('slider');
  sliders.c.input(() => {
  targets.c = sliders.c.value();
  generatePattern();
  });
  sliders.c.parent(sliderColumn);
  
  //bgColor Slider
  sliders.bgColor = createSlider(0, 255, bgColor);
  sliders.bgColor.class('slider');
  sliders.bgColor.input(() => {
  targets.bgColor = sliders.bgColor.value();
  generatePattern();
  });
  sliders.bgColor.parent(sliderColumn);
  
  //bgColor Slider
  sliders.strokeColor = createSlider(0, 255, strokeColor);
  sliders.strokeColor.class('slider');
  sliders.strokeColor.input(() => {
  targets.strokeColor = sliders.strokeColor.value();
  generatePattern();
  });
  sliders.strokeColor.parent(sliderColumn);
  
  
    //strokeW Slider
  sliders.strokeW = createSlider(0, 3, strokeW);
  sliders.strokeW.class('slider');
  sliders.strokeW.input(() => {
    targets.strokeW = sliders.strokeW.value();
    generatePattern();

  });
  sliders.strokeW.parent(sliderColumn);
  
    // text Field
  inputs.text = createInput(tableText);
  inputs.text.class('input');
  inputs.text.input(() => {
  tableText = inputs.text.value();
  });
  inputs.text.parent(buttonColumn);
  
  // Randomise Button
  buttons.random = createButton
  (`<span class="center-align">Randomise</span>`);
  buttons.random.class('button');
  buttons.random.mousePressed(() => {randomise(); recolor(); generatePattern();});
  buttons.random.parent(buttonColumn);
  
    // Randomise Colors
  buttons.recolor = createButton
  (`<span class="center-align">Recolor</span>`);
  buttons.recolor.class('button');
  buttons.recolor.mousePressed(() => {recolor(); generatePattern();});
  buttons.recolor.parent(buttonColumn);
  
      // Reset Colors
  buttons.resetColors = createButton
  (`<span class="center-align">Default Colors</span>`);
  buttons.resetColors.class('button');
  buttons.resetColors.mousePressed(() => {resetColors();generatePattern();});
  buttons.resetColors.parent(buttonColumn);
  
      // Save As Is
  buttons.saveCurrent = createButton
  (`<span class="center-align">Save</span>`);
  buttons.saveCurrent.class('button');
  buttons.saveCurrent.mousePressed(() => {savePNG()});
  buttons.saveCurrent.parent(buttonColumn);
  

  
}

function setup() {
  
  uiContainer = select('#ui-container');
  createUI();
  const uiHeight = document.getElementById('ui-container').offsetHeight;
  canvasContainer = select('#canvas-container');
  canvas = createCanvas(windowWidth, windowHeight - uiHeight);
  
  canvas.drop(handleFile);
  //noSmooth();
  
  textAlign(CENTER, CENTER);
  generatePattern();

  
  targets.strokeW = sliders.strokeW.value();
  targets.bgColor = sliders.bgColor.value();
  targets.strokeColor = sliders.strokeColor.value();
  targets.c = sliders.c.value();

//   strokeColor = targets.strokeColor;
//   bgColor = targets.bgColor;
//   strokeW = targets.strokeW;
//   c = targets.c;
  randomise();
  recolor();


  
}

function calculateScalingFactor(){
   rows = ceil((height - c) / c);
   let calcf = ceil((rows-2)/16);
  if (calcf < 1){
    f = 1;
  } else {
  if (calcf < 1.5){
    f = 2;
  } else {
    f = 3;
  }
  }
  print(f);
}

function generatePattern(){

  calculateScalingFactor();
  gridBG(); // Grid Box
  if (centralCircleCheck) {centralCircle();} //
  if (gradientBarsCheck) {gradientBars();}
  if (gratingsCheck) {gratings();}
  if (blackAndWhiteBarsCheck) {blackAndWhiteBars();}
  if (alternatingColorsBarCheck) {alternatingColorsBar();}
  if (greyScaleCheck) {greyScale();}
  if (centralBlockCheck){centralBlock();}
  if (crosshairCheck){crosshair();}
  if (colorBarsCheck) {colorBars();}
  if (cornerCirclesCheck) {cornerCircles();}
  if (bordersCheck){borders();}
  if (textBlockCheck){textBlock();}
  showImage();
}

function draw() {
  background(bgColor);
  // Smoothly interpolate global variables toward targets
  strokeColor = lerp(strokeColor, targets.strokeColor, easingFactor);
  bgColor = lerp(bgColor, targets.bgColor, easingFactor);
  strokeW = lerp(strokeW, targets.strokeW, 1);
  c = lerp(c, targets.c, easingFactor);

  // Use the graphics function to redraw with updated values
  generatePattern(bgColor, strokeColor, strokeW, c);
}

function gridBG() {
 // background(255);
  stroke(strokeColor);
  strokeWeight(strokeW);

  // cell calculation
  cols = floor((width - c) / c);
  if (cols % 2 != 0) cols++;
 // print('Cols: '+cols);

  rows = floor((height - c) / c);
  if (rows % 2 != 0) rows++;
  
  print(cols+'x'+rows);

  // Calculate offsets
  offsetX = (width - (cols * c)) / 2;
  offsetY = (height - (rows * c)) / 2;
  

  // Draw main grid
  for (let x = 0; x <= cols-1; x++) {
    for (let y = 0; y <= rows-1; y++) {
      xPos = offsetX + x * c;
      yPos = offsetY + y * c;
      fill(bgColor);
      rect(xPos, yPos, c, c);
    }
  }
  
  centralCircleR = floor((rows-2)*c);
}

function borders() {
  strokeWeight(strokeW);
  stroke(strokeColor);
    // top and bottom
  for (let x = -1; x <= cols; x++) {
    let xPos = offsetX + x * c;

    // top
    let yPosTop = 0;
    fill((x % 2 === 0) ? 0 : 255);
    rect(xPos, yPosTop, c, offsetY);

    // bottom
    let yPosBottom = offsetY + rows * c;
    fill((x % 2 === 0) ? 255 : 0);
    rect(xPos, yPosBottom, c, c);
  }

  // left and right
    for (let y = -1; y <= rows; y++) {
    let yPos = offsetY + y * c;

    // left
    let xPosLeft = 0;
    fill((y % 2 === 0) ? 0 : 255);
    rect(xPosLeft, yPos, offsetX, c);

    // right
    let xPosRight = offsetX + cols * c;
    fill((y % 2 === 0) ? 255 : 0);
    rect(xPosRight, yPos, width - xPosRight, c);
  }
  noStroke();
}

function cornerCircles() {
  cornerCircle(offsetX + 2*c, offsetY + 2*c);
  cornerCircle(offsetX + 2*c, height - offsetY - 2*c);
  cornerCircle(width - offsetX - 2*c, offsetY + 2*c);
  cornerCircle(width - offsetX - 2*c, height - offsetY - 2*c);
}
function cornerCircle(cornerX, cornerY) {

  if (rows >= 8 && cols >= 8){
  push();
  strokeWeight(strokeW);
  stroke(strokeColor);
  translate(cornerX, cornerY);
  fill(255);
  ellipse(0, 0, 4*c);
  fill(bgColor);
  rect(-c, -c, 2*c); 
  line(-c, 0, c, 0);
  line(0, -c, 0, c);
  pop();
}
}
function textBlock(){
  
  let textBlockYPos;
  let textBlockWidth = ceil(tableText.length*c);
  if (textBlockWidth % 2 != 0) {
    textBlockWidth += c;
  }
  if (rows >= 7){
  strokeWeight(strokeW);
  stroke(strokeColor);
  fill(bgColor);
  
  if (rows > 10){
  textBlockYPos = offsetY+3*c;
  } else {
  textBlockYPos = height/2;
  }
  rectMode(CENTER);
  rect(width/2,textBlockYPos,10*c,2*c);
  }
  rectMode(CORNER);

  if (bgColor > 200) {
    fill(0);
  } else {
    fill (255);
  }
    
  noStroke();
  //strokeWeight(3);
  //stroke(0);
  textSize(c);
  text(tableText, width/2, textBlockYPos+1);
  noStroke();

}
function colorBars() {
  strokeWeight(strokeW);
  stroke(strokeColor);  
  
  let barWidth = floor(cols/8)*c;
  //(width / 8 - offsetX/4)
  let barHeight = floor((rows/6))*c;
  let corr = ((cols % 8)/2)*c;
  let palette = [colors.white,colors.yellow, colors.cyan, colors.green, colors.magenta,colors.red,colors.blue,colors.black];

  
  if (rows >= 8) {
  for (let i = 0; i < 8; i++) {
      
  fill(palette[i]);
  rect(i * barWidth + offsetX+corr,offsetY + 4 * c, barWidth, barHeight);
    }
  
  fill(colors.white);
  rect(offsetX, offsetY+4*c, barWidth+corr, barHeight);
  fill(colors.black);
  rect(width-offsetX-corr-barWidth, offsetY+4*c, barWidth+corr, barHeight);
    
  for (let i = 0; i < 8; i++) {
  fill(palette[i]);
  rect(i * barWidth + offsetX+corr,height-offsetY - barHeight - 4*c, barWidth, barHeight);
    }
  fill(colors.white);
  rect(offsetX, height-offsetY - barHeight - 4*c, barWidth+corr, barHeight);
  fill(colors.black);
  rect(width-offsetX-corr-barWidth, height-offsetY - barHeight - 4*c, barWidth+corr, barHeight);  
}
}
function alternatingColorsBar() {
  
    push();
    let sideBlockWidth = (centralCircleR/2-5*c);
    stroke(strokeColor);
  
    translate (width/2, height/2);
  if (rows >=6){
    for (let i = 0; i <= ceil(sideBlockWidth/c); i++) {
    let xPos = i * c;
    fill((i % 2 === 0) ? colors.magenta : colors.green);
    //noStroke();
    rect(-centralCircleR/2+xPos, -2*c*f, c, c*f);
  }  
  
    for (let i = 0; i <= ceil(sideBlockWidth/c); i++) {
    let xPos = i * c;
    fill((i % 2 === 0) ? colors.red : colors.blue);
    rect(4*c+xPos, -2*c*f, c, c*f);
  }  
  
    for (let i = 0; i <= 7; i++) {
    let xPos = i * c;
    fill((i % 2 === 0) ? colors.yellow : colors.cyan);
    rect(-4*c+xPos, -2*c*f, c, c*f);
  }  
  }
  
  pop();

}
function centralCircle(){

  push();
  translate(width/2,height/2);
  centralCircleR = floor((rows-2)*c);
  strokeWeight(strokeW);
  stroke(strokeColor);
  print('circle:'+ centralCircleR);
  //noFill();
  
  
  if (rows >= 9){ //only if enough space
  fill(255);
  ellipse(0,0,centralCircleR);

  }
    if (rows <= 8){
  fill(255);
  ellipse(0,0,rows*c);
  }
    pop();
}
function centralBlock() {
  push();
  translate(width/2, height/2);
  stroke(strokeColor);
  if (rows >= 9){ //only if enough space
  rectMode(CORNERS)
  fill(255);
  rect(-centralCircleR/2,-c*f,-4*c, c*f); //white left
    
  fill(0);
  rect(-centralCircleR/2,0,-4*c, c*f); //black left
    
  line(-centralCircleR/2, c*f, -4*c, 0); // diagonal left
  
  fill(255);
  rect(centralCircleR/2, 0, 4*c, c*f); //white right
    
  fill(0);
  rect(centralCircleR/2, 0, 4*c, -c*f); //black right
    
  line(4*c, 0, centralCircleR/2, -c*f); // diagonal right
  } 

pop();
  
 
}
function crosshair(){
  
  push();
  translate (width/2, height/2);
  fill(bgColor);
  stroke(strokeColor);
  rect(-4*c, -c*f, 8*c, 2*c*f); rect(-c*f, -c*f, 2*c*f, 2*c*f);// central block
  line(-c*f, 0, c*f, 0); line(0, -c*f, 0, c*f); // plus
  pop();
}
function gradientBars() {
    
  
    //color gradient line
    for (let i = 0; i < centralCircleR-1.5; i++) {
    noStroke();
    let inter = map(i, 0, centralCircleR, 0, 1);
    let colorValue = lerpColor(color(colors.green), color(colors.magenta), inter);
    fill(colorValue);
    rect((width/2-centralCircleR/2)+i, height/2+c*f, 2, c*f); 
  }
  
    noFill();
    strokeWeight(strokeW);
    stroke(strokeColor);
    rect(width/2-centralCircleR/2, height/2+c*f, centralCircleR, c*f); 
}
function blackAndWhiteBars() {
//bw stripes under color bars  
  if (rows >=7){
  for (let x = -1; x <= floor(centralCircleR/c/2+1); x++) {
    let xPos = (width/2-centralCircleR/4) + x * c;
    let yPosBottom = offsetY + rows * c;
    strokeWeight(strokeW);
    stroke(strokeColor);
    fill((x % 2 === 0) ? 255 : 0);
    rect(xPos, height -offsetY-4*c, c, c);
  }
  }
}
function gratings() {
//bw stripes above color bars  
  for (let x = 0; x <= 8*cols-1; x++) {
    let xPos = x * (c/8);
    fill((x % 2 === 0) ? 255 : 0);
    noStroke();
    rect(offsetX+xPos, height/2+2*c*f, c/8, c*f);
  }
  noFill();
  stroke(strokeColor);
  strokeWeight(strokeW);
  rect(offsetX, height/2+2*c*f, width-2*offsetX, c*f);
}
function greyScale() {
  
    for (let i = 0; i < cols*c-1; i++) {
    let inter = map(i, 0, cols*c, 0, 1);
    let colorValue = lerpColor(color(0), color(255), inter);
    fill(colorValue);
    noStroke();
    rect(offsetX+i, height/2-3*c*f, 2, c*f); 
  }
  
    //stroke rect
    noFill();
    strokeWeight(strokeW);
    stroke(strokeColor);
    rect(offsetX, height/2-3*c*f, width-2*offsetX, c*f); 
  
}
function handleFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data, () => {
      showImage();
    });
  }
}
function showImage() {
   if (img) {
    const centerX = width / 2;
    const centerY = height / 2;

    // Clip region to draw the image in a circle
    push();
    translate(centerX, centerY);
    ellipseMode(RADIUS);
    noStroke();
    fill(255);

    // Use p5 masking for the circular clipping
    let mask = createGraphics(c*f*2, c*f*2);
    mask.ellipse(c*f, c*f, c*f*2, c*f*2);
    img.mask(mask);

    // Draw the masked image
    imageMode(CENTER);
    image(img, 0, 0, c*f*2, c*f*2);
    pop();
    push();
    translate(width/2, height/2);
    ellipseMode(RADIUS);
    noFill();
    strokeWeight(strokeW);
    stroke(strokeColor);
    ellipse(0, 0, c*f);
    pop();
   } else {
    fill(100);
    //text('Drag and drop an image here', width / 2, height / 2);
   }
  
}
function recolor() {
  for (let key in colors) {
    colors[key] = getRandomColor();
  }
}
function getRandomColor() {
  return '#' + floor(random(0, 16777215)).toString(16).padStart(6, '0');
}

function resetColors() {
  colors = {
  white: '#ffffff',
  yellow: '#fff000',
  cyan: '#00ffff',
  green: '#00ff00',
  magenta: '#ff00ff',
  red: '#ff0000',
  blue: '#0000ff',
  black: '#000000'
};
}

function savePNG() {
  save();
}


function windowResized() {
  const uiHeight = document.getElementById('ui-container').offsetHeight;
  resizeCanvas(windowWidth, windowHeight - uiHeight);
  generatePattern();
}


