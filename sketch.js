var database, reference;
var dogSprite, dogimg, happyDogimg;
var food, foodStock;

function preload()
{
  dogimg = loadImage('images/Dog.png');
  happyDogimg = loadImage('images/happydog.png');
}

function setup() {
	createCanvas(500, 500);
  dogSprite = createSprite(250,250,50,50);
  dogSprite.addImage(dogimg);
  dogSprite.scale = 0.5;
  database = firebase.database();
  reference = database.ref("/");
  foodStock = database.ref('Food');
}


function draw() {
  background(46,139,87);

  foodStock.on("value",readStock);

  if(food != undefined){
    if(keyWentDown(UP_ARROW)){
      writeStock(food);
    }

    if(food<1){
      dogSprite.addImage(dogimg);
      push();
      fill("white");
      stroke("black");
      text("PRESS M TO ADD MORE MILK",200,50);
      pop();
      if(keyWentDown("M")){
        reference.set({
          'Food': 25
        })
      }
    }
    else if(food<25&&food>0){
      dogSprite.addImage(happyDogimg);
    }
  }

  drawSprites();

  textSize(20);
  textAlign(CENTER);
  push();
  fill("white");
  stroke("black");
  text("PRESS UP ARROW TO FEED DOGGO MILK!!!",250,400);
  text("MILK LEFT: "+food,100,100);
  pop();
}

function readStock(data) {
  food = data.val();
}

function writeStock(data){
  if(data<=0){
    data = 0;
  }
  else {
    data -= 1;
  }

  reference.set({
    'Food': data
  })
}


