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
let strokeW = 1;
let centralCircleR; 

//colors
let white = '#ffffff';
let yellow = '#fff000';
let cyan = '#00ffff';
let green = '#00ff00';
let magenta = '#ff00ff';
let red = '#ff0000';
let blue = '#0000ff';
let black = '#000000';

function randomise() {
targets.strokeW = random(0, 10);
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
  
  // // Symbol Size Label
  // let label2 = createP(`
  //   <span class="label-left">GRID SIZE</span>
  //   <span class="label-right">${c}</span>
  // `);
  // label2.class('label-container');
  // label2.parent(uiContainer);

  // Cell size slider
  sliders.c = createSlider(15, 70, c);
  sliders.c.class('slider');
  sliders.c.input(() => {
    targets.c = sliders.c.value();
    generatePattern();
    // label2.html(`
    //   <span class="label-left">GRID SIZE</span>
    //   <span class="label-right">${c}</span>
    // `);
  });
  sliders.c.parent(uiContainer);
  
  //bgColor Slider
  sliders.bgColor = createSlider(0, 255, bgColor);
  sliders.bgColor.class('slider');
  sliders.bgColor.input(() => {
    targets.bgColor = sliders.bgColor.value();
    generatePattern();
    // label2.html(`
    //   <span class="label-left">GRID SIZE</span>
    //   <span class="label-right">${c}</span>
    // `);
  });
  sliders.bgColor.parent(uiContainer);
  
  //bgColor Slider
  sliders.strokeColor = createSlider(0, 255, strokeColor);
  sliders.strokeColor.class('slider');
  sliders.strokeColor.input(() => {
    targets.strokeColor = sliders.strokeColor.value();
    generatePattern();
    // label2.html(`
    //   <span class="label-left">GRID SIZE</span>
    //   <span class="label-right">${c}</span>
    // `);
  });
  sliders.strokeColor.parent(uiContainer);
  
  
    //strokeW Slider
  sliders.strokeW = createSlider(0, 10, strokeW);
  sliders.strokeW.class('slider');
  sliders.strokeW.input(() => {
    targets.strokeW = sliders.strokeW.value();
    generatePattern();
    // label2.html(`
    //   <span class="label-left">GRID SIZE</span>
    //   <span class="label-right">${c}</span>
    // `);
  });
  sliders.strokeW.parent(uiContainer);
  
    // Randomise Button
    buttons.random = createButton(`
      <span class="center-align">Random</span>
    `);
    buttons.random.class('button');
    buttons.random.mousePressed(() => {
    randomise();
    generatePattern();
    });
    buttons.random.parent(uiContainer);
  
  
//    // Symbol String Field
//   inputs.string = createInput(bgColor);
//   inputs.string.class('input');
//   inputs.string.input(() => {
//     symbolString = inputs.string.value();
//     // label5.html(`
//     //   <span class="label-left">SYMBOLS</span>
//     // `);
//   });
//   inputs.string.parent(uiContainer);
  
  
}

function setup() {
  
  uiContainer = select('#ui-container');
  createUI();
  const uiHeight = document.getElementById('ui-container').offsetHeight;
  canvasContainer = select('#canvas-container');
  createCanvas(windowWidth, windowHeight - uiHeight);
  noSmooth();
  generatePattern();

  
  targets.strokeW = sliders.strokeW.value();
  targets.bgColor = sliders.bgColor.value();
  targets.strokeColor = sliders.strokeColor.value();
  targets.c = sliders.c.value();

  strokeColor = targets.strokeColor;
  bgColor = targets.bgColor;
  strokeW = targets.strokeW;
  c = targets.c;
  randomise();

  
}

function draw() {
  // Smoothly interpolate global variables toward targets
  strokeColor = lerp(strokeColor, targets.strokeColor, easingFactor);
  bgColor = lerp(bgColor, targets.bgColor, easingFactor);
  strokeW = lerp(strokeW, targets.strokeW, easingFactor);
  c = lerp(c, targets.c, easingFactor);

  // Use the graphics function to redraw with updated values
  generatePattern(bgColor, strokeColor, strokeW, c);
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
  gridBG();
  centralCircle();
  alternatingColorsBar();
  gradientBars();
  colorBars();
  cornerCircle(offsetX + 2*c, offsetY + 2*c);
  cornerCircle(offsetX + 2*c, height - offsetY - 2*c);
  cornerCircle(width - offsetX - 2*c, offsetY + 2*c);
  cornerCircle(width - offsetX - 2*c, height - offsetY - 2*c);
  borders();
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
  for (let x = 0; x <= cols; x++) {
    for (let y = 0; y <= rows; y++) {
      xPos = offsetX + x * c;
      yPos = offsetY + y * c;
      fill(bgColor);
      rect(xPos, yPos, c, c);
    }
  }
}

function borders() {
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
}

function colorBars() {


  let barWidth = floor(cols/8)*c;
  //(width / 8 - offsetX/4)
  let barHeight = floor((rows/6))*c;
  let corr = ((cols % 8)/2)*c;
  let colors = [white,yellow, cyan, green, magenta,red,blue,black];
  strokeWeight(strokeW);
  stroke(strokeColor);  
  
  if (rows >= 8) {
  for (let i = 0; i < 8; i++) {
      
  fill(colors[i]);
  rect(i * barWidth + offsetX+corr,offsetY + 4 * c, barWidth, barHeight);
    }
  
  fill(white);
  rect(offsetX, offsetY+4*c, barWidth+corr, barHeight);
  fill(black);
  rect(width-offsetX-corr-barWidth, offsetY+4*c, barWidth+corr, barHeight);
    
  for (let i = 0; i < 8; i++) {
  fill(colors[i]);
  rect(i * barWidth + offsetX+corr,height-offsetY - barHeight - 4*c, barWidth, barHeight);
    }
  fill(white);
  rect(offsetX, height-offsetY - barHeight - 4*c, barWidth+corr, barHeight);
  fill(black);
  rect(width-offsetX-corr-barWidth, height-offsetY - barHeight - 4*c, barWidth+corr, barHeight);  
}

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

function centralCircle(){

  push();
  translate(width/2,height/2);
  
  strokeWeight(strokeW);
  stroke(strokeColor);
  centralCircleR = floor((rows-2)*c);
  print('circle:'+ centralCircleR);
  //noFill();
  
  
  if (rows >= 9){ //only if enough space
  fill(255);
  ellipse(0,0,centralCircleR);
  fill(255);
  rect(-centralCircleR/2,-c*f,centralCircleR/2-c*f, c*f); //white right
    
  fill(0);
  rect(-centralCircleR/2,0,centralCircleR/2-c*f, c*f); //black right
    
  stroke(strokeColor);
  line(-centralCircleR/2, c*f, -4*c, 0); // diagonal left
  
  stroke(strokeColor);
  fill(255);
  rect(4*c, 0, centralCircleR/2-4*c, c*f); //white left
    
  fill(0);
  rect(4*c, -c*f, centralCircleR/2-4*c, c*f); //black left
    
  stroke(strokeColor);
  line(4*c, 0, centralCircleR/2, -c*f); // diagonal right
  } 
  if (rows <= 8){
  fill(255);
  ellipse(0,0,rows*c);
  }
  
  fill(bgColor);
  stroke(strokeColor);
  rect(-4*c, -c*f, 8*c, 2*c*f); rect(-c*f, -c*f, 2*c*f, 2*c*f);// central block

  line(-c*f, 0, c*f, 0); line(0, -c*f, 0, c*f); // plus
  
  pop();
  
  //grey window
  if (rows >= 7){
  fill(bgColor);
  rect(width/2-5*c,offsetY+3*c,10*c,c)
  }
  
//bw stripes under color bars  
  if (rows >=7){
  for (let x = -1; x <= ceil(centralCircleR/c/2); x++) {
    let xPos = (width/2-centralCircleR/4) + x * c;
    let yPosBottom = offsetY + rows * c;
    
    fill((x % 2 === 0) ? 255 : 0);
    rect(xPos, height -offsetY-4*c, c, c);
  }
  }
  
//bw stripes above color bars  
  for (let x = 0; x <= 8*cols-1; x++) {
    let xPos = x * (c/8);
    fill((x % 2 === 0) ? 255 : 0);
    noStroke();
    rect(offsetX+xPos, height/2+2*c*f, c/8, c*f);
  }  
}

function gradientBars() {
  
    //bw gradient line
    for (let i = 0; i < cols*c; i++) {
    let inter = map(i, 0, cols*c, 0, 1);
    let colorValue = lerpColor(color(0), color(255), inter);
    fill(colorValue);
    noStroke();
    rect(offsetX+i, height/2-3*c*f, 2, c*f); 
  }
  
    //stroke rect on top (needed?)
    noFill();
    strokeWeight(strokeW);
    stroke(strokeColor);
    rect(offsetX, height/2-3*c*f, width-2*offsetX, c*f); 
  
  
    //color gradient line
    for (let i = 0; i < centralCircleR-1.5; i++) {
    noStroke();
    let inter = map(i, 0, centralCircleR, 0, 1);
    let colorValue = lerpColor(color('#00FF00'), color('#FF00FF'), inter);
    fill(colorValue);
    rect((width/2-centralCircleR/2)+i, height/2+c*f, 2, c*f); 
  }
  
    noFill();
    strokeWeight(strokeW);
    stroke(strokeColor);
    rect(width/2-centralCircleR/2, height/2+c*f, centralCircleR, c*f); 
}

function alternatingColorsBar() {
    let sideBlockWidth = (centralCircleR/2-5*c);
    stroke(strokeColor);
  
    push();
    translate (width/2, height/2);
  if (rows >=6){
    for (let i = 0; i <= ceil(sideBlockWidth/c); i++) {
    let xPos = i * c;
    fill((i % 2 === 0) ? magenta : green);
    //noStroke();
    rect(-centralCircleR/2+xPos, -2*c*f, c, c*f);
  }  
  
    for (let i = 0; i <= ceil(sideBlockWidth/c); i++) {
    let xPos = i * c;
    fill((i % 2 === 0) ? red : blue);
    rect(4*c+xPos, -2*c*f, c, c*f);
  }  
  
    for (let i = 0; i <= 7; i++) {
    let xPos = i * c;
    fill((i % 2 === 0) ? yellow : cyan);
    rect(-4*c+xPos, -2*c*f, c, c*f);
  }  
  }
  
  pop();

}

function windowResized() {
  const uiHeight = document.getElementById('ui-container').offsetHeight;
  resizeCanvas(windowWidth, windowHeight - uiHeight);
  generatePattern();
}

