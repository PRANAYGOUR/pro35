var balloonImage, database, bg, Position;

function preload(){
  bg = loadImage("bg.png");
  balloonImage = loadImage("balloon1.png");
}

function setup() {
  database = firebase.database(); 
  createCanvas(1200,500);
balloon = createSprite(250,360,60,60);
balloon.addImage("balloonImage", balloonImage);
balloon.scale = 0.5;

var balloonPosition = database.ref('balloon/height');
balloonPosition.on("value", readPosition,   showError);
}

function draw() {
  background(bg);
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
 //  balloon.x = balloon.x -10;
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
   // balloon.x = balloon.x +10;
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.scale = balloon.scale -0.01;
    //balloon.x = balloon.y -10;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    balloon.scale = balloon.scale +0.01;
   // balloon.x = balloon.y +10;
  }  

  

  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readPosition(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writting to the database");
}