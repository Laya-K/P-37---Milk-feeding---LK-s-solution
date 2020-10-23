var database;
var dogSprite, dogimg, happyDogimg;
var food, foodStock;
var addFoodButton, feedDogButton;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dogimg = loadImage('images/Dog.png');
  happyDogimg = loadImage('images/happydog.png');
}

function setup() {
  createCanvas(1600, 800);
  
  dogSprite = createSprite(250,250,50,50);
  dogSprite.addImage(dogimg);
  dogSprite.scale = 0.5;

  database = firebase.database();
  foodStock = database.ref('Food');
  fedTime = database.ref('LastFed');

  feedDogButton = createButton("Feed the dog");
  feedDogButton.position(700,95);
  feedDogButton.mousePressed(feedDog);

  addFoodButton = createButton("Add Food");
  addFoodButton.position(800,95);
  addFoodButton.mousePressed(addFood);

  foodObj = new Food();
}


function draw() {
  background(46,139,87);

  foodStock.on("value",function(data){
    food = data.val();
  });

  console.log(food);

  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  if(food != undefined){
    if(food<1){
      dogSprite.addImage(dogimg);
      push();
      fill("white");
      stroke("black");
      text("PRESS BUTTON TO ADD MORE FOOD",200,50);
      pop();
      database.ref('/').update({
        Food: 0
      });
    }
  }

  foodObj.display();

  drawSprites();

  push();
  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("LAST FED: " + lastFed%12 + " PM", 350, 30);
  }
  else if(lastFed == 0){
    text("LAST FED: 12 AM",350,30);
  }
  else {
    text("LAST FED: " + lastFed + " AM", 350, 30);
  }
  pop();

}

function feedDog(){
  dogSprite.addImage(happyDogimg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/'),update({
    Food: foodObj.getFoodStock,
    LastFed: hour()
  })
}

function addFood(){
  if(food < 20){
    food++;
    database.ref('/').update({
      Food: food
    });
  }
}




