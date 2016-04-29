// GLOBAL VARIABLES
var hit=false;
var pieces = [];
var tetrad=[];
var buildup=[];
  
var w = 30;
var xpos = 120;
var ypos = 0;

var unit_0 = {"x":xpos, "y":ypos};
var unit_1 = {"x":xpos+w, "y":ypos};
var unit_2 = {"x":xpos, "y":ypos+w};
var unit_3 = {"x":xpos+w, "y":ypos+w};
var unit_4 = {"x":xpos-w, "y":ypos};
var unit_5 = {"x":xpos, "y":ypos-w};
var unit_6 = {"x":xpos-w, "y":ypos-w}; 
var unit_7 = {"x":xpos+w, "y":ypos-w};
var unit_8 = {"x":xpos-w, "y":ypos+w};
var unit_9 = {"x":xpos+w+w, "y":ypos};

// TETRAD CLASS
  
function Tetrad(unit0,unit1,unit2,unit3,unit4,unit5,unit6,unit7,unit8,unit9){
  this.unit0=unit0;
  this.unit1=unit1;
  this.unit2=unit2;
  this.unit3=unit3;
  this.unit4=unit4;
  this.unit5=unit5;
  this.unit6=unit6;
  this.unit7=unit7;
  this.unit8=unit8;
  this.unit9=unit9;

  var letters = [ "O", "T", "J", "L", "Z", "S", "I"];
  var index = floor(random(letters.length));
  
  this.generate=function(){
    pieces.push(unit0);
    
    if(letters[index] === "O"){
      fill('yellow');
      pieces.push(unit1,unit2,unit3);
    } else if(letters[index] === "T"){
      fill('purple');
      pieces.push(unit1,unit4,unit5);
    } else if(letters[index] === "J"){
      fill('blue');
      pieces.push(unit5,unit2,unit7);
    } else if(letters[index] === "L"){
      fill('orange');
      pieces.push(unit5,unit2,unit3);
    } else if(letters[index] === "Z"){
      fill('red');
      pieces.push(unit1,unit5,unit6);
    } else if(letters[index] === "S"){
      fill('green');
      pieces.push(unit1,unit2,unit8);
    } else if(letters[index] === "I"){
      fill('#89f');
      pieces.push(unit1,unit4,unit9);
    }
  }
      
  this.move=function(){
    if (keyIsPressed === false && pieces[0].y<630 && pieces[1].y<630 && pieces[2].y<630 && pieces[3].y<630){   // moving in ticks
      tetrad[0].unit0.y+=w;
      tetrad[0].unit1.y+=w;
      tetrad[0].unit2.y+=w;
      tetrad[0].unit3.y+=w;
      tetrad[0].unit4.y+=w;
      tetrad[0].unit5.y+=w;
      tetrad[0].unit6.y+=w;
      tetrad[0].unit7.y+=w;
      tetrad[0].unit8.y+=w;
      tetrad[0].unit9.y+=w;
      frameRate(1.5);
    } else if (keyIsDown(DOWN_ARROW)){  // smooth movement
      frameRate(30);
    }
  }
  
  this.display=function(){
    strokeWeight(1.2);
    stroke('black');
    for(var i=0; i<4; i++){
      rect(pieces[i].x,pieces[i].y,w,w);
    }
  }

  // detet collisions of tetrads, then store in new array)
  this.deactivate=function(){
    hit=collideRectRect(0,height,width,w,tetrad[0].x,tetrad[0].y, 30,30);
    if(hit){
      var temp = new Tetrad(xpos,ypos,xpos+w,ypos+w,xpos-w,ypos-w,xpos+w+w)
      buildup.push(pieces[0],pieces[1],pieces[2],pieces[3]);
      tetrad.splice(0,10);
      tetrad.push(temp);
    }
  }
  
  this.render=function(){
    this.generate();
    this.move();
    this.display();
    this.deactivate();
  }
}

// KEY PRESSES

function keyPressed() {
  for (var i=0; i<4; i++){
    if (keyCode === RIGHT_ARROW) {
      pieces[i].x+=w;
    } else if (keyCode === LEFT_ARROW) {
      pieces[i].x-=w;
    } else if (keyCode === DOWN_ARROW) {
      pieces[i].y+=w;
    } else if (keyCode === 32) {
      pieces[i].y+=height-w-w-(pieces[i].y);
    }
  }
}


// SETUP + DRAW FUNCTION

function setup(){
  createCanvas(300,690);
  
  // PUSHING NEW TETRADS TO ARRAY
  var temp = new Tetrad(unit_0,unit_1,unit_2,unit_3,unit_4,unit_5,unit_6,unit_7,unit_8,unit_9);
  tetrad.push(temp);
}

function draw() {
  background(20,20,20);

  for (var i=0; i<tetrad.length; i++){
    tetrad[i].render();
  }
  
  for (var i=0; i<buildup.length; i++){
    buildup[i].render();
  }
  
  fill('red');
  rect(0,660,300,30);
  console.log(pieces);
}
