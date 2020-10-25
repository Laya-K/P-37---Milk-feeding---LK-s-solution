var database;
var foodDetail;
var foodObj;
var button1, button2;
var time;
var foodStock;
var alert;

function setup(){
    createCanvas(windowWidth,displayHeight);
    database = firebase.database();

    button1 = createButton("Feed the Dog");
    button1.position(width/2 - 100, 100);

    button2 = createButton("Add more food to the stock");
    button2.position(width/2 + 20, 100);

    button1.mousePressed(feedDog);
    button2.mousePressed(addFood);

    foodObj = new Food();

    var ref = database.ref('Food');
    ref.on("value",function(data){
        foodStock = data.val();
        foodObj.getFoodStock(foodStock);
    });

    time = createElement('h2');
    alert = createElement('h2');
}
function draw(){
    foodObj.display();
    var ref = database.ref('LastFed');
    ref.on("value",(data)=>{
        foodObj.LastFed = data.val();
    })
    if(foodObj.LastFed > 12){
        time.html(foodObj.LastFed%12+":00 PM");
        time.position(10,100);
    }
    else if(foodObj.LastFed < 12){
        time.html(foodObj.LastFed + ":00 AM");
    }
    else if(foodObj.LastFed === 0){
        time.html("12:00 AM");
    }
    else if(foodObj.LastFed === 12){
        time.html("12:00 PM");
    }
    if(foodObj.foodStock === 1){
        alert.html("Only 1 bottle of milk left!!!!");
        alert.position(20,50);
    }
    else if(foodObj.foodStock === 0){
        alert.html("No milk bottle left!!!!");
        alert.position(20,50);
    }
    else{
        alert.html("");
    }

}
function feedDog(){
    database.ref('/').update({
        LastFed: hour()
    })
    if(foodObj.foodStock >0){
        foodObj.updateFoodStock(-1);
        console.log(foodObj.foodStock);
    }
    else{
        alert.html("No milk remaining!!!!");
        alert.position(20,50);
    }
}
function addFood(){
    foodObj.updateFoodStock(1);
    console.log(foodObj.foodStock);
}